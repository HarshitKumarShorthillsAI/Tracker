import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import TimesheetForm from './components/TimesheetForm';
import TimesheetList from './components/TimesheetList';
import AssignTeam from './components/AssignTeam';
import TeamTimesheets from './pages/TeamTimesheets';

function App() {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            token ? (
              <>
                <TimesheetForm />
                <TimesheetList />
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/assign"
          element={token ? <AssignTeam /> : <Navigate to="/login" />}
        />
        <Route
          path="/team-timesheets"
          element={token ? <TeamTimesheets /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
