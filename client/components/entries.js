import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {AiOutlineStar} from 'react-icons/ai'
import {AiFillStar} from 'react-icons/ai'
import {BsTrash3Fill} from 'react-icons/bs'
import Journal from './forms/Journal';
import JournalDetailsPopup from './JournalDetailsPopup';


const Entries = () => {
  const [journals, setJournals] = useState([]);
  const [selectedJournal, setSelectedJournal] = useState(null);
  const [emotions, setEmotions] = useState(null)
  const [emotionalState, setEmotionalState] = useState(null)
  const router = useRouter();
  const { id } = router.query;

  const sentimentMessages = {
    angry: [
      "It seems like you've been expressing some frustration or anger. We're here to help resolve any issues you might be facing.",
      "Take a deep breath. If there's a specific problem, let us know so we can assist you in finding a solution.",
      "It's okay to feel angry. Consider expressing your feelings in a constructive way or taking a short break to cool off.",
    ],
    sad: [
      "We've noticed a somewhat somber or disappointed tone. If there's anything on your mind, feel free to share, and we're here to support you.",
      "Feeling down is normal. Reach out to friends or loved ones for support, and remember that we're here for you.",
      "If there's a specific reason for your sadness, sharing it can sometimes lighten the load. We're here to listen.",
    ],
    happy: [
      "Your recent interactions reflect a positive and happy sentiment! We're delighted to have you here.",
      "Great to hear you're feeling positive! Keep up the good vibes. If there's anything you'd like to share or discuss, we're here to listen.",
      "Happiness is contagious! Spread the joy around and let us know if there's anything we can do to make your experience even better.",
    ],
    excited: [
      "Excitement is in the air! Your recent sentiments convey high energy and enthusiasm. What's making you so excited? We'd love to know!",
      "Capture that energy and use it to fuel your creativity. We're here to support your exciting journey!",
      "Share your enthusiasm with those around you. Your excitement can be a source of motivation for others.",
    ],
  };
  
  const sentimentRecommendations = {
    angry: [
      "Consider taking a break and coming back to the task with a fresh perspective. If there's a specific issue, let us know so we can assist you.",
      "Reflect on the source of your anger. Is there a solution or a way to address the issue? We're here to help.",
      "Practice self-care. Engage in activities that help you relax and release tension.",
    ],
    sad: [
      "It's okay to feel down sometimes. Reach out to friends or loved ones for support. If there's anything we can do to help, please don't hesitate to ask.",
      "Expressing your emotions can be therapeutic. Consider journaling or talking to someone you trust about what you're feeling.",
      "Take some time for self-care. Engage in activities that bring you comfort and joy.",
    ],
    happy: [
      "Keep spreading positivity! Your happiness contributes to a positive atmosphere. If there's anything we can do to enhance your experience, let us know.",
      "Celebrate your wins, big or small. We're here to share in your joy!",
      "Consider sharing your positive vibes with others. Your happiness can be inspiring to those around you.",
    ],
    excited: [
      "Channel that excitement into something productive! If there's a project or idea you're passionate about, now might be the perfect time to dive in.",
      "Capture that energy and use it to accomplish your goals. We're here to support you every step of the way.",
      "Share your excitement with those around you. Your enthusiasm can be contagious!",
    ],
  };
  
  const getRandomMessage = (array) => {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  };

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:8080/api/users/${id}/journals`,{
      method: 'GET',
      headers: {  
        'Content-Type': 'application/json'
      }
    })
    
      .then(response => response.json())
      .then(data => { 
        setJournals(data.journals);
        setEmotions(data.emotions);
        setEmotionalState(
          data.emotions[2] <= 1.5 ? "angry" :
          data.emotions[2] <= 2.5 ? "sad" :
          data.emotions[2] <= 3.5 ? "happy" :
        "excited")
      })
      .catch(error => console.error(error));
  }, [id]);

  const del = (journal_id) => {
    fetch(`http://localhost:8080/api/journals/${journal_id}`,{
      method: 'DELETE',
      headers: {  
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .then(()=>location.reload())
      .catch(error => console.error(error));
  }

  const favorite = (journal_id, currentFavoriteState) => {
    fetch(`http://localhost:8080/api/journals/${journal_id}`,{
      method: 'PATCH',
      headers: {  
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        favorite: !currentFavoriteState
      })
    })
    .then(()=>location.reload())
    .catch(error => console.error(error));
  }

  return (
    <div className='flex py-2'>
    <div className='p-3 w-full'>
        
      <div className="flex flex-col gap-2 justify-center rounded-xl p-2">
      <h1 className="text-2xl font-bold text-center">Your Journal Entries</h1>
        <p className='font-bold text-indigo-800'>Welcome to your personalized self-care journaling space! 🌿📖 </p>

          <p><span class="font-bold">🌈 Capture Your Moments:</span> Use the form to document your thoughts, moods, and experiences. Whether it's a moment of joy, a challenge conquered, or a simple gratitude, let your journal reflect the colors of your life.</p>

          <p><span class="font-bold">🧐 Dive Deeper:</span> Click on each entry to revisit the details. Relish your victories, navigate through the challenges, and witness your personal growth. Your journal is a mirror reflecting the beautiful journey you're on.</p>

          <p><span class="font-bold">🤖 AI Insights:</span> The embedded AI is your guide, actively analyzing entries. It detects patterns, identifies sources of joy or stress, and recognizes mood fluctuations, providing a deeper understanding of your emotional landscape.</p>

            <p><span class="font-bold">😊 Sentiment Analysis:</span> The AI employs sentiment analysis to understand emotional tones in your entries, distinguishing elation, challenges, and gratitude. Recognize emotional patterns and triggers for valuable insights into your well-being.</p>
            <p><span class="font-bold">🌱 Personal Growth Reflections:</span> Your journal is a mirror reflecting your journey. The AI connects dots between thoughts emotions, and actions, offering a unique perspective on personal growth.</p>

        <p>Ready to nurture your well-being? Start journaling now. Your self-care adventure begins with every stroke of the digital pen! ✨</p>

        </div>
      <table className="table-auto w-full my-4 border border-black">
        <thead>
          <tr>
            <th className="border-2 border-black px-4 py-2">Title</th>
            {/* <th className="border px-4 py-2">Description</th> */}
            <th className='border-2 border-black px-4 py-2'>Date</th>
            <th className='border-2 border-black px-4 py-2'>Time</th>
            <th className='border-2 border-black px-4 py-2'>Emotion</th>
            <th className='border-2 border-black px-4 py-2'>Fav</th>
            <th className='border-2 border-black px-4 py-2'>Delete</th>
          </tr>
        </thead>
        <tbody>
        {journals.map(journal => {
          const [date, time] = journal.datetime.split("T");
          return (
            <tr key={journal.id} className={`hover:bg-slate-300 ${journal.favorite && "bg-yellow-200"}`} >
              <td className="border border-black px-4 py-2 text-center"
              onClick={()=>setSelectedJournal(journal)}>{journal.header}</td>
              {/* <td className="border px-4 py-2">{journal.description}</td> */}
              <td className="border border-black px-4 py-2 text-center"
              onClick={()=>setSelectedJournal(journal)}>{date}</td>
              <td className="border border-black px-4 py-2 text-center"
              onClick={()=>setSelectedJournal(journal)}>{time}</td>
              <td className="border border-black px-4 py-2 text-center"
              onClick={()=>setSelectedJournal(journal)}>{journal.emotion}</td>
              <td className='border border-black px-4 py-2 text-yellow-500 text-2xl w-5 hover:scale-110 hover:text-yellow-400' onClick={()=>favorite(journal.id, journal.favorite)}>
                {
                  journal.favorite ? <AiFillStar/> : <AiOutlineStar/>
                }
              </td>
              <td className='border border-black px-4 py-2 text-center text-red-300 text-2xl w-5 hover:translate-x-1 transition-transform duration-200 hover:text-red-600' onClick={()=>del(journal.id)}>
                <BsTrash3Fill />
              </td>
            </tr>
          );
        })}
        </tbody>
      </table>
      </div>
      <div className='flex flex-col gap-3 w-96 p-3 h-full rounded-md'>
      {selectedJournal ? (
        <JournalDetailsPopup Journal={selectedJournal} onClose={()=>setSelectedJournal(null)} />
      ) : (
        <Journal/>
      )}
      </div>
    </div>
  );
};

export default Entries; 
