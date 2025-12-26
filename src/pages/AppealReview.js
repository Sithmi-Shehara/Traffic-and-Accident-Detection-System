import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import './AppealReview.css';

const AppealReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [decision, setDecision] = useState('');
  const [comments, setComments] = useState('');

  // Mock data - replace with API call
  const appealData = {
    appealId: '#123456789',
    violationType: 'Speeding',
    dateOfViolation: '2024-03-15 14:30',
    location: 'Main Street & Elm Avenue',
    citizenName: 'Sophia Bennett',
    appealReason: 'Incorrect Speed Limit',
    appealDate: '2024-03-16 09:00',
    evidence: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    mlConfidence: 85,
  };

  const handleApprove = () => {
    // TODO: Implement approve logic
    console.log('Approve appeal:', id);
    navigate('/admin/dashboard');
  };

  const handleReject = () => {
    // TODO: Implement reject logic
    console.log('Reject appeal:', id);
    navigate('/admin/dashboard');
  };

  return (
    <div className="appeal-review-page">
      <div className="page-content">
        <div className="review-container">
          <div className="form-header">
            <h1 className="form-title">Appeal Review</h1>
          </div>

          <div className="section-header">
            <h2>Citizen Appeal Details</h2>
          </div>

          <div className="details-grid">
            <div className="detail-cell">
              <div className="detail-label-small">Appeal ID</div>
              <div className="detail-value-small">{appealData.appealId}</div>
            </div>
            <div className="detail-cell">
              <div className="detail-label-small">Violation Type</div>
              <div className="detail-value-small">{appealData.violationType}</div>
            </div>
            <div className="detail-cell">
              <div className="detail-label-small">Date of Violation</div>
              <div className="detail-value-small">{appealData.dateOfViolation}</div>
            </div>
            <div className="detail-cell">
              <div className="detail-label-small">Location</div>
              <div className="detail-value-small">{appealData.location}</div>
            </div>
            <div className="detail-cell">
              <div className="detail-label-small">Citizen Name</div>
              <div className="detail-value-small">{appealData.citizenName}</div>
            </div>
            <div className="detail-cell">
              <div className="detail-label-small">Appeal Reason</div>
              <div className="detail-value-small">{appealData.appealReason}</div>
            </div>
            <div className="detail-cell full-width">
              <div className="detail-label-small">Appeal Date</div>
              <div className="detail-value-small">{appealData.appealDate}</div>
            </div>
          </div>

          <div className="section-header">
            <h2>Evidence Preview</h2>
          </div>

          <div className="evidence-preview">
            <img src={appealData.evidence} alt="Evidence" />
          </div>

          <div className="ml-suggestion">
            <div className="suggestion-content">
              <h3 className="suggestion-title">Approve Appeal</h3>
              <p className="suggestion-confidence">Confidence: {appealData.mlConfidence}%</p>
            </div>
          </div>

          <p className="suggestion-note">
            Officer decision overrides system suggestion if needed.
          </p>

          <div className="form-group">
            <textarea
              className="comments-textarea"
              placeholder="Add your comments..."
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              rows="4"
            />
          </div>

          <div className="action-buttons">
            <button onClick={handleApprove} className="action-button approve">
              Approve Appeal
            </button>
            <button onClick={handleReject} className="action-button reject">
              Reject Appeal
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AppealReview;

