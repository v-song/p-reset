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
    {userInfo && (
            <div>
                <h2>User Information</h2>
                <p><strong>Name:</strong> {userInfo.name}</p>
                <img src={userInfo.picture} alt="User profile" />
            </div>
        )}
    
    {events.length > 0 && (
            <div>
                <h2>10 Upcoming Events</h2>
                <ul>
                    {events.map(event => (
                        <li key={event.id}>
                            {event.summary} - {new Date(event.start.dateTime || event.start.date).toLocaleString()}
                        </li>
                    ))}
                </ul>
            </div>
        )}
    
    </div>
  );
}


export default index;