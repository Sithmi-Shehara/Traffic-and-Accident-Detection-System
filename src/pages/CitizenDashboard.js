import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import './CitizenDashboard.css';

const CitizenDashboard = () => {
  const stats = {
    total: 10,
    pending: 3,
    resolved: 7,
  };

  const recentAppeals = [
    { id: '12345', violation: 'Speeding', status: 'Pending' },
    { id: '67890', violation: 'Red Light', status: 'Resolved' },
    { id: '11223', violation: 'Parking', status: 'Pending' },
  ];

  return (
    <div className="citizen-dashboard">
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1 className="dashboard-title">My Appeals Dashboard</h1>
        </div>

        <div className="user-profile">
          <div className="profile-avatar">
            <img 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
              alt="Profile"
              onError={(e) => {
                e.target.src = 'https://ui-avatars.com/api/?name=Sithmi+Shehara&background=1280ED&color=fff&size=200';
              }}
            />
          </div>
          <div className="profile-info">
            <h2 className="profile-name">Sithmi Shehara</h2>
            <p className="profile-role">Citizen</p>
          </div>
        </div>

        <div className="stats-container">
          <div className="stat-card">
            <h3 className="stat-label">Total Appeals</h3>
            <p className="stat-value">{stats.total}</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-label">Pending Appeals</h3>
            <p className="stat-value">{stats.pending}</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-label">Resolved Appeals</h3>
            <p className="stat-value">{stats.resolved}</p>
          </div>
        </div>

        <div className="section-header">
          <h2 className="section-title">Recent Appeals</h2>
        </div>

        <div className="appeals-list">
          {recentAppeals.map((appeal) => (
            <Link key={appeal.id} to={`/appeal-status/${appeal.id}`} className="appeal-card-link">
              <div className="appeal-card">
                <div className="appeal-info">
                  <h3 className="appeal-id">Appeal ID: {appeal.id}</h3>
                  <p className="appeal-violation">Violation: {appeal.violation}</p>
                </div>
                <div className="appeal-status">
                  <span className={`status-badge ${appeal.status.toLowerCase()}`}>
                    {appeal.status}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="view-all-section">
          <Link to="/appeal-tracking" className="view-all-link">
            View All Appeals →
          </Link>
        </div>

        <div className="floating-button-container">
          <Link to="/submit-appeal" className="floating-button">
            <span className="button-icon">+</span>
            <span className="button-text">Submit New Appeal</span>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CitizenDashboard;

