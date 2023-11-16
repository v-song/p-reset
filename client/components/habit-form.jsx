import React, { useState } from "react";

function HabitForm() {
  const [habitName, setHabitName] = useState("");
  const [habitTime, setHabitTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the data to be sent
    const habitData = {
      name: habitName,
      time: habitTime,
    };

    // Sending the POST request to the Flask API
    fetch("http://localhost:8080/api/users/1/habits", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(habitData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // Clear the form
        setHabitName("");
        setHabitTime("");
      })
      .catch((error) => {
        console.error("Error adding habit:", error);
      });
  };

  return (
    <div>
      <h2>Add a New Habit</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Habit Name:</label>
          <input
            type="text"
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Habit Time:</label>
          <input
            type="time"
            value={habitTime}
            onChange={(e) => setHabitTime(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Habit</button>
      </form>
    </div>
  );
}

export default HabitForm;
