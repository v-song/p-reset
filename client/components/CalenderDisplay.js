import React from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import AddEvent from "@/components/add_event";
import { useState, useEffect } from "react";
import AddCalendar from "./forms/AddCalender";
import EventDetailsPopup from "./EventDetailsPopup";


function CalendarDisplay() {
  const [userInfo, setUserInfo] = useState(null);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const calendarEvents = Array.isArray(events) ? 
  events.map(event => ({
    title: event.summary,
    start: new Date(event.start.dateTime),
    end: new Date(event.end.dateTime),
    extendedProps: {
      description: event.description,
      location: event.location
    },
  })) : [];
  const headerToolbar = {
    left: 'dayGridMonth,dayGridWeek',
  };

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
          console.log(data);
          setEvents(data);
        });
}, []);

  const handleEventClick = (clickInfo) => {
    console.log('set selected event')
    console.log(clickInfo.event.title)
    setSelectedEvent({
      description: clickInfo.event.extendedProps.description,
      location: clickInfo.event.extendedProps.location,
      title: clickInfo.event.title,
      start: clickInfo.event.start,
      end: clickInfo.event.end,
       // or however you store it
    });
    
  };

  const closePopup = () => {
    setSelectedEvent(null);
  };

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
 
    {/* <div className="bg-slate-100 flex flex-col gap-1 p-2 rounded-xl">
                <h1 className="text-2xl font-bold text-center">Your Events</h1>
                <h1 className="font-bold text-indigo-800">
                  Welcome to Your Personalized Self-Care Events Space!
                </h1>
                <p>
  <span className="font-bold">📅 Add & View Events:</span> Use the form to seamlessly integrate moments into your Google Calendar. Make it a visual journey, adding milestones and activities effortlessly.
</p>

 <p>
  <span className="font-bold">🔍 AI Calendar Analysis:</span> Let AI analyze your calendar. It goes beyond storing events, interpreting patterns, and providing insights. Recognize trends, optimize your routine, and get personalized recommendations for efficient time management.
</p>


<p>
  <span className="font-bold">📈 Time Management Insights:</span> AI offers time management insights. Identify productivity peaks, discover relaxation moments, and receive recommendations for a balanced routine. Your calendar transforms into a strategic tool for personal growth.
</p>

<p>
  <span className="font-bold">✨ Nurturing Well-being:</span> With every event added, your Google Calendar becomes a canvas for life's moments. AI, with analytical prowess, supports well-being by providing insights, enhancing time management, and ensuring a harmonious life blend.
</p>

        </div> */}
    
    
  {/* Calendar Section */}
  <div className="w-full rounded-[20px] mb-8 p-10 bg-[rgba(200,193,193,0.5)]" >
  <FullCalendar
            headerToolbar={headerToolbar}
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={calendarEvents}
            eventClick={handleEventClick}
          />
  </div>

  
  {/* Right Side Section for Button and Form */}
  


    {selectedEvent ? (
        <EventDetailsPopup event={selectedEvent} onClose={closePopup} />
      ) : (
        <AddEvent />
      )}
    </div>

  );
}

export default CalendarDisplay;