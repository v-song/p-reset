import React from 'react'
import {BsCalendarPlus} from 'react-icons/bs'
import { useState } from "react";
import {AiOutlineStar} from 'react-icons/ai'
import {AiFillStar} from 'react-icons/ai'

const Journal = ({Open}) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const user_id = 2

    const handleSubmit = async(event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const header = formData.get("header");
      const description = formData.get("description");
      const datetime = formData.get("journal_date");;
      // const file = formData.get("file");
      const data = { header, description, datetime, isFavorite };
      // const jsonData = JSON.stringify(data);
      console.log(data);
      await fetch(`http://127.0.0.1:5000/api/users/${user_id}/journals`, {
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
            alert("Journal added successfully!");
        })
        .catch((error) => console.log(error));
    }
  return (
    <div className="fixed left-1/3 bg-slate-400 z-100"> 
        <form
        action={`/api/users/${user_id}/journals`}
        method="POST"
        onSubmit={handleSubmit}
        className="p-5 h-full w-96 flex items-start justify-center rounded-md border border-slate-700 flex-col gap-3">
          <div className='flex flex-col gap-5 justify-between w-full'>
          <div className='flex justify-between w-full'>

          <div className="text-xl font-bold text-slate-600">Add a Journal</div>
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
            name="header"
            required/>
        </div>

        <div className=''>
          <input
            type="datetime-local"
            name="journal_date"
            className="rounded-sm p-2 focus:outline-none focus:border-b-2 w-full focus:border-blue-500 focus:bg-slate-100 " 
            required
          />
        </div>

        <div>
          <textarea
            placeholder="Add a description.."
            className="rounded-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-slate-100 w-80"
            rows={6}
            name="description"
            required
          />
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

          </div>
        </form>
    </div>
  )
}

export default Journal
