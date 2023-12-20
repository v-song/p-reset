import React from "react";

function HabitDetailsPopup({ habit, onClose }) {
    if (!habit) return null;
  
    return (

        <div onClick={onClose}>
        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
          <h3 className="text-lg font-bold text-center">{habit.name}</h3>
        <p><strong>Day:</strong> {habit.day}</p>
          <p><strong>Time:</strong> {habit.start_time.slice(0,5)} - {habit.end_time.slice(0,5)}</p>
          {habit.description && (<p><strong>Description: </strong>{habit.description}</p>)}
          {habit.location && (<p><strong>Location: </strong>{habit.location}</p>)}
          <button 
            onClick={onClose}
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

export default HabitDetailsPopup