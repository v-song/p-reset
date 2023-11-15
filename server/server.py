# write flask code in python here
from flask import Flask, redirect, request, jsonify, session, make_response
from flask_cors import CORS, cross_origin
from datetime import datetime, time
from flask_sqlalchemy import SQLAlchemy
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import Flow
from googleapiclient.discovery import build
from flask_session import Session
from dotenv import load_dotenv
import os
os.environ['OAUTHLIB_INSECURE_TRANSPORT'] = '1'

load_dotenv()

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000", "http://localhost:3000/add_event"], supports_credentials=True)
app.config['SESSION_COOKIE_SECURE'] = False
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'

# Configure session to use filesystem
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_FILE_DIR'] = './.flask_session/'
app.config['SESSION_PERMANENT'] = False
app.config['SESSION_COOKIE_NAME'] = 'session'
# Configure the app to connect to the PostgreSQL database using SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://haramyoon:password123@p-reset.cyjuijxbcgyl.us-east-2.rds.amazonaws.com/preset'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Create a SQLAlchemy instance
db = SQLAlchemy(app)
app.app_context().push()

class Users(db.Model):
    id = db.Column(db.String, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), unique=True)
    img_url = db.Column(db.String(500))
    sms = db.Column(db.Integer)
    journals = db.relationship('Journal', backref='users', lazy=True)
    habits = db.relationship('Habit', backref='users', lazy=True)

class Habit(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    description = db.Column(db.String(500))
    completed = db.Column(db.Boolean)
    days = db.Column(db.ARRAY(db.String(50)))
    frequency = db.Column(db.Integer)
    favorite = db.Column(db.Boolean)
    user_id = db.Column(db.String, db.ForeignKey('users.id'), nullable=False)

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'completed': self.completed,
            'days': self.days,
            'frequency': self.frequency,
            'favorite': self.favorite,
            'user_id': self.user_id
        }

class Journal(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    header = db.Column(db.String(50))
    description = db.Column(db.String(500))
    datetime =  db.Column(db.DateTime)
    file = db.Column(db.String(50))
    favorite = db.Column(db.Boolean)
    user_id = db.Column(db.String, db.ForeignKey('users.id'), nullable=False)

    def serialize(self):
        return {
            'id': self.id,
            'header': self.header,
            'description': self.description,
            'datetime': self.datetime.isoformat(),
            'file': self.file,
            'favorite': self.favorite,
            'user_id': self.user_id
        }

# Create the Users and Event tables in the database using SQLAlchemy's create_all() method
db.create_all()

Session(app)

app.secret_key = 'c085ce0c5c21a4d774591a20b981013e'

CLIENT_ID = os.environ.get('CLIENT_ID', '00000')
CLIENT_SECRET = os.environ.get('CLIENT_SECRET', '00000')
REDIRECT_URI = 'http://localhost:8080/google/callback'


@app.route('/google/login', methods=['GET'])
def google_login():
    flow = Flow.from_client_config(
        {
            "web": {
                "client_id": CLIENT_ID,
                "client_secret": CLIENT_SECRET,
                "redirect_uris": [REDIRECT_URI],
                "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                "token_uri": "https://accounts.google.com/o/oauth2/token",
            }
        },
        scopes=["https://www.googleapis.com/auth/calendar", "https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email", "openid"],
    )

    flow.redirect_uri = REDIRECT_URI
    authorization_url, state = flow.authorization_url(prompt='consent', access_type='offline')
    session['state'] = state
    return redirect(authorization_url)

@app.route('/google/callback')
def google_callback():
    if 'state' not in session:
        return "State value missing in session", 400
    state = session['state']
    flow = Flow.from_client_config(
        {
            "web": {
                "client_id": CLIENT_ID,
                "client_secret": CLIENT_SECRET,
                "redirect_uris": [REDIRECT_URI],
                "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                "token_uri": "https://accounts.google.com/o/oauth2/token",
            }
        },
        state=state,
        scopes=["https://www.googleapis.com/auth/calendar", "https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email", "openid"],
    )
    flow.redirect_uri = REDIRECT_URI
    authorization_response = request.url
    flow.fetch_token(authorization_response=authorization_response)
    credentials = flow.credentials
    
    session['credentials'] = {
        'token': credentials.token,
        'refresh_token': credentials.refresh_token,
        'token_uri': credentials.token_uri,
        'client_id': credentials.client_id,
        'client_secret': credentials.client_secret,
        'scopes': credentials.scopes,
    }

    return redirect('http://localhost:3000')


@app.route('/user_info')
def get_user_info():
    #print(session)
    credentials = session.get("credentials")
    if not credentials:
        return jsonify({"error": "Not authenticated"}), 401
    
    creds = Credentials(**credentials)
    service = build('oauth2', 'v2', credentials=creds)
    #print(credentials)
    user_info = service.userinfo().get().execute()

    user_id = user_info['id']
    user = Users.query.get(user_id)
    if user is None:
        # Users doesn't exist, create it
        new_user = Users(
            id=user_id,
            name=f"{user_info['given_name']} {user_info['family_name']}",
            img_url=user_info['picture']
        )
        print(new_user)
        db.session.add(new_user)
        db.session.commit()
    
    
    return jsonify(user_info)

@app.route('/events', methods=['GET'])
def get_events():
    credentials = session.get('credentials')
    if not credentials:
        return jsonify({"error": "Not authenticated"}), 401

    creds = Credentials(**credentials)
    service = build('calendar', 'v3', credentials=creds)

    # Get the current time in RFC3339 format
    now = datetime.utcnow().isoformat() + 'Z'

    events_result = service.events().list(calendarId='primary', timeMin=now,
                                              maxResults=50, singleEvents=True,
                                              orderBy='startTime').execute()
    events = events_result.get('items', [])
    
    return jsonify(events)

@app.route('/add_event', methods=['POST'])
def add_event():
    credentials = session.get('credentials')
    if not credentials:
        return jsonify({"error": "Not authenticated"}), 401

    creds = Credentials(**credentials)
    service = build('calendar', 'v3', credentials=creds)
    
    event_body = request.json
    try:
        event = service.events().insert(calendarId='primary', body=event_body).execute()
        return jsonify(event)
    except Exception as e:
        # Logging the exception
        print(f"An error occurred: {e}")
        return jsonify({"error": "Failed to add event", "details": str(e)}), 500
    # credentials = session.get('credentials')
    # if not credentials:
    #     return jsonify({"error": "Not authenticated"}), 401

    # creds = Credentials(**credentials)
    # service = build('calendar', 'v3', credentials=creds)
    
    # frontend_data = request.json
    # selected_days = frontend_data['days']
    # day_abbr = {'Monday': 'MO', 'Tuesday': 'TU', 'Wednesday': 'WE', 'Thursday': 'TH', 'Friday': 'FR', 'Saturday': 'SA', 'Sunday': 'SU'}
    # recurrence_days = ','.join([day_abbr[day] for day in selected_days if day in day_abbr])
    # frequency = frontend_data['frequency']
    # recurrence_rule = None
    # if frequency == 'every week':
    #     recurrence_rule = ['RRULE:FREQ=WEEKLY;INTERVAL=1;BYDAY=' + recurrence_days]
    # elif frequency == 'every other week':
    #     recurrence_rule = ['RRULE:FREQ=WEEKLY;INTERVAL=2;BYDAY=' + recurrence_days]
    # elif frequency == 'once a month':
    #     recurrence_rule = ['RRULE:FREQ=MONTHLY;INTERVAL=1;BYDAY=' + recurrence_days]
    # event_body = {
    #     'summary': frontend_data['header'],
    #     'location': frontend_data['location'],
    #     'description': frontend_data['description'],
    #     'start': {
    #         'dateTime': frontend_data['startDateTime'],
    #         'timeZone': 'Your/Timezone'
    #     },
    #     'end': {
    #         'dateTime': frontend_data['endDateTime'],
    #         'timeZone': 'Your/Timezone'
    #     },
    #     'recurrence': recurrence_rule,
    #     # Add more fields as necessary
        
    # }
    # try:
    #     event = service.events().insert(calendarId='primary', body=event_body).execute()
    #     return jsonify(event)
    # except Exception as e:
    #     # Logging the exception
    #     print(f"An error occurred: {e}")
    #     return jsonify({"error": "Failed to add event", "details": str(e)}), 500


@app.route('/logout', methods=['GET'])
def logout():
    session.pop('credentials', None)
    return redirect('http://localhost:3000')



@app.route('/api/users/<user_id>/journals', methods=['POST', 'GET'])
@cross_origin()
def journals(user_id):
    if request.method == 'POST':
        data = request.get_json()
        journal = Journal(header=data['header'],
                    description=data['description'],
                    datetime=datetime.strptime(data['datetime'], "%Y-%m-%dT%H:%M"),
                    file=data.get('file', ''),
                    favorite=data['isFavorite'],
                    user_id=user_id)
        db.session.add(journal)
        db.session.commit()
        return jsonify({'message': 'Journal added successfully!'})
    elif request.method == 'GET':
        journals = Journal.query.filter_by(user_id=user_id).order_by(Journal.datetime.desc()).all()
        return jsonify([journal.serialize() for journal in journals])

@app.route('/api/journals/<journal_id>', methods=['PATCH', 'DELETE'])
@cross_origin()
def journal(journal_id):
    journal = Journal.query.get(journal_id)
    if request.method == 'PATCH':
        data = request.get_json()
        journal.favorite = data['favorite']
        db.session.commit()
        return jsonify({'message': 'Journal updated successfully!'})
    elif request.method == 'DELETE':
        db.session.delete(journal)
        db.session.commit()
        return jsonify({'message': 'Journal deleted successfully!'})
    
@app.route('/api/users/<user_id>/habits', methods=['POST', 'GET'])
@cross_origin()
def habits(user_id):
    if request.method == 'POST':
        data = request.get_json()
        habit = Habit(name=data['name'],
                    description=data['description'],
                    completed=False,
                    days=data['days'],
                    frequency=data['frequency'],
                    favorite=data['isFavorite'],
                    user_id=user_id)
        db.session.add(habit)
        db.session.commit()
        return jsonify({'message': 'Habit added successfully!'})
    elif request.method == 'GET':
        habits = Habit.query.filter_by(user_id=user_id).all()
        return jsonify([habit.serialize() for habit in habits])

# Write a print statement to show the users within the user 
print("server side working !!! :)")
users = Users.query.all()
for user in users:
    print(user.email)



if __name__ == "__main__":
    app.run(debug=True, port=8080)

    