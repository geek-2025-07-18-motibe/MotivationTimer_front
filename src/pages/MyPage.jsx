import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../components/Dashboard';
import Timeline from '../components/Timeline';

const MyPage = () => {
  const { user } = useContext(UserContext);
  const [logs, setLogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      const fetchLogs = async () => {
        try {
          const response = await fetch(`https://motivationtimer-x-oshi.onrender.com/api/timer-logs?user_id=${user.id}`);
          const data = await response.json();
          setLogs(data);
        } catch (error) {
          console.error('Error fetching timer logs:', error);
        }
      };

      fetchLogs();
    }
  }, [user]);

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
      <div className="col-lg-8 col-md-10">
      <div className="text-center mb-5">
        <button 
          onClick={() => navigate('/timer')} 
          className="btn btn-dark btn-lg rounded-pill px-5"
        >
          <i className="bi bi-play-circle me-2"></i>
          Go to Timer
        </button>
      </div>

      <h2 className="mb-4 fw-bold">Learning Record</h2>
      <Dashboard data={logs} />

      <div className="mt-5">
        <h2 className="mb-4 fw-bold">Timeline</h2>
        <Timeline logs={logs} />
      </div>
      </div>
      </div>
    </div>
  );
};

export default MyPage;
