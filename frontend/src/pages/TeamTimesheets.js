import React, { useEffect, useState } from 'react';
import API from '../api';

function TeamTimesheets() {
  const [timesheets, setTimesheets] = useState([]);

  useEffect(() => {
    const fetchTeamTimesheets = async () => {
      try {
        const res = await API.get('/team-timesheets');
        setTimesheets(res.data);
      } catch (err) {
        alert('Failed to fetch team timesheets');
      }
    };
    fetchTeamTimesheets();
  }, []);

  return (
    <div>
      <h2>Team Timesheets</h2>
      <ul>
        {timesheets.map((ts) => (
          <li key={ts.id}>
            User ID: {ts.user_id} - {ts.date} - {ts.hours} - {ts.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TeamTimesheets;
