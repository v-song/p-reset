import React, { useEffect, useState } from "react";

function index() {
  
  const [message, setMessage] = useState("Loading"); // set state variable
  const [people, setPeople] = useState([]); // make array for 'people' from server.py


  // for post task
  const [name, setName] = useState("")
  const [header, setheader] = useState("")
  const [description, setdescription] = useState("")
  const [isOpen, setIsOpen] = useState(true)
  const [event, setEvent] = useState([])

  // useEffect(() => { // allows us to create side effects in functional components
  //   fetch("http://localhost:8080/api/home")
  //   .then( // calls the endpoint
  //     (response) => response.json() // get response from api, put into json
  //   ).then(
  //     (data) => { // retrieve data
  //       console.log(data); // so we can check console.log and see that we
  //                        // are getting the api endpoint data
  //       // message initially set to loading in line 5
  //       setMessage(data.message); // once we get data, set message state variable to data
  //       setPeople(data.people); // accessing people variable from backend
  //     });
  // }, []);

  return(
    <>
    {/* <div>
      <div>{message}</div>
    {people.map((person, index) => ( // grabs person in people array by index and displays
      <div key ={index}>{person}</div>
      ))}


    </div> */}

    <button className="p-3 h-10 bg-blue-300 text-center rounded-lg w-auto " onClick={()=>setIsOpen(!isOpen)}>Add a task</button>

    {isOpen && (
    <div className="h-96 mt-8 flex items-center justify-center rounded-md bg-slate-500  flex-col gap-3">
        <div className="text-xl font-bold text-slate-200">Add a task</div>

        <div className="input-container ic1">
            <input placeholder="Name" type="text" className="w-60 lg:w-80 rounded-sm p-2"
            value={name} onChange={(e)=> setName(e.target.value)} required/>
        </div>

        <div className="input-container ic2">
            <input placeholder="Header" type="text" className="w-60 lg:w-80 rounded-sm p-2" value={header} onChange={(e)=> setheader(e.target.value)} required/>   
        </div>
        <div>
            <textarea placeholder="Add a description.." className="w-60 lg:w-80 rounded-sm p-2"  rows={6}
            value={description ? description: ""} onChange={(e)=> setdescription(e.target.value)}/>
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
        onClick={()=>{ 
          setIsOpen(false); 
          setEvent([...event, {name: name, header: header, description: description}])
          setName("")
          setheader("")
          setdescription("")
        }
        }
        >
        Confirm
        </button>
        </div>
    </div>)
    }
    </>
  );
}


export default index;