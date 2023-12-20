import React from "react";

function EventDetailsPopup({ event, onClose }) {
    if (!event) return null;
  
    return (

        <div onClick={onClose} className="">
        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
          <h3 className="text-lg font-bold">{event.title}</h3>
          <p><strong>Start:</strong> {new Date(event.start).toLocaleString()}</p>
          <p><strong>End:</strong> {new Date(event.end).toLocaleString()}</p>
          {event.description && (<p><strong>Description: </strong>{event.description}</p>)}
          {event.location && (<p><strong>Location: </strong>{event.location}</p>)}
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

export default EventDetailsPopup