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
            <style jsx>{`
                ::placeholder {
                    color: #907D57;
                    opacity: 1; 
                    }
            `}</style>
            <form 
                className="bg-[#CEB7B7] p-6 flex items-start justify-center rounded-[20px] flex-col gap-1"
                onSubmit={handleSubmit}
            >
                <div className='flex justify-between w-full'>
                    <div className="text-[#4E3506] text-[25px]  font-semibold">Add a Calendar Event</div>
                </div>
                <div>
                    <input placeholder="Add Title" type="text" className="bg-[#FFEDE9] rounded-[14px] text-[#907D57] px-4 py-2 focus:outline-none focus:border-b-2 w-80 focus:border-blue-500 focus:bg-[#FFF7F9]" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                

                <div className='flex flex-col '>
                    <span className='flex gap-2 items-center'>
                    {/* <div className='w-8 flex justify-center'>
                        <BiSolidTimeFive className='text-xl text-blue-700' />
                    </div>           */}
                    <input type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)} required className='rounded-[14px]'/>
                    </span>
                        
                    <span className='flex gap-2 items-center'>
                    {/* <div className='w-8 flex justify-center'>
                        <p className='text-lg text-blue-700'>to</p>
                    </div> */}
                    <input type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)} required className='rounded-[14px]'/>
                    </span>
                </div>

                <div className='flex gap-2 items-center py-2'>
                    <p className='text-[#674A14] text-lg'>Repeat: </p>
                    <select
                        className="bg-[#FFEDE9] rounded-[14px] text-[#907D57] p-2 focus:outline-none focus:border-b-2 w-64 focus:border-blue-500 focus:bg-[#FFF7F9]"
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
                    <p className='text-[#674A14] text-lg'>Select Occuring Days</p>
                    <div className='pt-2 flex gap-4 items-center justify-center'>
                        <div className="flex-col items-center justify-center">
                            <label className="text-center block text-sm text-[#4E3506]">M</label>
                            <input type="checkbox" className="h-5 w-5 text-blue-600 focus:ring-blue-500 rounded" value="Monday" 
                        name="days"/>
                            
                        </div>
                        <div className="flex-col items-center justify-center">
                            <label className="text-center block text-sm text-[#4E3506]">T</label>
                            <input type="checkbox" className="h-5 w-5 text-blue-600 focus:ring-blue-500 rounded" value="Tuesday"
                        name="days"/>
                            
                        </div>
                        <div className="flex-col items-center justify-center">
                            <label className="text-center block text-sm text-[#4E3506]">W</label>
                            <input type="checkbox" className="h-5 w-5 text-blue-600 focus:ring-blue-500 rounded" value="Wednesday"
                                                name="days"/>
                        </div>
                        <div className="flex-col items-center justify-center">
                            <label className="text-center block text-sm text-[#4E3506]">TR</label>
                            <input type="checkbox" className="h-5 w-5 text-blue-600 focus:ring-blue-500 rounded" value="Thursday"
                                                name="days"/>
                        </div>

                        <div className="flex-col items-center justify-center">
                            <label className="text-center block text-sm text-[#4E3506]">F</label>
                            <input type="checkbox" className="h-5 w-5 text-blue-600 focus:ring-blue-500 rounded" value="Friday"
                    name="days" />
                        </div>

                        <div className="flex-col items-center justify-center">
                            <label className="text-center block text-sm text-[#4E3506]">S</label>
                            <input type="checkbox" className="h-5 w-5 text-blue-600 focus:ring-blue-500 rounded" value="Saturday"
                        name="days"/>
                        </div>
                        
                        <div className="flex-col items-center justify-center">
                            <label className="text-center block text-sm text-[#4E3506]">SU</label>
                            <input type="checkbox" className="h-5 w-5 text-blue-600 focus:ring-blue-500 rounded" value="Sunday"
                    name="days" />
                        </div>
                    

                    
                    
                    

                    
                    

                    </div>
                </div>
                )}

                <div>
                    
                    <textarea placeholder="Add a description.." 
                        className="bg-[#FFEDE9] rounded-[14px] text-[#907D57] px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-[#FFF7F9] w-80"
                        value={description} 
                        rows={4}
                        onChange={(e) => setDescription(e.target.value)} 
                    />
                </div>

                <div className='flex  items-center -mt-2'>
                    {/* <ImLocation className='text-xl text-blue-700'/> */}
                    <input
                    placeholder="Add Location"
                    type="text"
                    name="location"
                    className="description bg-[#FFEDE9] rounded-[14px] px-4 py-2 focus:outline-none focus:border-b-2 w-80 focus:border-blue-500 focus:bg-[#FFF7F9]"
                    />
                    
                </div>
                
                <div className="flex mt-2">
                    <button
                        type="submit"
                        tabIndex={0}
                        className="text-[#907D57] w-24 rounded-[14px] border border-transparent shadow-sm px-4 py-2 bg-[#FFF6E9] text-base font-medium hover:bg-blue-600 hover:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 "
                    >
                        Confirm
                    </button>
                    
                </div>
            </form>
        </div>
    );
}

export default AddEvent;
