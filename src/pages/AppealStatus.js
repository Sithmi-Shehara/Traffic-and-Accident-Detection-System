import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Footer from '../components/Footer';
import './AppealStatus.css';

const AppealStatus = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Mock data - replace with API call
  const appealData = {
    appealId: id || '#20240715-001',
    violationId: 'VIOL-2025-001234',
    status: 'Under Review',
    statusColor: 'warning',
    submittedDate: 'December 15, 2025',
    progress: 2, // Step 2 of 4
    steps: [
      { 
        name: 'Appeal Submitted', 
        completed: true,
        date: 'Dec 15, 2025',
        description: 'Your appeal has been successfully submitted and received by our system.'
      },
      { 
        name: 'Under Review', 
        completed: true, 
        current: true,
        date: 'Dec 16, 2025',
        description: 'A traffic officer is currently reviewing your appeal and evidence.'
      },
      { 
        name: 'Decision Made', 
        completed: false,
        date: 'Pending',
        description: 'A decision will be made based on the review of your appeal.'
      },
      { 
        name: 'Appeal Resolved', 
        completed: false,
        date: 'Pending',
        description: 'You will be notified of the final decision and any required actions.'
      },
    ],
    comments: [
      {
        officer: 'Officer Ramirez',
        officerId: 'OFF-12345',
        date: 'December 16, 2025',
        time: '2:30 PM',
        comment: 'Appeal received and is currently under review. All submitted evidence has been examined. Please allow 3-5 business days for a decision. We will notify you via email and SMS once the review is complete.',
      },
    ],
    violationDetails: {
      type: 'Speeding Violation',
      location: '123 Temple Road, Galle',
      date: 'December 15, 2025',
      fine: 'Rs. 2,500'
    }
  };

  return (
    <div className="appeal-status-page">
      <div className="page-content">
        <div className="status-container">
          <div className="form-header">
            <h1 className="form-title">Appeal Status</h1>
          </div>

          <div className="appeal-header-card">
            <div className="appeal-id-section">
              <span className="appeal-id-label">Appeal ID</span>
              <h2 className="appeal-id-value">{appealData.appealId}</h2>
            </div>
            <div className="status-badge-large">
              <span className={`status-indicator-dot ${appealData.statusColor}`}></span>
              <span className="status-text">{appealData.status}</span>
            </div>
          </div>

          <div className="violation-summary-card">
            <h3 className="summary-title">Related Violation</h3>
            <div className="summary-grid">
              <div className="summary-item">
                <span className="summary-label">Violation ID</span>
                <span className="summary-value">{appealData.violationId}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Type</span>
                <span className="summary-value">{appealData.violationDetails.type}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Location</span>
                <span className="summary-value">{appealData.violationDetails.location}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Fine Amount</span>
                <span className="summary-value">{appealData.violationDetails.fine}</span>
              </div>
            </div>
            <Link to={`/violation-details/${appealData.violationId}`} className="view-violation-link">
              View Full Violation Details →
            </Link>
          </div>

          <div className="progress-section">
            <div className="progress-header">
              <h3 className="progress-title">Appeal Progress</h3>
              <span className="progress-percentage">{Math.round((appealData.progress / 4) * 100)}%</span>
            </div>
            <div className="progress-bar-container">
              <div 
                className="progress-bar-fill" 
                style={{ width: `${(appealData.progress / 4) * 100}%` }}
              ></div>
            </div>
            <p className="progress-text">Step {appealData.progress} of 4 completed</p>
          </div>

          <div className="timeline-section">
            <h3 className="timeline-title">Appeal Timeline</h3>
            <div className="timeline-container">
              {appealData.steps.map((step, index) => (
                <div key={index} className={`timeline-item ${step.completed ? 'completed' : ''} ${step.current ? 'current' : ''}`}>
                  <div className="timeline-marker">
                    <div className={`timeline-icon ${step.completed ? 'completed' : ''} ${step.current ? 'current' : ''}`}>
                      {step.completed ? '✓' : index + 1}
                    </div>
                    {index < appealData.steps.length - 1 && (
                      <div className={`timeline-line ${step.completed ? 'completed' : ''}`}></div>
                    )}
                  </div>
                  <div className="timeline-content">
                    <div className="timeline-header">
                      <h4 className="timeline-step-title">{step.name}</h4>
                      <span className="timeline-date">{step.date}</span>
                    </div>
                    <p className="timeline-description">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="comments-section">
            <h3 className="comments-title">Officer Updates & Comments</h3>
            {appealData.comments.map((comment, index) => (
              <div key={index} className="comment-card">
                <div className="comment-header-section">
                  <div className="comment-avatar">
                    <img 
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" 
                      alt="Officer" 
                      onError={(e) => {
                        e.target.src = 'https://ui-avatars.com/api/?name=Officer+Ramirez&background=1280ED&color=fff&size=200';
                      }}
                    />
                  </div>
                  <div className="comment-meta">
                    <h4 className="comment-author">{comment.officer}</h4>
                    <p className="comment-officer-id">ID: {comment.officerId}</p>
                    <p className="comment-date-time">{comment.date} at {comment.time}</p>
                  </div>
                </div>
                <div className="comment-text-wrapper">
                  <p className="comment-text">{comment.comment}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="help-section">
            <h3 className="help-title">Need Assistance?</h3>
            <p className="help-text">
              If you have questions about your appeal status or need to provide additional information, 
              please contact our support team.
            </p>
            <div className="help-contacts">
              <a href="mailto:appeals@trafficdept.gov" className="help-link">📧 appeals@trafficdept.gov</a>
              <a href="tel:+5551234567" className="help-link">📞 (555) 123-4567</a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AppealStatus;

