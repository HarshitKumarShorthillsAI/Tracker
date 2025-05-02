import React, { useState } from 'react';
import API from '../api';

function TimesheetForm() {
  const [form, setForm] = useState({ date: '', hours: '', description: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/timesheet', form);
      alert('Timesheet submitted');
    } catch (err) {
      alert('Submission failed');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="date"
        onChange={(e) => setForm({ ...form, date: e.target.value })}
      />
      <input
        type="time"
        onChange={(e) => setForm({ ...form, hours: e.target.value })}
      />
      <input
        placeholder="Description"
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export default TimesheetForm;
