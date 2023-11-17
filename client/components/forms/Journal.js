import React from 'react'
import { useState } from "react";
import {AiOutlineStar} from 'react-icons/ai'
import {AiFillStar} from 'react-icons/ai'
import { useRouter } from "next/router";

const Journal = () => {
    const [isFavorite, setIsFavorite] = useState(false);
    const router = useRouter();
    const { id } = router.query;

    const handleSubmit = async(event) => {
      event.preventDefault();
      const formData = new FormData(event.target);
      const header = formData.get("header");
      const description = formData.get("description");
      const datetime = formData.get("journal_date");;
      // const file = formData.get("file");
      const data = { header, description, datetime, isFavorite};
      console.log(data);
      console.log(id)
      await fetch(`http://localhost:8080/api/users/${id}/journals`, {
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
            alert("Journal added successfully!");
            location.reload();
        })
        .catch((error) => console.log(error));
    }
  return (
    <div> 
        <form
        action={`/api/users/${id}/journals`}
        method="POST"
        onSubmit={handleSubmit}
        className="p-5 w-96 flex items-start justify-center rounded-md border border-slate-700 flex-col gap-3 bg-slate-400">
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
