import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {AiOutlineStar} from 'react-icons/ai'
import {AiFillStar} from 'react-icons/ai'
import {BsTrash3Fill} from 'react-icons/bs'
import { MdOutlineCheckBox } from "react-icons/md";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import HabitForm from './forms/HabitForm';
import HabitDetailsPopup from './HabitDetailsPopup';
// import { DayPilotCalendar } from "@daypilot/daypilot-lite-react";

const HabitsList = () => {
          const [habits, setHabits] = useState([]);
          const router = useRouter();
          const { id } = router.query;
          const [monday, setMonday] = useState([]);
          const [tuesday, setTuesday] = useState([]);
          const [wednesday, setWednesday] = useState([]);
          const [thursday, setThursday] = useState([]);
          const [friday, setFriday] = useState([]);
          const [saturday, setSaturday] = useState([]);
          const [sunday, setSunday] = useState([]);
          const [selectedHabit, setselectedHabit] = useState(null);
          console.log(monday)

          useEffect(() => {
            if (!id) return;
            fetch(`http://localhost:8080/api/users/${id}/habits`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            })
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
                setMonday(data.habits.filter((habit) => habit.day === 'Monday'));
                setTuesday(data.habits.filter((habit) => habit.day === 'Tuesday'));
                setWednesday(data.habits.filter((habit) => habit.day === 'Wednesday'));
                setThursday(data.habits.filter((habit) => habit.day === 'Thursday'));
                setFriday(data.habits.filter((habit) => habit.day === 'Friday'));
                setSaturday(data.habits.filter((habit) => habit.day === 'Saturday'));
                setSunday(data.habits.filter((habit) => habit.day === 'Sunday'));
              })
              .catch((error) => console.error(error));
          }, [id]);

          const del = (habit_id) => {
            fetch(`http://localhost:8080/api/habits/${habit_id}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
            })
              .then((response) => response.json())
              .then((data) => console.log(data))
              .then(() => location.reload())
              .catch((error) => console.error(error));
          };

          const favorite = (habit_id, currentFavoriteState) => {
            fetch(`http://localhost:8080/api/habits/${habit_id}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                favorite: !currentFavoriteState,
              }),
            })
              .then(() => location.reload())
              .catch((error) => console.error(error));
          };

          const complete = (habit_id, currentCompletedState) => {
            fetch(`http://localhost:8080/api/habits/${habit_id}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                completed: !currentCompletedState,
              }),
            })
              .then(() => location.reload())
              .catch((error) => console.error(error));
          }

          // This function resets the `completed` field of each habit to `false`
          const resetHabits = () => {
            console.log("resetting habits");
            habits.forEach(habit => {
              fetch(`http://localhost:8080/api/habits/${habit.id}`, {
                method: 'PATCH',
                headers: {  
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  completed: false
                })
              })
              .catch(error => console.error(error));
            });
          }

          // This function sets up the reset to happen at the start of each week
          const setupWeeklyReset = () => {
            // Check if the reset has already been scheduled
            if (localStorage.getItem('resetScheduled') !== 'true') {
              const now = new Date();
              const nextWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7);
              const timeUntilNextWeek = nextWeek.getTime() - now.getTime();

          
              setTimeout(() => {
                resetHabits();
                setInterval(resetHabits, 7 * 24 * 60 * 60 * 1000); // Run the reset every week
              }, timeUntilNextWeek);
          
              // Set the flag to indicate that the reset has been scheduled
              localStorage.setItem('resetScheduled', 'true');
              console.log("reset scheduled");
            }
          }
          
          // Call the function when the component mounts
          useEffect(() => {
            setupWeeklyReset();
          }, []);

          return (
            <div className='flex'>
            <div className="p-3 w-full">
              <div className=" flex flex-col gap-1 p-2 rounded-xl">
                <h1 className="text-2xl font-bold text-center">Your Habits</h1>
                <h1 className="font-bold text-indigo-800">
                  Welcome to Your Personalized Self-Care Habits Space!
                </h1>

                <p>
                  <span className="font-bold">🌟 Build Your Habits:</span> Set the foundation for a healthier you by entering
                  the habits you want to cultivate. These are items that you to complete at once a week consistency. Specify their
                  occurrence, or let our AI recommend optimal times throughout the day. Take control of your routine, one habit at
                  a time.
                </p>

                <p>
                  <span className="font-bold">🕒 Time Recommendations:</span> Let our AI suggest the best moments for your
                  habits, aligning with your lifestyle. Effortlessly integrate positive practices into your day, fostering a routine
                  that suits you.
                </p>

                <p>
                  <span className="font-bold">✅ Track Your Progress:</span> Mark each habit as done and watch your progress
                  unfold. Our system keeps a detailed record of your achievements, celebrating the small wins that contribute to
                  your well-being.
                </p>

                <p>
                  <span className="font-bold">🔔 Stay on Track:</span> Opt for notifications to receive gentle reminders,
                  ensuring you stay on top of your habits. It's the nudge you need to prioritize self-improvement.
                </p>

                <h3>
                  Ready to embrace positive change? Start building your habits and witness the transformative power of consistency.
                  Your well-being journey begins now! 🚀
                </h3>
              </div>

              <div className='flex border border-black justify-evenly'> 
              {/* Render Monday habits */}
              <div className='border-r border-r-black  '>
                <h2 className="text-xl font-bold mt-4 border-b border-b-black text-center  ">Monday </h2>
                {monday.map((habit) => (
                  <div key={habit.id} className={`flex items-center justify-center ${habit.favorite ? `bg-yellow-200`: `bg-gray-100`}  p-2 rounded-lg mt-2 cursor-pointer`} onClick={()=>setselectedHabit(habit)}>
                    <div className=''>
                    <div className='flex items-center justify-between gap-2'>
                         
                      <h3 className="font-bold text-sm">{habit.name}</h3>
                      <div className='flex gap-1'>
                        {habit.favorite ? (
                          <AiFillStar
                            className=' text-yellow-500 text-lg hover:scale-110 hover:text-yellow-400' onClick={()=>favorite(habit.id, habit.favorite)}
                          />
                        ) : (
                          <AiOutlineStar
                            className=' text-yellow-500 text-lg hover:scale-110 hover:text-yellow-400' onClick={()=>favorite(habit.id, habit.favorite)}
                          />
                        )
                        } 
                        <BsTrash3Fill
                          className="text-center text-red-300 text-lg hover:translate-x-1 transition-transform duration-200 hover:text-red-600"
                          onClick={() => del(habit.id)}
                        />
                      </div>
                      </div>
                      <p className='flex gap-2 items-center'>
                      {habit.completed ? (
                            <MdOutlineCheckBox className="text-green-500 hover:scale-110" onClick={()=>complete(habit.id, habit.completed)}/>
                          ) : (
                            <MdOutlineCheckBoxOutlineBlank className="text-red-500 hover:scale-110" onClick={()=>complete(habit.id, habit.completed)}/>
                          )}
                        {habit.start_time.slice(0,5)} - {habit.end_time.slice(0,5)}
                      </p>
                    </div>
                
                  </div>
                ))}
              </div>

              {/* Render Tuesday habits */}
              <div className='border-r border-r-black  '>
                <h2 className="text-xl font-bold mt-4 border-b border-b-black text-center  ">Tuesday </h2>
                {tuesday.map((habit) => (
                  <div key={habit.id} className={`flex items-center justify-center ${habit.favorite ? `bg-yellow-200`: `bg-gray-100`}  p-2 rounded-lg mt-2 cursor-pointer`} onClick={()=>setselectedHabit(habit)}>
                    <div className=''>
                    <div className='flex items-center justify-between gap-2'>
                         
                      <h3 className="font-bold text-sm">{habit.name}</h3>
                      <div className='flex gap-1'>
                        {habit.favorite ? (
                          <AiFillStar
                            className=' text-yellow-500 text-lg hover:scale-110 hover:text-yellow-400' onClick={()=>favorite(habit.id, habit.favorite)}
                          />
                        ) : (
                          <AiOutlineStar
                            className=' text-yellow-500 text-lg hover:scale-110 hover:text-yellow-400' onClick={()=>favorite(habit.id, habit.favorite)}
                          />
                        )
                        } 
                        <BsTrash3Fill
                          className="text-center text-red-300 text-lg hover:translate-x-1 transition-transform duration-200 hover:text-red-600"
                          onClick={() => del(habit.id)}
                        />
                      </div>
                      </div>
                      <p className='flex gap-2 items-center'>
                      {habit.completed ? (
                            <MdOutlineCheckBox className="text-green-500 hover:scale-110" onClick={()=>complete(habit.id, habit.completed)}/>
                          ) : (
                            <MdOutlineCheckBoxOutlineBlank className="text-red-500 hover:scale-110" onClick={()=>complete(habit.id, habit.completed)}/>
                          )}
                        {habit.start_time.slice(0,5)} - {habit.end_time.slice(0,5)}
                      </p>
                    </div>
                
                  </div>
                ))}
              </div>
              {/* Render Wednesday habits */}
              <div className='border-r border-r-black  '>
                <h2 className="text-xl font-bold mt-4 border-b border-b-black text-center  ">Wednesday </h2>
                {wednesday.map((habit) => (
                  <div key={habit.id} className={`flex items-center justify-center ${habit.favorite ? `bg-yellow-200`: `bg-gray-100`}  p-2 rounded-lg mt-2 cursor-pointer`} onClick={()=>setselectedHabit(habit)}>
                    <div className=''>
                    <div className='flex items-center justify-between gap-2'>
                         
                      <h3 className="font-bold text-sm">{habit.name}</h3>
                      <div className='flex gap-1'>
                        {habit.favorite ? (
                          <AiFillStar
                            className=' text-yellow-500 text-lg hover:scale-110 hover:text-yellow-400' onClick={()=>favorite(habit.id, habit.favorite)}
                          />
                        ) : (
                          <AiOutlineStar
                            className=' text-yellow-500 text-lg hover:scale-110 hover:text-yellow-400' onClick={()=>favorite(habit.id, habit.favorite)}
                          />
                        )
                        } 
                        <BsTrash3Fill
                          className="text-center text-red-300 text-lg hover:translate-x-1 transition-transform duration-200 hover:text-red-600"
                          onClick={() => del(habit.id)}
                        />
                      </div>
                      </div>
                      <p className='flex gap-2 items-center'>
                      {habit.completed ? (
                            <MdOutlineCheckBox className="text-green-500 hover:scale-110" onClick={()=>complete(habit.id, habit.completed)}/>
                          ) : (
                            <MdOutlineCheckBoxOutlineBlank className="text-red-500 hover:scale-110" onClick={()=>complete(habit.id, habit.completed)}/>
                          )}
                        {habit.start_time.slice(0,5)} - {habit.end_time.slice(0,5)}
                      </p>
                    </div>
                
                  </div>
                ))}
              </div>

              {/* Render Thursday habits */}
              <div className='border-r border-r-black  '>
                <h2 className="text-xl font-bold mt-4 border-b border-b-black text-center  ">Thursday </h2>
                {thursday.map((habit) => (
                  <div key={habit.id} className={`flex items-center justify-center ${habit.favorite ? `bg-yellow-200`: `bg-gray-100`}  p-2 rounded-lg mt-2 cursor-pointer`} onClick={()=>setselectedHabit(habit)}>
                    <div className=''>
                    <div className='flex items-center justify-between gap-2'>
                         
                      <h3 className="font-bold text-sm">{habit.name}</h3>
                      <div className='flex gap-1'>
                        {habit.favorite ? (
                          <AiFillStar
                            className=' text-yellow-500 text-lg hover:scale-110 hover:text-yellow-400' onClick={()=>favorite(habit.id, habit.favorite)}
                          />
                        ) : (
                          <AiOutlineStar
                            className=' text-yellow-500 text-lg hover:scale-110 hover:text-yellow-400' onClick={()=>favorite(habit.id, habit.favorite)}
                          />
                        )
                        } 
                        <BsTrash3Fill
                          className="text-center text-red-300 text-lg hover:translate-x-1 transition-transform duration-200 hover:text-red-600"
                          onClick={() => del(habit.id)}
                        />
                      </div>
                      </div>
                      <p className='flex gap-2 items-center'>
                      {habit.completed ? (
                            <MdOutlineCheckBox className="text-green-500 hover:scale-110" onClick={()=>complete(habit.id, habit.completed)}/>
                          ) : (
                            <MdOutlineCheckBoxOutlineBlank className="text-red-500 hover:scale-110" onClick={()=>complete(habit.id, habit.completed)}/>
                          )}
                        {habit.start_time.slice(0,5)} - {habit.end_time.slice(0,5)}
                      </p>
                    </div>
                
                  </div>
                ))}
              </div>

              {/* Render Friday habits */}
              <div className='border-r border-r-black  '>
                <h2 className="text-xl font-bold mt-4 border-b border-b-black text-center  ">Friday </h2>
                {friday.map((habit) => (
                  <div key={habit.id} className={`flex items-center justify-center ${habit.favorite ? `bg-yellow-200`: `bg-gray-100`}  p-2 rounded-lg mt-2 cursor-pointer`} onClick={()=>setselectedHabit(habit)}>
                    <div className=''>
                    <div className='flex items-center justify-between gap-2'>
                         
                      <h3 className="font-bold text-sm">{habit.name}</h3>
                      <div className='flex gap-1'>
                        {habit.favorite ? (
                          <AiFillStar
                            className=' text-yellow-500 text-lg hover:scale-110 hover:text-yellow-400' onClick={()=>favorite(habit.id, habit.favorite)}
                          />
                        ) : (
                          <AiOutlineStar
                            className=' text-yellow-500 text-lg hover:scale-110 hover:text-yellow-400' onClick={()=>favorite(habit.id, habit.favorite)}
                          />
                        )
                        } 
                        <BsTrash3Fill
                          className="text-center text-red-300 text-lg hover:translate-x-1 transition-transform duration-200 hover:text-red-600"
                          onClick={() => del(habit.id)}
                        />
                      </div>
                      </div>
                      <p className='flex gap-2 items-center'>
                      {habit.completed ? (
                            <MdOutlineCheckBox className="text-green-500 hover:scale-110" onClick={()=>complete(habit.id, habit.completed)}/>
                          ) : (
                            <MdOutlineCheckBoxOutlineBlank className="text-red-500 hover:scale-110" onClick={()=>complete(habit.id, habit.completed)}/>
                          )}
                        {habit.start_time.slice(0,5)} - {habit.end_time.slice(0,5)}
                      </p>
                    </div>
                
                  </div>
                ))}
              </div>

              {/* Render Saturday habits */}
              <div className='border-r border-r-black  '>
                <h2 className="text-xl font-bold mt-4 border-b border-b-black text-center  ">Saturday </h2>
                {saturday.map((habit) => (
                  <div key={habit.id} className={`flex items-center justify-center ${habit.favorite ? `bg-yellow-200`: `bg-gray-100`}  p-2 rounded-lg mt-2 cursor-pointer`} onClick={()=>setselectedHabit(habit)}>
                    <div className=''>
                    <div className='flex items-center justify-between gap-2'>
                         
                      <h3 className="font-bold text-sm">{habit.name}</h3>
                      <div className='flex gap-1'>
                        {habit.favorite ? (
                          <AiFillStar
                            className=' text-yellow-500 text-lg hover:scale-110 hover:text-yellow-400' onClick={()=>favorite(habit.id, habit.favorite)}
                          />
                        ) : (
                          <AiOutlineStar
                            className=' text-yellow-500 text-lg hover:scale-110 hover:text-yellow-400' onClick={()=>favorite(habit.id, habit.favorite)}
                          />
                        )
                        } 
                        <BsTrash3Fill
                          className="text-center text-red-300 text-lg hover:translate-x-1 transition-transform duration-200 hover:text-red-600"
                          onClick={() => del(habit.id)}
                        />
                      </div>
                      </div>
                      <p className='flex gap-2 items-center'>
                      {habit.completed ? (
                            <MdOutlineCheckBox className="text-green-500 hover:scale-110" onClick={()=>complete(habit.id, habit.completed)}/>
                          ) : (
                            <MdOutlineCheckBoxOutlineBlank className="text-red-500 hover:scale-110" onClick={()=>complete(habit.id, habit.completed)}/>
                          )}
                        {habit.start_time.slice(0,5)} - {habit.end_time.slice(0,5)}
                      </p>
                    </div>
                
                  </div>
                ))}
              </div>

              {/* Render Sunday habits */}
              <div className=' '>
                <h2 className="text-xl font-bold mt-4 border-b border-b-black text-center  ">Sunday </h2>
                {sunday.map((habit) => (
                  <div key={habit.id} className={`flex items-center justify-center ${habit.favorite ? `bg-yellow-200`: `bg-gray-100`}  p-2 rounded-lg mt-2 cursor-pointer`} onClick={()=>setselectedHabit(habit)}>
                    <div className=''>
                    <div className='flex items-center justify-between gap-2'>
                         
                      <h3 className="font-bold text-sm">{habit.name}</h3>
                      <div className='flex gap-1'>
                        {habit.favorite ? (
                          <AiFillStar
                            className=' text-yellow-500 text-lg hover:scale-110 hover:text-yellow-400' onClick={()=>favorite(habit.id, habit.favorite)}
                          />
                        ) : (
                          <AiOutlineStar
                            className=' text-yellow-500 text-lg hover:scale-110 hover:text-yellow-400' onClick={()=>favorite(habit.id, habit.favorite)}
                          />
                        )
                        } 
                        <BsTrash3Fill
                          className="text-center text-red-300 text-lg hover:translate-x-1 transition-transform duration-200 hover:text-red-600"
                          onClick={() => del(habit.id)}
                        />
                      </div>
                      </div>
                      <p className='flex gap-2 items-center'>
                      {habit.completed ? (
                            <MdOutlineCheckBox className="text-green-500 hover:scale-110" onClick={()=>complete(habit.id, habit.completed)}/>
                          ) : (
                            <MdOutlineCheckBoxOutlineBlank className="text-red-500 hover:scale-110" onClick={()=>complete(habit.id, habit.completed)}/>
                          )}
                        {habit.start_time.slice(0,5)} - {habit.end_time.slice(0,5)}
                      </p>
                    </div>
                
                  </div>
                ))}
              </div>

              </div> 
            </div>

            {selectedHabit ? (
        <HabitDetailsPopup habit={selectedHabit} onClose={()=>setselectedHabit(null)} />
      ) : (
        <HabitForm />
      )}
            </div>
          );
        };


export default HabitsList;