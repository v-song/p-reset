import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {AiOutlineStar} from 'react-icons/ai'
import {AiFillStar} from 'react-icons/ai'
import {BsTrash3Fill} from 'react-icons/bs'
 
const HabitsList = () => {
  const [habits, sethabits] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:8080/api/users/${id}/habits`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
      .then(response => response.json())
      .then(data => sethabits(data))
        .then(console.log(habits))
      .catch(error => console.error(error));
  }, [id]);

  const openModal = (habit) => {
    const { name, description } = habit;
    alert(`Title: ${name}\nDescription: ${description}`);
  }


  return (
    <div className='p-5 w-full'>
        <h1 className="text-2xl font-bold text-center">Your Habits</h1>
      <table className="table-auto w-full my-4">
        <thead>
          <tr>
            <th className="border px-4 py-2">Title</th>
            {/* <th className="border px-4 py-2">Description</th> */}
            <th className='border px-4 py-2'>Days</th>
            <th className='border px-4 py-2'>Occuring</th>
            <th className='border px-4 py-2'>Fav</th>
            <th className='border px-4 py-2'>Delete</th>
          </tr>
        </thead>
        <tbody>
        {habits.map(habit => {
          return (
            <tr key={habit.id} className='hover:bg-slate-300' onClick={()=>openModal(habit)}>
              <td className="border px-4 py-2 text-center">{habit.name}</td>
              {/* <td className="border px-4 py-2">{habit.description}</td> */}
              <td className="border px-4 py-2 text-center">{habit.days}</td>
              <td className="border px-4 py-2 text-center">{habit.frequency}</td>
              <td className='border px-4 py-2 text-yellow-500 text-2xl w-5 hover:scale-110 hover:text-yellow-400'>
                {
                  habit.favorite ? <AiFillStar/> : <AiOutlineStar/>
                }
              </td>
              <td className='border px-4 py-2 text-center text-red-300 text-2xl w-5 hover:translate-x-1 transition-transform duration-200 hover:text-red-600'>
                <BsTrash3Fill/>
              </td>
            </tr>
          );
        })}
        </tbody>
      </table>
    </div>
  );
};

export default HabitsList;