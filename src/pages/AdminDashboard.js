import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const stats = {
    total: 120,
    pending: 30,
    resolved: 90,
  };

  const appealTypes = [
    { name: 'Traffic Violation', count: 60 },
    { name: 'Accident Report', count: 40 },
    { name: 'Other', count: 20 },
  ];

  return (
    <div className="admin-dashboard">
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Dashboard</h1>
          <button className="menu-button">☰</button>
        </div>

        <div className="stats-container">
          <div className="stat-card admin-stat">
            <h3 className="stat-label">Total Appeals</h3>
            <p className="stat-value">{stats.total}</p>
          </div>
          <div className="stat-card admin-stat">
            <h3 className="stat-label">Pending Appeals</h3>
            <p className="stat-value">{stats.pending}</p>
          </div>
          <div className="stat-card admin-stat">
            <h3 className="stat-label">Resolved Appeals</h3>
            <p className="stat-value">{stats.resolved}</p>
          </div>
        </div>

        <div className="section-header">
          <h2 className="section-title">Appeal Status</h2>
        </div>

        <div className="chart-section">
          <h3 className="chart-title">Appeals Over Time</h3>
          <div className="chart-container">
            <div className="chart-bars">
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, index) => (
                <div key={month} className="chart-bar-wrapper">
                  <div 
                    className="chart-bar" 
                    style={{ height: `${60 + index * 15}px` }}
                  ></div>
                  <span className="chart-label">{month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="section-header">
          <h2 className="section-title">Appeal Types</h2>
        </div>

        <div className="appeal-types-section">
          <h3 className="chart-title">Appeal Types</h3>
          <div className="appeal-types-list">
            {appealTypes.map((type, index) => (
              <div key={type.name} className="appeal-type-item">
                <span className="type-name">{type.name}</span>
                <div className="type-bar-wrapper">
                  <div 
                    className="type-bar" 
                    style={{ width: `${(type.count / stats.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminDashboard;

