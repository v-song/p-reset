import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
sia = SentimentIntensityAnalyzer()
import pandas as pd
import joblib
rf_model = joblib.load('journal_model.pkl')


def emotion(example_sent):
    example_sent = example_sent.replace(r'.', '')
    example_sent = example_sent.replace(r',', '')
    example_sent = example_sent.replace(r'!', '')
    example_sent = example_sent.replace(r';', '')
    example_sent = example_sent.replace(r'?', '')
    example_sent = example_sent.replace(r'(', '')
    example_sent = example_sent.replace(r')', '')
    example_sent = example_sent.replace(r"'", '')
    stop_words = set(stopwords.words('english'))
    list_contractions_common = {'arent', 'cant', 'couldnt', 'didnt', 'doesnt', 'hadnt', 'havent', 'shouldnt', 'wouldnt', 'youve','youre','wont','werent', 'weve','wed', 'theyre', 'Im', 'its'}
    stop_words.update(list_contractions_common)
    filtered_sentence = [w for w in example_sent.split() if not w.lower() in stop_words]
    filtered_sentence = []

    for w in example_sent.split():
        if w not in stop_words:
            filtered_sentence.append(w)

    filtered_sentence = ' '.join(filtered_sentence)
    pos_score = (sia.polarity_scores(filtered_sentence))['pos']
    neg_score = (sia.polarity_scores(filtered_sentence))['neg']
    neutral_score = (sia.polarity_scores(filtered_sentence))['neu']
    compound_score = (sia.polarity_scores(filtered_sentence))['compound']

    scores = {'positive_score': [pos_score], 'negative_score': [neg_score], 'neutral_score': [neutral_score], 'compound_score': [compound_score]}  
    
    # Create DataFrame  
    df_unseen = pd.DataFrame(scores) 
    predicted_score = rf_model.predict(df_unseen)
    if (compound_score < 0):
        if (predicted_score == [2]):
            final_pred = 'angry'
        else:
            final_pred = 'anxious/sad'
    elif (predicted_score == [0]):
        final_pred = 'happy'
    elif (predicted_score == [1]):
        final_pred = 'excited'
    elif (predicted_score == [2]):
        final_pred = 'angry'
    else:
        final_pred = 'anxious/sad'
    return final_pred

import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import io
import base64

def emotion_bar(emotions):
    plt.figure(figsize=(5, 4))
    plt.bar(range(len(emotions)), list(emotions.values()), align='center')
    plt.xticks(range(len(emotions)), list(emotions.keys()))
    plt.xlabel('Emotions')
    plt.ylabel('Number of Journals')
    plt.title('Total # of Emotions of Journals')
    plt.tight_layout()
    img = io.BytesIO()
    plt.savefig(img, format='png')
    img.seek(0)

    # Encode the BytesIO object to a base64 string
    return base64.b64encode(img.getvalue()).decode()


def emotion_trend(emotions, emotion_map):
    emotions.reverse()
    plt.figure(figsize=(5, 3))
    plt.plot(range(len(emotions)), [emotion_map[emotion[0]] for emotion in emotions], marker='o')
    plt.yticks([1,2,3,4], ['Angry', 'Anxious/Sad', 'Happy', 'Excited'])
    plt.xlabel('Time')
    plt.ylabel('Number of emotions')
    plt.title('Emotions over Time')
    plt.tight_layout()
    img = io.BytesIO()
    plt.savefig(img, format='png')
    img.seek(0)

    # Encode the BytesIO object to a base64 string
    return base64.b64encode(img.getvalue()).decode()

def emotion_pie(emotions):
    emotions = dict(emotions)
    plt.figure(figsize=(5, 4))
    plt.pie(emotions.values(), labels=emotions.keys(), autopct='%1.1f%%')
    plt.title('Total # of Emotions of Journals')
    plt.tight_layout()
    img = io.BytesIO()
    plt.savefig(img, format='png')
    img.seek(0)

    # Encode the BytesIO object to a base64 string
    return base64.b64encode(img.getvalue()).decode()




def habit_pie(habits):
    # get current day of week
    import datetime
    now = datetime.datetime.now()
    day = now.weekday()
    day_of_week = {
    'Monday':0,
    'Tuesday':1,
    'Wednesday':2,
    'Thursday':3,
    'Friday':4,
    'Saturday': 5,
    'Sunday': 6
}
    complete, incomplete, left = 0, 0, 0
    for habit in habits:
        if day_of_week[habit.day] < day:
                if habit.completed:
                    complete += 1
                else:
                    incomplete += 1
        else:
            left += 1
        
    pie_data = {'Complete': complete, 'Incomplete': incomplete, 'Left': left}
    plt.figure(figsize=(5, 4))
    plt.pie(pie_data.values(), labels=pie_data.keys(), autopct='%1.1f%%')
    plt.title('Habits Completed')
    plt.tight_layout()
    img = io.BytesIO()
    plt.savefig(img, format='png')
    img.seek(0)

    # Encode the BytesIO object to a base64 string
    return base64.b64encode(img.getvalue()).decode()


