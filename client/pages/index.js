import React from "react";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import Insights from "@/components/Insights";
import { useEffect, useState } from "react";
import { LoadingPage } from "@/components/Loading";
import Analytics from "@/components/Analytics";


function MyComponent() {
  const [userInfo, setUserInfo] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [habits, setHabits] = useState(null);
  const [habitsPie, setHabitsPie] = useState(null); // [completed, incomplete
  const [journals, setJournals] = useState(null);
  const [emotions, setEmotions] = useState(null);
  const [emotionalState, setEmotionalState] = useState(null);
  const [events, setEvents] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/user_info', {credentials: 'include'})
        .then(response => response.json())
        .then(data => {
        console.log(data);
        if (data.error) {
            window.location.href = '/about';
        }else{
        setUserInfo(data);
        getData(data.id);
        }
        setIsLoaded(true);
        })
}, []);

const getData = (id) => {
  fetch(`http://localhost:8080/api/users/${id}/habits`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            })
              .then((response) => response.json())
              .then((data) => {
                setHabits(data.habits);
                setHabitsPie(data.pie);
              })
              .catch((error) => {
                console.error('Error:', error);
              });
  fetch(`http://localhost:8080/api/users/${id}/journals`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            })
              .then((response) => response.json())
              .then((data) => {
                setJournals(data.journals);
                setEmotions(data.emotions);
                setEmotionalState(
                  data.emotions[2] <= 1.5 ? "angry" :
                  data.emotions[2] <= 2.5 ? "sad" :
                  data.emotions[2] <= 3.5 ? "happy" :
                "excited")
              })
              .catch((error) => {
                console.error('Error:', error);
              });

    fetch('http://localhost:8080/events?limit=10', {credentials: 'include'})
    .then(response => response.json())
    .then(data => {
      setEvents(data.slice(0,5));
    });
}

if (!isLoaded) {
    return <LoadingPage />;
}

  return (
  <div className="radial-gradient h-screen">
    <Head>
      <title>p-Reset: Self-Care App</title>
    </Head>

    <Navbar />
    <div className="flex px-8 gap-8 pt-4">
      <div className="relative flex-1">
        <div className="flex justify-between items-center gap-2 z-2 bg-[#CEB7B7] rounded-[20px] px-6 py-4 text-[#4E3506] text-[36px]">
        <p className="">Welcome back,  <b>{userInfo.given_name}</b>!!! </p>

        <img className= "w-14 h-14 rounded-full border-2 border-gray-300" src={userInfo.picture} alt="User profile"/>
        </div>
        
        <p className="absolute left-0 right-0 bottom-0 top-20 z-3 bg-[#FFF6E9] rounded-[20px] px-6 py-4 text-[#A48888] text-[16px] overflow-y-auto">
          <Analytics emotions={emotions}  journals={journals} emotionalState={emotionalState}/> 
          </p>
      </div>
      <div className="flex-1">
        <Insights habits={habits} events={events} habitsPie={habitsPie}></Insights>
      </div>
    </div>
    

  </div>
  )
}

export default MyComponent;