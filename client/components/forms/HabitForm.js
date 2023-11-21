import React from 'react'
import { useState } from "react";
import {AiOutlineStar} from 'react-icons/ai'
import {AiFillStar} from 'react-icons/ai'
import { useRouter } from 'next/router';

const HabitForm = () => {
  const [showManual, setShowManual] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className='mt-2'>
      <div className="flex justify-center px-1">
        <button className={`hover:border-b-2 ${showManual ? 'border-b-2 border-b-violet-700' : ''} text-violet-400 text-xl font-bold`} onClick={() => setShowManual(true)}>
          Add Manual
        </button>
        <div className='text-center w-6 text-violet-700 text-xl font-bold'>|</div>
        <button className={`hover:border-b-2 ${!showManual ? 'border-b-2 border-b-violet-700' : ''} w-36 text-violet-400 text-xl font-bold`} onClick={()=> setShowManual(false)}>
          Generate Recs
        </button>
      </div>
      {showManual ? manual(id) : generate_recs(id)}
    </div>
  )
}

export default HabitForm

const manual = (id) => {
  const [isFavorite, setIsFavorite] = useState(false);

    const handleSubmit = async(event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const name = formData.get("name");
      const description = formData.get("description");
      const start_time = formData.get("start_time");
      const end_time = formData.get("end_time");
      const day = formData.get("day");
      const data = { name, description, start_time, end_time, day, isFavorite };
      await fetch(`http://localhost:8080/api/users/${id}/habits`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) {
            console.log(response);
          }
          return response.json();
        })
        .then((data) => {
            console.log(data);
            setIsFavorite(false);
            alert("Habit added successfully!");
            location.reload();
        })
        .catch((error) => console.log(error));
    };
  return (
    <div className="bg-green-300 m-3">
      <form
        action={`/api/users/${id}/habits`}
        method="POST"
        className="p-3 h-full w-84 flex items-start justify-center rounded-md border border-slate-700 flex-col gap-3"
        onSubmit={handleSubmit}
      >
        <div className='flex justify-between w-full'>
          <div className="text-xl font-bold text-slate-600">Add a Habit</div>
          <button type="button" onClick={()=>setIsFavorite(!isFavorite)}>
              {
                isFavorite ? <AiFillStar className='text-yellow-500 text-2xl'/> : <AiOutlineStar className='text-yellow-500 text-2xl'/>
              }
            </button>
          </div>

          <div>
          <input
            placeholder="Add Title"
            type="text"
            className="rounded-sm p-2 focus:outline-none focus:border-b-2 w-80 focus:border-blue-500 focus:bg-slate-100"
            name="name"
            required
          />
        </div>

        <p className='text-slate-400 text-lg'>Select Day</p>
        <div className=''>
          <select className="rounded-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-slate-100 w-80" name="day">
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </select>
        </div>

        <div className="flex flex-col gap-3">
              <div className="flex gap-3">
                <label htmlFor="start_time" className="text-slate-400 text-lg">
                  Start Time
                </label>
                <input
                  type="time"
                  id="start_time"
                  name="start_time"
                  className="rounded-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-slate-100"
                  required
                />
              </div>

              <div className="flex gap-3">
                <label htmlFor="end_time" className="text-slate-400 text-lg">
                  End Time
                </label>
                <input
                  type="time"
                  id="end_time"
                  name="end_time"
                  className="rounded-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-slate-100"
                />
              </div>

            <div>
              <textarea
                placeholder="Add a description.."
                className="rounded-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-slate-100 w-80"
                rows={4}
                name="description"
              />
            </div>

            

              <div className="flex">
                <button
                  type="submit"
                  tabIndex={0}
                  className="mt-3 w-24 rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 hover:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ml-3 "
                >
                  Confirm
                </button>
              </div>
            </div>
          </form>
        <div/>

    </div>
  )
}

       


const generate_recs = (id) => {
  const [isFavorite, setIsFavorite] = useState(false);

    const handleSubmit = async(event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const name = formData.get("name");
      const description = formData.get("description");
      const frequency = formData.get("frequency");
      const days = formData.getAll("days");
      if (days.length === 0) {
        alert("Please select at least one day.");
        return;
      }
      const data = { name, description, frequency, days, isFavorite };
      await fetch(`http://localhost:8080/api/users/${id}/habits`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) {
            console.log(response);
          }
          return response.json();
        })
        .then((data) => {
            console.log(data);
            setIsFavorite(false);
            alert("Habit added successfully!");
            location.reload();
        })
        .catch((error) => console.log(error));
    };
  return (
    <div className="bg-green-300 m-3">
      <form
        action={`/api/users/${id}/habits`}
        method="POST"
        className="p-3 h-full w-96 flex items-start justify-center rounded-md border border-slate-700 flex-col gap-3"
        onSubmit={handleSubmit}
      >
        <div className='flex justify-between w-full'>
          <div className="text-xl font-bold text-slate-600">Gennerate Habit Time Recs (WORK IN PROGRESS)</div>
          <button type="button" onClick={()=>setIsFavorite(!isFavorite)}>
              {
                isFavorite ? <AiFillStar className='text-yellow-500 text-2xl'/> : <AiOutlineStar className='text-yellow-500 text-2xl'/>
              }
            </button>
          </div>

        <div >
          <input
            placeholder="Add Title"
            type="text"
            className="rounded-sm p-2 focus:outline-none focus:border-b-2 w-80 focus:border-blue-500 focus:bg-slate-100"
            name="name"
            required
          />
        </div>

        <p className='text-slate-400 text-lg'>Select Occuring Days</p>
        <div className='flex gap-2 items-center'>
          <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" value="Monday" 
          name="days"/>
          <label className="ml-2 block text-sm text-gray-900">M</label>

          <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" value="Tuesday"
          name="days"/>
          <label className="ml-2 block text-sm text-gray-900">T</label>

          <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" value="Wednesday"
          name="days"/>
          <label className="ml-2 block text-sm text-gray-900">W</label>

          <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" value="Thursday"
           name="days"/>
          <label className="ml-2 block text-sm text-gray-900">TR</label>

          <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" value="Friday"
           name="days" />
          <label className="ml-2 block text-sm text-gray-900">F</label>

          <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" value="Saturday"
           name="days"/>
          <label className="ml-2 block text-sm text-gray-900">S</label>

          <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" value="Sunday"
           name="days" />
          <label className="ml-2 block text-sm text-gray-900">SU</label>
        </div>
        
        <div className='flex gap-2 items-center w-64'>
          <p className='text-lg text-slate-400'>How many times during each day: </p>
            <input
              className="rounded-sm p-2 focus:outline-none focus:border-b-2 w-20 focus:border-blue-500 focus:bg-slate-100"
              type="number"
              name="frequency"
              defaultValue={1}
              required
            >
            </input>
        </div>


        <div>
          <textarea
            placeholder="Add a description.."
            className="rounded-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-slate-100 w-80"
            rows={4}
            name="description"
          />
        </div>

        <div className="flex">
          <button
            type="submit"
            tabIndex={0}
            disabled
            className="mt-3 w-24 rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 hover:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ml-3 cursor-not-allowed"
          >
            Confirm
          </button>

         
        </div>
      </form>
    <div/>

    </div>
  )
}