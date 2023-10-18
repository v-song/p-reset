import React from 'react'
import {BsCalendarPlus} from 'react-icons/bs'

const Journal = ({Open}) => {
  return (
    <div className="w-full flex justify-center items-center"> 
        <form
        className="p-5 h-full w-96 mt-8 flex items-start justify-center rounded-md border border-slate-700 flex-col gap-3">
          <div className='flex flex-col gap-5 justify-between w-full'>
            <div className="text-xl font-bold text-slate-600">Add a journal</div>

        <div>
          <input
            placeholder="Add Title"
            type="text"
            className="rounded-sm p-2 focus:outline-none focus:border-b-2 w-80 focus:border-blue-500 focus:bg-slate-100"
            name="header"
            required/>
        </div>

        <div className='flex gap-2 items-center'>
          <BsCalendarPlus className='text-xl text-blue-700'/>
          <input
            type="datetime-local"
            name="journal_date"
            className="rounded-sm p-2 focus:outline-none focus:border-b-2 w-36 focus:border-blue-500 focus:bg-slate-100 " 
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
