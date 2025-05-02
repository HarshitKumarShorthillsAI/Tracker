import React, { useState } from 'react';
import API from '../api';

function AssignTeam() {
  const [form, setForm] = useState({ team_lead_id: '', user_id: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/assign', form);
      alert('User assigned to team');
    } catch (err) {
      alert('Assignment failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Team Lead ID"
        onChange={(e) => setForm({ ...form, team_lead_id: e.target.value })}
      />
      <input
        placeholder="User ID"
        onChange={(e) => setForm({ ...form, user_id: e.target.value })}
      />
      <button type="submit">Assign</button>
    </form>
  );
}

export default AssignTeam;
