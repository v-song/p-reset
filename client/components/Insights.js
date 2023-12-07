import React from 'react'
import { LoadingPage } from './Loading'

const Insights = ({habits, events, habitsPie}) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = new Date();
    const dayName = days[today.getDay()];
    if (!habits || !events ) {
        return <LoadingPage />;
    }
    return (
        <div className='flex-col justify-center relative text-[#4E3506] h-full'>
            <div className='bg-[#A48888] rounded-t-[20px] px-6 py-4 pb-12 text-white text-[22px]'>Your Insights</div>
            
            <div className='bg-[#CFBDAC] rounded-t-[20px] px-6 py-4 -mt-9 pb-10'>
                <p className='font-bold text-xl'>Accomplished Tasks this Week</p>
                <div className='flex justify-between p-2'>
                <div className='m-3'>
                    {habits.map((habit) => (
                        habit.completed && <li key={habit.id}><b>{habit.name}</b> on {habit.day}</li>
                    ))}    
                </div>
                <div> {habitsPie && <img src={`data:image/png;base64,${habitsPie}`} alt="Emotion Line"  className='w-56 h-48 rounded-lg'/>}</div>
                </div>
            </div>
            <div className='bg-[#EADFD0] rounded-t-[20px] px-6 py-4 -mt-9 pb-10'>
                <p className='font-bold text-xl'>{dayName} Tasks</p>
                <div className='m-3'>
                    {habits.map((habit) => (
                        dayName === habit.day && <li key={habit.id}><b>{habit.name}</b> from {habit.start_time.slice(0,5)} to {habit.end_time.slice(0,5)}</li>
                    ))}
                   
                </div>
            </div>
            <div className='bg-[#FFF6E9] rounded-[20px] px-6 py-4 -mt-9 '>
                <p className='font-bold text-xl'>Future Calender Events</p>
                <div className='m-3'>
                    {events.map((event) => (
                        <li key={event.id}><b>{event.summary}</b> on {new Date(event.start.dateTime).toLocaleString()}</li>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default Insights
