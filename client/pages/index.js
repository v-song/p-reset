import React, { useEffect, useState } from "react";

function index() {

  const [message, setMessage] = useState("Loading"); // set state variable
  const [people, setPeople] = useState([]); // make array for 'people' from server.py

  useEffect(() => { // allows us to create side effects in functional components
    fetch("http://localhost:8080/api/home")
    .then( // calls the endpoint
      (response) => response.json() // get response from api, put into json
    ).then(
      (data) => { // retrieve data
        console.log(data); // so we can check console.log and see that we
                         // are getting the api endpoint data
        // message initially set to loading in line 5
        setMessage(data.message); // once we get data, set message state variable to data
        setPeople(data.people); // accessing people variable from backend
      });
  }, []);

  return(
    <div>
      <div>{message}</div>
      
    {people.map((person, index) => ( // grabs person in people array by index and displays
      <div key ={index}>{person}</div>
      ))}
    </div>
  );
}


export default index;