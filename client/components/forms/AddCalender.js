import React from 'react'
import { useState } from "react";
import {ImLocation} from 'react-icons/im'
import {AiOutlineStar} from 'react-icons/ai'
import {AiFillStar} from 'react-icons/ai'
import {BiSolidTimeFive} from 'react-icons/bi'

const AddCalendar = () => {

    const [isFavorite, setIsFavorite] = useState(false);
    const [frequency, setFrequency] = useState('one time');

    const user_id = 2
    console.log(frequency)
    const handleSubmit = async(event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const header = formData.get("header");
      const description = formData.get("description");
      const startDateTime = formData.get('start_datetime'); // Retrieves the combined date and time
      const endDateTime = formData.get('end_datetime'); // Retrieves the combined date and time
      const fullStartDate = `${startDateTime}:00`;
      const fullEndDate = `${endDateTime}:00`;
      const location = formData.get("location");
      // const file = formData.get("file");
      const days = formData.getAll("days");
      if (frequency !== 'one time' && days.length === 0) {
        alert('Please select at least one day for repeating events.');
        return;
      }      
      const data = { header, description, location, frequency, start_time: fullStartDate,
        end_time: fullEndDate, days, isFavorite };
      // const jsonData = JSON.stringify(data);
      
      try {
        console.log(data);
        const response = await fetch(`http://127.0.0.1:8080/add_event`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        });
        
        console.log(response)
        if (response.ok) {
            setIsFavorite(false);
            alert("Event added successfully!");
            window.location.href = "http://localhost:3000";  // Redirect to homepage
        } else {
            alert("Failed to add event. Please try again.");
        }
    } catch (error) {
        console.error("Error adding event:", error);
    }
    };
  return (
    <div className="bg-purple-200">
      <form
        action={`/api/users/${user_id}/events`}
        method="POST"
        className="p-3 h-full w-96 flex items-start justify-center rounded-md border border-slate-700 flex-col gap-3"
        onSubmit={handleSubmit}
      >
        <div className='flex justify-between w-full'>
          <div className="text-xl font-bold text-slate-600">Add a Calender Event</div>
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

        <div className='flex flex-col gap-2'>
          <span className='flex gap-2 items-center'>
          <div className='w-8 flex justify-center'>
            <BiSolidTimeFive className='text-xl text-blue-700' />
          </div>          
          <input
            type="datetime-local"
            name="start_datetime"
            className="rounded-sm p-2 focus:outline-none focus:border-b-2 w-80 focus:border-blue-500 focus:bg-slate-100"
            required
          />
          </span>
              
          <span className='flex gap-2 items-center'>
          <div className='w-8 flex justify-center'>
            <p className='text-lg text-blue-700'>to</p>
          </div>
          <input
            type="datetime-local"
            name="end_datetime"
            className="rounded-sm p-2 focus:outline-none focus:border-b-2 w-80 focus:border-blue-500 focus:bg-slate-100"
            required
          />
          </span>
        </div>

        <div className='flex gap-2 items-center'>
          <p className='text-lg text-slate-400'>Repeat: </p>
          <select
            className="rounded-sm p-2 focus:outline-none focus:border-b-2 w-64 focus:border-blue-500 focus:bg-slate-100"
            name="frequency"
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            required
          >
            <option value="one time">One Time</option>
            <option value="every week">Every Week</option>
            <option value="every other week">Every Other Week</option>
            <option value="once a month">Once a Month</option>
          </select>
        </div>

        {frequency !== 'one time' && (
          <div>
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
          </div>
        )}
        


        <div>
          <textarea
            placeholder="Add a description.."
            className="rounded-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-slate-100 w-80"
            rows={4}
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

      {/* <div className='flex gap-2 items-center'>
        <FaUpload className='text-xl text-blue-700'/>
        <input type="file" name="file"/>
      </div> */}


        <div className="flex">
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
  )
}

export default AddCalendar
