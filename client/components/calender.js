import React from 'react'
import { useState } from "react";
import {ImLocation} from 'react-icons/im'
import {AiOutlineStar} from 'react-icons/ai'
import {AiFillStar} from 'react-icons/ai'
import {FaUpload} from 'react-icons/fa'
import {BiSolidTimeFive} from 'react-icons/bi'

const Calender = ({Open}) => {

    const [isFavorite, setIsFavorite] = useState(false);
    const user_id = 2

    const handleSubmit = async(event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const header = formData.get("header");
      const description = formData.get("description");
      const start_time = formData.get("start_time");;
      const end_time = formData.get("end_time");
      const location = formData.get("location");
      // const file = formData.get("file");
      const frequency = formData.get("frequency");
      const days = formData.getAll("days");
      if (days.length === 0) {
        alert("Please select at least one day.");
        return;
      }
      const data = { header, description, location, frequency, start_time, end_time, days, isFavorite };
      // const jsonData = JSON.stringify(data);
      console.log(data);
      await fetch(`http://127.0.0.1:5000/api/users/${user_id}/events`, {
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
            Open();
            setIsFavorite(false);
            alert("Task added successfully!");
        })
        .catch((error) => console.log(error));
    };
  return (
    <div className=''>
    <div className="w-full flex justify-center items-center">
      <form
        action={`/api/users/${user_id}/events`}
        method="POST"
        className="p-5 h-full w-96 mt-8 flex items-start justify-center rounded-md border border-slate-700 flex-col gap-3"
        onSubmit={handleSubmit}
      >
        <div className='flex justify-between w-full'>
          <div className="text-xl font-bold text-slate-600">Add a task</div>
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
            name="header"
            required
          />
        </div>

        <div className='flex gap-2 items-end'>
          <span className='flex gap-2 items-center w-1/2'>
          <BiSolidTimeFive className='text-xl text-blue-700'/>
          <input
            type="time"
            name="start_time"
            className="rounded-sm p-2 focus:outline-none focus:border-b-2 w-36 focus:border-blue-500 focus:bg-slate-100 " 
            required
          />
          </span>
              
          <span className='flex gap-2 items-center'>
          <p className='text-lg text-blue-700'>to</p>
          <input
            placeholder="Add Date"
            type="time"
            name="end_time"
            className="rounded-sm p-2 focus:outline-none focus:border-b-2 w-36 focus:border-blue-500 focus:bg-slate-100"
            required
          />
          </span>
        </div>

        <p className='text-slate-400 text-lg'>Select Occuring Days</p>
        <div className='flex gap-2 items-center'>
          <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" 
          name="days"/>
          <label className="ml-2 block text-sm text-gray-900">M</label>

          <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" 
          name="days"/>
          <label className="ml-2 block text-sm text-gray-900">T</label>

          <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" 
          name="days"/>
          <label className="ml-2 block text-sm text-gray-900">W</label>

          <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" 
           name="days"/>
          <label className="ml-2 block text-sm text-gray-900">TR</label>

          <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
           name="days" />
          <label className="ml-2 block text-sm text-gray-900">F</label>

          <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" 
           name="days"/>
          <label className="ml-2 block text-sm text-gray-900">S</label>

          <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
           name="days" />
          <label className="ml-2 block text-sm text-gray-900">SU</label>
        </div>
        
        <div className='flex gap-2 items-center'>
          <p className='text-lg text-slate-400'>Repeat: </p>
            <select
              className="rounded-sm p-2 focus:outline-none focus:border-b-2 w-64 focus:border-blue-500 focus:bg-slate-100"
              name="frequency"
              defaultValue={"one time"}
              required
            >
              <option value="one time">One Time</option>
              <option value="every week">Every Week</option>
              <option value="every other week">Every Other Week</option>
              <option value="once a month">Once a Month</option>
            </select>
        </div>


        <div>
          <textarea
            placeholder="Add a description.."
            className="rounded-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-slate-100 w-80"
            rows={6}
            name="description"
          />
        </div>

      <div className='flex gap-2 items-center'>
        <ImLocation className='text-xl text-blue-700'/>
        <input
          placeholder="Add Location"
          type="text"
          name="location"
          className="rounded-sm p-2 focus:outline-none focus:border-b-2 w-80 focus:border-blue-500 focus:bg-slate-100"
          />
      </div>

      <div className='flex gap-2 items-center'>
        <FaUpload className='text-xl text-blue-700'/>
        <input type="file" name="file"/>
      </div>


        <div className="flex">
          <button
            type="button"
            tabIndex={0}
            className="mt-3 w-24 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:scale-95 ml-3"
            onClick={() => Open()}
          >
            Cancel
          </button>

          <button
            type="submit"
            tabIndex={0}
            className="mt-3 w-24 rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 hover:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ml-3 "
          >
            Confirm
          </button>

         
        </div>
      </form>
    <div/>

    </div>
  </div>
  )
}

export default Calender
