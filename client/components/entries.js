import { useState, useEffect } from 'react';
import Head from 'next/head';

const Entries = () => {
  const [journals, setJournals] = useState([]);
  const user_id = 2

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/users/${user_id}/journals`,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
      .then(response => response.json())
      .then(data => setJournals(data))
        .then(console.log(journals))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
        <h1 className="text-2xl font-bold">My Journal Entries</h1>
      <table className="table-auto w-50 my-4">
        <thead>
          <tr>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Description</th>
            <th className='border px-4 py-2'>Date</th>
            <th className='border px-4 py-2'>Time</th>
          </tr>
        </thead>
        <tbody>
        {journals.map(journal => {
          const [date, time] = journal.datetime.split("T");
          return (
            <tr key={journal.id}>
              <td className="border px-4 py-2 text-center">{journal.header}</td>
              <td className="border px-4 py-2">{journal.description}</td>
              <td className="border px-4 py-2">{date}</td>
              <td className="border px-4 py-2">{time}</td>
            </tr>
          );
        })}
        </tbody>
      </table>
    </div>
  );
};

export default Entries;