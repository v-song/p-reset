import React from 'react'

const Calender = () => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const hoursOfDay = ['12am', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm', '10pm', '11pm'];

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
        </div>
    )
}

export default Calender
