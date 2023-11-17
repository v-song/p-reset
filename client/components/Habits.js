import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import {AiOutlineStar} from 'react-icons/ai'
import {AiFillStar} from 'react-icons/ai'
import {BsTrash3Fill} from 'react-icons/bs'
import { FaCheck } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
// import { DayPilotCalendar } from "@daypilot/daypilot-lite-react";


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

  const del = (habit_id) => {
    fetch(`http://localhost:8080/api/habits/${habit_id}`,{
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

  const favorite = (habit_id, currentFavoriteState) => {
    fetch(`http://localhost:8080/api/habits/${habit_id}`,{
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

  // const calendarRef = useRef()
  
  // const [columns, setColumns] = useState([])
  // const [events, setEvents] = useState([])

  // useEffect(() => {
  //   setColumns([
  //     { name: "Monday", id: "M" },
  //     { name: "Tuesday", id: "T" },
  //     { name: "Wednesday", id: "W" },
  //     { name: "Thursday", id: "Th" },
  //     { name: "Friday", id: "F" },
  //     { name: "Saturday", id: "S" },
  //     { name: "Sunday", id: "Su" },
  //   ]);
  // }, []);

  // const [calendarConfig, setCalendarConfig] = useState({
  //   viewType: "Week",
  //   durationBarVisible: true,
  //   timeRangeSelectedHandling: "Enabled",
  //   onTimeRangeSelected: async args => {
  //     const dp = calendarRef.current.control;
  //     const modal = await DayPilot.Modal.prompt("Create a new habit:", "Go to sleep");
  //     dp.clearSelection();
  //     if (!modal.result) { return; }
  //     dp.events.add({
  //       start: args.start,
  //       end: args.end,
  //       id: DayPilot.guid(),
  //       text: modal.result
  //     });
  //   },
  // });

  return (
    <div className='p-3 w-full'>
      <div className='bg-slate-100 flex flex-col gap-1 p-2 rounded-xl'>
        <h1 className="text-2xl font-bold text-center">Your Habits</h1>
        <h1 className='font-bold text-indigo-800'>Welcome to Your Personalized Self-Care Habits Space!</h1>

        <p><span class="font-bold">🌟 Build Your Habits:</span> Set the foundation for a healthier you by entering the habits you want to cultivate. These are items that you to complete at once a week consistency. Specify their occurrence, or let our AI recommend optimal times throughout the day. Take control of your routine, one habit at a time.</p>

        <p><span class="font-bold">🕒 Time Recommendations:</span> Let our AI suggest the best moments for your habits, aligning with your lifestyle. Effortlessly integrate positive practices into your day, fostering a routine that suits you.</p>

        <p><span class="font-bold">✅ Track Your Progress:</span> Mark each habit as done and watch your progress unfold. Our system keeps a detailed record of your achievements, celebrating the small wins that contribute to your well-being.</p>

        <p><span class="font-bold">🔔 Stay on Track:</span> Opt for notifications to receive gentle reminders, ensuring you stay on top of your habits. It's the nudge you need to prioritize self-improvement.</p>
        
        <h3>Ready to embrace positive change? Start building your habits and witness the transformative power of consistency. Your well-being journey begins now! 🚀</h3>
        </div>


      <table className="table-auto w-full my-4">
        <thead>
          <tr>
            <th className="border px-4 py-2">Title</th>
            {/* <th className="border px-4 py-2">Description</th> */}
            <th className='border px-4 py-2'>Day</th>
            <th className='border px-4 py-2'>Start Time</th>
            <th className='border px-4 py-2'>End Time</th>
            <th className='border px-4 py-2'>Complete</th>
            <th className='border px-4 py-2'>Fav</th>
            <th className='border px-4 py-2'>Delete</th>
          </tr>
        </thead>
        <tbody>
        {habits.map(habit => {
          return (
            <tr key={habit.id} className='hover:bg-slate-300' >
              <td className="border px-4 py-2 text-center" onClick={()=>openModal(habit)}>{habit.name}</td>
              {/* <td className="border px-4 py-2">{habit.description}</td> */}
              <td className="border px-4 py-2 text-center" onClick={()=>openModal(habit)}>{habit.day}</td>
              <td className="border px-4 py-2 text-center" onClick={()=>openModal(habit)}>{habit.start_time}</td>
              <td className="border px-4 py-2 text-center" onClick={()=>openModal(habit)}>{habit.end_time}</td>
              <td className='border px-4 py-2 text-center text-2xl w-5 hover:scale-110 '>
                {
                  habit.complete ? <FaCheck className='text-green-500 hover:text-green-300' /> :<FaXmark  className='text-red-500 hover:text-red-300'/>
                }

              </td>
              <td className='border px-4 py-2 text-yellow-500 text-2xl w-5 hover:scale-110 hover:text-yellow-400' onClick={()=>favorite(habit.id, habit.favorite)}>
                {
                  habit.favorite ? <AiFillStar/> : <AiOutlineStar/>
                }
              </td>
              <td className='border px-4 py-2 text-center text-red-300 text-2xl w-5 hover:translate-x-1 transition-transform duration-200 hover:text-red-600'
              onClick={()=>del(habit.id)}>
                <BsTrash3Fill/>
              </td>
            </tr>
          );
        })}
        </tbody>
      </table>

      {/* <div>
        <DayPilotCalendar
          {...calendarConfig}
          ref={calendarRef}
          columns={columns}
        />
        </div> */}
    </div>
  );
};

export default HabitsList;