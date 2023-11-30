import React, { useState } from "react";
import {ImLocation} from 'react-icons/im'
import {BiSolidTimeFive} from 'react-icons/bi'

function AddEvent() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [frequency, setFrequency] = useState('one time');

    const fullStartDate = `${startDate}:00`;
    const fullEndDate = `${endDate}:00`;

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const days = formData.getAll("days");
        const location = formData.get("location");
        const eventBody = {
            summary: title,
            description: description,
            start: { dateTime: fullStartDate, timeZone: "America/Los_Angeles" },  // Adjust timeZone as needed
            end: { dateTime: fullEndDate, timeZone: "America/Los_Angeles" },
            frequency: frequency,
            days: days,
            location: location
        };

        try {
            console.log(eventBody);
            const response = await fetch("http://localhost:8080/add_event", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(eventBody),
                credentials: 'include'
            });

            if (response.ok) {
                window.location.href = "http://localhost:3000/calender";  // Redirect to homepage
            } else {
                alert("Failed to add event. Please try again.");
            }
        } catch (error) {
            console.error("Error adding event:", error);
        }
    };

    return (
        <div className="">
            <form 
                className="bg-purple-200 p-3 w-96 flex items-start justify-center rounded-md border border-slate-700 flex-col gap-3"
                onSubmit={handleSubmit}
            >
                <div className='flex justify-between w-full'>
                    <div className="text-xl font-bold text-slate-600">Add a Calender Event</div>
                </div>
                <div>
                    <input placeholder="Add Title" type="text" className="rounded-sm p-2 focus:outline-none focus:border-b-2 w-80 focus:border-blue-500 focus:bg-slate-100" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                

                <div className='flex flex-col gap-2'>
                    <span className='flex gap-2 items-center'>
                    <div className='w-8 flex justify-center'>
                        <BiSolidTimeFive className='text-xl text-blue-700' />
                    </div>          
                    <input type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)} required/>
                    </span>
                        
                    <span className='flex gap-2 items-center'>
                    <div className='w-8 flex justify-center'>
                        <p className='text-lg text-blue-700'>to</p>
                    </div>
                    <input type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)} required/>
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
                    
                    <textarea placeholder="Add a description.." 
                        className="rounded-sm p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-slate-100 w-80"
                        value={description} 
                        rows={4}
                        onChange={(e) => setDescription(e.target.value)} 
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
        </div>
    );
}

export default AddEvent;
