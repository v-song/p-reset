// add_event.jsx

import React, { useState } from "react";

function AddEvent() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const fullStartDate = `${startDate}:00`;
    const fullEndDate = `${endDate}:00`;
    
    const handleSubmit = async () => {
        const eventBody = {
            summary: title,
            description: description,
            start: { dateTime: fullStartDate, timeZone: "America/Los_Angeles" },  // Adjust timeZone as needed
            end: { dateTime: fullEndDate, timeZone: "America/Los_Angeles" }
        };

        try {
            console.log(eventBody);
            const response = await fetch("http://localhost:8080/add_event", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(eventBody),
                credentials: 'include'
            });

            if (response.ok) {
                alert("Event added successfully!");
                window.location.href = "http://localhost:3000";  // Redirect to homepage
            } else {
                alert("Failed to add event. Please try again.");
            }
        } catch (error) {
            console.error("Error adding event:", error);
        }
    };

    return (
        <div>

            <h1><strong>Add Event</strong></h1>
            <div>
                <label>Title: </label><br></br>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div>
                <label>Description: </label><br></br>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div>
                <label>Start Date-Time: </label>
                <input type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div>
                <label>End Date-Time: </label>
                <input type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
            <button className="button" onClick={handleSubmit}>Add Event</button>

        </div>
    );
}

export default AddEvent;
