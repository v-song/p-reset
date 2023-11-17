import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {AiOutlineStar} from 'react-icons/ai'
import {AiFillStar} from 'react-icons/ai'
import {BsTrash3Fill} from 'react-icons/bs'
 
const Entries = () => {
  const [journals, setJournals] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:8080/api/users/${id}/journals`,{
      method: 'GET',
      headers: {  
        'Content-Type': 'application/json'
      }
    })
    
      .then(response => response.json())
      .then(data => setJournals(data))
        .then(console.log(journals))
      .catch(error => console.error(error));
  }, [id]);

  const openModal = (journal) => {
    const { header, description, datetime } = journal;
    alert(`Title: ${header}\nDescription: ${description}\nDatetime: ${datetime}`);
  }

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
    <div className='p-3 w-full'>
        
      <div className="flex flex-col gap-2 justify-center bg-slate-100 rounded-xl p-2">
      <h1 className="text-2xl font-bold text-center">Your Journal Entries</h1>
        <p className='font-bold text-indigo-800'>Welcome to your personalized self-care journaling space! 🌿📖 </p>

          <p><span class="font-bold">🌈 Capture Your Moments:</span> Use the form to document your thoughts, moods, and experiences. Whether it's a moment of joy, a challenge conquered, or a simple gratitude, let your journal reflect the colors of your life.</p>

          <p><span class="font-bold">🧐 Dive Deeper:</span> Click on each entry to revisit the details. Relish your victories, navigate through the challenges, and witness your personal growth. Your journal is a mirror reflecting the beautiful journey you're on.</p>

          <p><span class="font-bold">🤖 AI Insights:</span> The embedded AI is your guide, actively analyzing entries. It detects patterns, identifies sources of joy or stress, and recognizes mood fluctuations, providing a deeper understanding of your emotional landscape.</p>

            <p><span class="font-bold">😊 Sentiment Analysis:</span> The AI employs sentiment analysis to understand emotional tones in your entries, distinguishing elation, challenges, and gratitude. Recognize emotional patterns and triggers for valuable insights into your well-being.</p>
            <p><span class="font-bold">🌱 Personal Growth Reflections:</span> Your journal is a mirror reflecting your journey. The AI connects dots between thoughts emotions, and actions, offering a unique perspective on personal growth.</p>

        <p>Ready to nurture your well-being? Start journaling now. Your self-care adventure begins with every stroke of the digital pen! ✨</p>

        </div>
      <table className="table-auto w-full my-4">
        <thead>
          <tr>
            <th className="border px-4 py-2">Title</th>
            {/* <th className="border px-4 py-2">Description</th> */}
            <th className='border px-4 py-2'>Date</th>
            <th className='border px-4 py-2'>Time</th>
            <th className='border px-4 py-2'>Fav</th>
            <th className='border px-4 py-2'>Delete</th>
          </tr>
        </thead>
        <tbody>
        {journals.map(journal => {
          const [date, time] = journal.datetime.split("T");
          return (
            <tr key={journal.id} className={`hover:bg-slate-300 ${journal.favorite && "bg-yellow-200"}`} >
              <td className="border px-4 py-2 text-center"
              onClick={()=>openModal(journal)}>{journal.header}</td>
              {/* <td className="border px-4 py-2">{journal.description}</td> */}
              <td className="border px-4 py-2 text-center"
              onClick={()=>openModal(journal)}>{date}</td>
              <td className="border px-4 py-2 text-center"
              onClick={()=>openModal(journal)}>{time}</td>
              <td className='border px-4 py-2 text-yellow-500 text-2xl w-5 hover:scale-110 hover:text-yellow-400' onClick={()=>favorite(journal.id, journal.favorite)}>
                {
                  journal.favorite ? <AiFillStar/> : <AiOutlineStar/>
                }
              </td>
              <td className='border px-4 py-2 text-center text-red-300 text-2xl w-5 hover:translate-x-1 transition-transform duration-200 hover:text-red-600' onClick={()=>del(journal.id)}>
                <BsTrash3Fill />
              </td>
            </tr>
          );
        })}
        </tbody>
      </table>
    </div>
  );
};

export default Entries;