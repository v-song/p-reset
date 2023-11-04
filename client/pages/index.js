import React, { useEffect, useState } from "react";

function index() {

  const [userInfo, setUserInfo] = useState(null);
  const [events, setEvents] = useState([]);


  useEffect(() => {
    fetch('http://localhost:8080/user_info', {credentials: 'include'})
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setUserInfo(data);
        });

    fetch('http://localhost:8080/events', {credentials: 'include'})
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setEvents(data);
        });
}, []);

  return(
    <div>
    <button className="button" onClick={() => window.location.href = 'http://localhost:8080/google/login'}>
      Login with Google
    </button>
    
    <button className="button" onClick={() => window.location.href = 'http://localhost:8080/logout'}>
      Logout from Google
    </button>
    <hr></hr>
    {userInfo && (
            <div>
                <img src={userInfo.picture} alt="User profile" />
                <p>Welcome to P-reset, <strong>{userInfo.given_name}</strong>!</p>
            </div>
        )}
    <hr></hr>
    {events.length > 0 && (
            <div>
                <h2><strong>10 Upcoming Events</strong></h2>
                <ul>
                    {events.map(event => (
                        <li key={event.id}>
                            {event.summary}: <i>{new Date(event.start.dateTime || event.start.date).toLocaleString()}</i>
                        </li>
                    ))}
                </ul>
            </div>
        )}
    
    <button className="button" onClick={() => window.location.href = "http://localhost:3000/add_event"}>Create Event</button>
    </div>
  );
}


export default index;