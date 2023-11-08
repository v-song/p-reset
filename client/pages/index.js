import React, { useEffect, useState } from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import AddEvent from "@/components/add_event";

function index() {

  const [userInfo, setUserInfo] = useState(null);
  const [events, setEvents] = useState([]);
  const calendarEvents = Array.isArray(events) ? 
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

  return(
    <div>
      <div className="flex justify-between items-center text-white">


      <div className="flex gap-4">
        <button className="button" onClick={() => window.location.href = 'http://localhost:8080/google/login'}>
          Login with Google
        </button>
        
        <button className="button" onClick={() => window.location.href = 'http://localhost:8080/logout'}>
          Logout from Google
        </button>
      </div>


      <div className="flex gap-4">
        <button className="button" onClick={() => window.location.href = "http://localhost:3000"}>Link 1</button>
        <button className="button" onClick={() => window.location.href = "http://localhost:3000"}>Link 2</button>
        <button className="button" onClick={() => window.location.href = "http://localhost:3000"}>Link 3</button>
      </div>

    </div>
    <hr></hr>
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
    <div className="flex h-screen ">
  {/* Calendar Section */}
  <div className="w-3/5 -mt-5" >
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={calendarEvents}
    />
  </div>

  {/* Right Side Section for Button and Form */}
  <div className=" p-4">
    <AddEvent />
  </div>
</div>

    </div>
  );
}


export default index;