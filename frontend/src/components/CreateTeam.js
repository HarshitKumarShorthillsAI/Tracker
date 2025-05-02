import React, { useState } from 'react';
import axios from 'axios';

function CreateTeam() {
  const [name, setName] = useState('');
  const [teamLeadId, setTeamLeadId] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/teams/', { name, team_lead_id: teamLeadId });
      alert('Team created successfully');
    } catch (error) {
      alert('Error creating team');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Team Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Team Lead ID"
        value={teamLeadId}
        onChange={(e) => setTeamLeadId(e.target.value)}
      />
      <button type="submit">Create Team</button>
    </form>
  );
}

export default CreateTeam;
