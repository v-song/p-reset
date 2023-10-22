import { useState, useEffect } from 'react';
import Head from 'next/head';

const Entries = () => {
  const [journals, setJournals] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8080/get_entries')
    
      .then(response => response.json())
      .then(data => setJournals(data))
        .then(console.log(journals))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <Head>
        <title>My Journal Entries</title>
      </Head>
      <h1 className="text-2xl font-bold text-center">My Journal Entries</h1>
      <table className="table-auto mx-auto my-4">
        <thead>
          <tr>
            <th className="border px-4 py-2">Title</th>
            <th className="border px-4 py-2">Description</th>
          </tr>
        </thead>
        <tbody>
          {journals.map(journal => (
            <tr key={journal.id}>
              <td className="border px-4 py-2">{journal.title}</td>
              <td className="border px-4 py-2">{journal.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Entries;