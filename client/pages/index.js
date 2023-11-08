import React from "react";
import Navbar from "@/components/Navbar";
import Entries from "@/components/entries";
import Head from "next/head";
import Hero from "@/components/Hero";
import Calender from "@/components/calender";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import AddEvent from "@/components/add_event";
import { useState, useEffect } from "react";


function MyComponent() {
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

  return (
   <div>
    <Head>
      <title>p-Reset: Self-Care App</title>
    </Head>
    <Navbar />
    <Hero/>
    <Calender/>
    <Entries/>
    </div>
  )
}

export default MyComponent;