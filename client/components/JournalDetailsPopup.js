import React from "react";

function JournalDetailsPopup({ Journal, onClose }) {
    if (!Journal) return null;
  
    const [date, time] = Journal.datetime.split('T');

    return (
        <div onClick={onClose}>
            <div className="relative mx-auto p-3 border w-full shadow-lg rounded-md bg-white">
                <h3 className="text-lg font-bold">{Journal.header}</h3>
                <p><strong>Date: </strong>{date}</p>
                <p><strong>Time: </strong>{time.slice(0,5)}</p>
                {Journal.description && (<p><strong>Description: </strong>{Journal.description}</p>)}
                <p><strong>Emotion: </strong>{Journal.emotion}</p>
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

export default JournalDetailsPopup