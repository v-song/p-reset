import React from 'react'
import { useState, useEffect } from "react";

const Calender = () => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const hoursOfDay = ['12am', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm'];

    const user_id = 2
    const  [events, setEvents] = useState([])
    useEffect(() => {
        fetch(`http://127.0.0.1:5000/api/users/${user_id}/events`,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(response => response.json())
          .then(data => setEvents(data))
            .then(console.log(events))
          .catch(error => console.error(error));
      }, []);
    

    

    return (
        <div className='p-5'>
            <h1 className="text-2xl font-bold text-center mb-5">Your Upcoming Week</h1>
            <div className="grid grid-cols-7">
                {daysOfWeek.map(day => (
                    <div key={day} className="border border-black">
                        <h3 className="font-bold text-center">{day}</h3>
                        {hoursOfDay.map(hour => (
                            <div key={`${day}-${hour}`} className="border border-black p-1">
                                {hour}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            {events.map(event => {
                  return (
                        <div key={event.id}>
                            <p>{event.header}</p>
                            <p>{event.description}</p>
                            <p>{event.start_time}</p>
                            <p>{event.end_time}</p>
                            <p>{event.days}</p>
                        </div>
                    )
                })}
        </div>
    )
}

export default Calender
