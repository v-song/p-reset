import React, { useState } from "react";

function MyComponent() {
  const [isOpen, setIsOpen] = useState(true);
  const [event, setEvent] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const name = formData.get("name");
    const header = formData.get("header");
    const description = formData.get("description");
    const data = { name, header, description };
    fetch("http://localhost:8080/add_entry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // setEvent([...event, data]);
        setIsOpen(false);
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <button
        className="p-3 h-10 bg-blue-300 text-center rounded-lg w-auto"
        onClick={() => setIsOpen(!isOpen)}
      >
        Add a task
      </button>

      {isOpen && (
        <form
          action="/add_entry"
          method="POST"
          className="h-96 mt-8 flex items-center justify-center rounded-md bg-slate-500  flex-col gap-3"
          onSubmit={handleSubmit}
        >
          <div className="text-xl font-bold text-slate-200">Add a task</div>

          <div className="input-container ic1">
            <input
              placeholder="Name"
              type="text"
              className="w-60 lg:w-80 rounded-sm p-2"
              name="name"
              required
            />
          </div>

          <div className="input-container ic2">
            <input
              placeholder="Header"
              type="text"
              className="w-60 lg:w-80 rounded-sm p-2"
              name="header"
              required
            />
          </div>
          <div>
            <textarea
              placeholder="Add a description.."
              className="w-60 lg:w-80 rounded-sm p-2"
              rows={6}
              name="description"
            />
          </div>

          <div className="flex">
            <button
              type="button"
              tabIndex={0}
              className="mt-3 w-24 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:scale-95 ml-3"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              tabIndex={0}
              className="mt-3 w-24 rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 hover:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ml-3 "
            >
              Confirm
            </button>
          </div>
        </form>
      )}
      <ul>
        {event.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </>
  );
}

export default MyComponent;