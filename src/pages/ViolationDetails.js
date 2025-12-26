import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import './ViolationDetails.css';

const ViolationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Mock data - replace with API call
  const violationData = {
    violationId: id || 'VIOL-2025-001234',
    type: 'Speeding Violation',
    location: '123 Temple Road, Galle',
    date: 'December 15, 2025',
    time: '10:30 AM',
    fine: 'Rs. 2,500',
    dueDate: 'January 15, 2026',
    vehicleNumber: 'ABC-1234',
    speedLimit: '50 km/h',
    recordedSpeed: '75 km/h',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    hasAppeal: false,
  };

  return (
    <div className="violation-details-page">
      <div className="page-content">
        <div className="details-container">
          <div className="form-header">
            <h1 className="form-title">Violation Details</h1>
          </div>

          <div className="violation-info-card">
            <div className="info-card-header">
              <h2 className="section-title">Violation Information</h2>
            </div>
            
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Violation ID</span>
                <span className="info-value">{violationData.violationId}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Type</span>
                <span className="info-value">{violationData.type}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Location</span>
                <span className="info-value">{violationData.location}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Date</span>
                <span className="info-value">{violationData.date}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Time</span>
                <span className="info-value">{violationData.time}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Vehicle Number</span>
                <span className="info-value">{violationData.vehicleNumber}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Speed Limit</span>
                <span className="info-value">{violationData.speedLimit}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Recorded Speed</span>
                <span className="info-value highlight">{violationData.recordedSpeed}</span>
              </div>
            </div>
          </div>

          <div className="violation-image-section">
            <h3 className="image-section-title">Violation Evidence</h3>
            <div className="violation-image-wrapper">
              <img src={violationData.image} alt="Traffic violation evidence" />
              <div className="image-overlay">
                <span className="image-badge">📸 Camera Evidence</span>
              </div>
            </div>
          </div>

          <div className="fine-info-card">
            <div className="info-card-header">
              <h2 className="section-title">Fine Details</h2>
            </div>
            
            <div className="fine-details">
              <div className="fine-item">
                <span className="fine-label">Fine Amount</span>
                <span className="fine-amount">{violationData.fine}</span>
              </div>
              <div className="fine-item">
                <span className="fine-label">Due Date</span>
                <span className="fine-date">{violationData.dueDate}</span>
              </div>
              <div className="fine-item">
                <span className="fine-label">Days Remaining</span>
                <span className="fine-days">30 days</span>
              </div>
            </div>
          </div>

          <div className="action-section">
            {violationData.hasAppeal ? (
              <Link to={`/appeal-status/${id}`} className="action-button primary">
                View Appeal Status
              </Link>
            ) : (
              <Link to={`/submit-appeal?violationId=${id}`} className="action-button primary">
                Submit Appeal
              </Link>
            )}
            <button onClick={() => navigate('/dashboard')} className="action-button secondary">
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ViolationDetails;

