import React from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import AddEvent from "@/components/add_event";
import { useState, useEffect } from "react";
import AddCalendar from "./AddCalender";


function Calendar() {
  const [userInfo, setUserInfo] = useState(null);
  const [events, setEvents] = useState([]);
  const   calendarEvents = Array.isArray(events) ? 
  events.map(event => ({
    title: event.summary,
    start: new Date(event.start.dateTime),
    end: new Date(event.end.dateTime),
  })) : [];

  useEffect(() => {
    fetch('http://localhost:8080/user_info', {credentials: 'include'})
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setUserInfo(data);
        });

    fetch('http://localhost:8080/events', {credentials: 'include'})
        .then(response => response.json())
        .then(data => {
          console.log("now printing")
          console.log(data);
          setEvents(data);
        });
}, []);

  return (
   <div className="flex justify-between gap-4 m-5">

    
    {/* {userInfo && (
            <div>
                <img src={userInfo.picture} alt="User profile" />
                <p>Welcome to P-reset, <strong>{userInfo.given_name}</strong>!</p>
            </div>
        )} */}
    {/* {events.length > 0 && (
            <div>
                <h2><strong>10 Upcoming Events</strong></h2>
                <ul>
                    {events.map(event => (
                        <li key={event.id}>
                            {event.summary}: <i>{new Date(event.start.dateTime || event.start.date).toLocaleString()}</i>
                        </li>
                    ))}
                </ul>
            </div>
        )} */}
    <div className="flex w-full m-5">
  {/* Calendar Section */}
  <div className="w-full mb-8 z-1" >
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={calendarEvents}
    />
  </div>
 
  {/* Right Side Section for Button and Form */}
  
</div>


    <AddCalendar/>
    </div>

  );
}

export default Calendar;