import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import './AppealStatusTracking.css';

const AppealStatusTracking = () => {
  const [filter, setFilter] = useState('all');

  // Mock data - replace with API call
  const appeals = [
    {
      id: '20240715-001',
      violationId: 'VIOL-2025-001234',
      violationType: 'Speeding',
      submittedDate: 'December 15, 2025',
      status: 'Under Review',
      statusColor: 'warning',
      progress: 2,
      fine: 'Rs. 2,500'
    },
    {
      id: '20240710-002',
      violationId: 'VIOL-2025-001189',
      violationType: 'Red Light Violation',
      submittedDate: 'December 10, 2025',
      status: 'Decision Made',
      statusColor: 'success',
      progress: 3,
      fine: 'Rs. 3,000'
    },
    {
      id: '20240705-003',
      violationId: 'VIOL-2025-001156',
      violationType: 'Parking Violation',
      submittedDate: 'December 5, 2025',
      status: 'Appeal Resolved',
      statusColor: 'success',
      progress: 4,
      fine: 'Rs. 800',
      result: 'Approved'
    },
    {
      id: '20240628-004',
      violationId: 'VIOL-2025-001098',
      violationType: 'Speeding',
      submittedDate: 'November 28, 2025',
      status: 'Appeal Resolved',
      statusColor: 'rejected',
      progress: 4,
      fine: 'Rs. 2,500',
      result: 'Rejected'
    },
    {
      id: '20240620-005',
      violationId: 'VIOL-2025-001045',
      violationType: 'Wrong Lane Usage',
      submittedDate: 'November 20, 2025',
      status: 'Appeal Submitted',
      statusColor: 'info',
      progress: 1,
      fine: 'Rs. 1,500'
    }
  ];

  const filteredAppeals = filter === 'all' 
    ? appeals 
    : appeals.filter(appeal => {
        if (filter === 'pending') return appeal.progress < 4;
        if (filter === 'resolved') return appeal.progress === 4;
        return true;
      });

  const getStatusBadgeClass = (statusColor) => {
    const classes = {
      'warning': 'status-warning',
      'success': 'status-success',
      'rejected': 'status-rejected',
      'info': 'status-info'
    };
    return classes[statusColor] || 'status-info';
  };

  return (
    <div className="appeal-tracking-page">
      <div className="page-content">
        <div className="content-container">
          <div className="page-header">
            <h1 className="page-title">Appeal Status & Tracking</h1>
            <p className="page-subtitle">
              Track all your submitted appeals and their current status. Click on any appeal to view detailed information.
            </p>
          </div>

          <div className="filter-section">
            <div className="filter-buttons">
              <button 
                className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                All Appeals ({appeals.length})
              </button>
              <button 
                className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
                onClick={() => setFilter('pending')}
              >
                Pending ({appeals.filter(a => a.progress < 4).length})
              </button>
              <button 
                className={`filter-btn ${filter === 'resolved' ? 'active' : ''}`}
                onClick={() => setFilter('resolved')}
              >
                Resolved ({appeals.filter(a => a.progress === 4).length})
              </button>
            </div>
          </div>

          <div className="appeals-list">
            {filteredAppeals.length === 0 ? (
              <div className="empty-state">
                <p>No appeals found matching your filter.</p>
              </div>
            ) : (
              filteredAppeals.map((appeal) => (
                <Link 
                  key={appeal.id} 
                  to={`/appeal-status/${appeal.id}`}
                  className="appeal-card-link"
                >
                  <div className="appeal-card">
                    <div className="appeal-card-header">
                      <div className="appeal-id-section">
                        <span className="appeal-id-label">Appeal ID</span>
                        <h3 className="appeal-id">{appeal.id}</h3>
                      </div>
                      <div className={`status-badge ${getStatusBadgeClass(appeal.statusColor)}`}>
                        <span className="status-dot"></span>
                        <span className="status-text">{appeal.status}</span>
                      </div>
                    </div>

                    <div className="appeal-card-body">
                      <div className="appeal-info-grid">
                        <div className="info-item">
                          <span className="info-label">Violation Type</span>
                          <span className="info-value">{appeal.violationType}</span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">Violation ID</span>
                          <span className="info-value">{appeal.violationId}</span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">Submitted Date</span>
                          <span className="info-value">{appeal.submittedDate}</span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">Fine Amount</span>
                          <span className="info-value">{appeal.fine}</span>
                        </div>
                      </div>

                      <div className="progress-section-mini">
                        <div className="progress-bar-mini">
                          <div 
                            className="progress-fill-mini" 
                            style={{ width: `${(appeal.progress / 4) * 100}%` }}
                          ></div>
                        </div>
                        <span className="progress-text-mini">Step {appeal.progress} of 4</span>
                      </div>

                      {appeal.result && (
                        <div className={`result-badge ${appeal.result.toLowerCase()}`}>
                          {appeal.result === 'Approved' ? '✓ Approved' : '✗ Rejected'}
                        </div>
                      )}
                    </div>

                    <div className="appeal-card-footer">
                      <span className="view-details">View Details →</span>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>

          <div className="stats-summary">
            <div className="stat-item">
              <span className="stat-number">{appeals.length}</span>
              <span className="stat-label">Total Appeals</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{appeals.filter(a => a.progress < 4).length}</span>
              <span className="stat-label">In Progress</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{appeals.filter(a => a.progress === 4 && a.result === 'Approved').length}</span>
              <span className="stat-label">Approved</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{appeals.filter(a => a.progress === 4 && a.result === 'Rejected').length}</span>
              <span className="stat-label">Rejected</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AppealStatusTracking;

