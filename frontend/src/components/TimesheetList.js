import React, { useEffect, useState } from 'react';
import API from '../api';

function TimesheetList() {
  const [timesheets, setTimesheets] = useState([]);

  useEffect(() => {
    const fetchTimesheets = async () => {
      try {
        const res = await API.get('/my-timesheets');
        setTimesheets(res.data);
      } catch (err) {
        alert('Failed to fetch timesheets');
      }
    };
    fetchTimesheets();
  }, []);

  return (
    <div>
      <h2>My Timesheets</h2>
      <ul>
        {timesheets.map((ts) => (
          <li key={ts.id}>
            {ts.date} - {ts.hours} - {ts.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TimesheetList;
