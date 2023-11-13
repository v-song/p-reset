import React, { useState } from "react";

export const HabitForm = () => {
  const [habit, setHabit] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Data to be sent to the Flask backend
    const habitData = {
      habitName: habit,
      notificationTime: time,
    };

    try {
      const response = await fetch("http://localhost:8080/add-habit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Include other headers as necessary, like authentication tokens
        },
        body: JSON.stringify(habitData), // Convert the habit data to a JSON string
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log("Success:", responseData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={habit}
        onChange={(e) => setHabit(e.target.value)}
        placeholder="Habit"
      />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        placeholder="Time"
      />
      <button type="submit">Add Habit</button>
    </form>
  );
};

export default HabitForm;
