import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import API_BASE_URL from '../config/api';
import { getToken, isAuthenticated } from '../utils/auth';
import './AppealReview.css';

const AppealReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');
  const [appeal, setAppeal] = useState(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [rejectionError, setRejectionError] = useState('');

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }
    fetchAppeal();
  }, [id, navigate]);

  const fetchAppeal = async () => {
    try {
      setLoading(true);
      const token = getToken();
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/appeals/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setAppeal(data.data.appeal);
      } else {
        if (response.status === 403) {
          setError('Access denied. Admin privileges required.');
        } else {
          setError(data.message || 'Failed to fetch appeal');
        }
      }
    } catch (error) {
      console.error('Appeal fetch error:', error);
      setError('Network error. Please check if backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (newStatus) => {
    if (newStatus === 'rejected' && (!adminNotes || adminNotes.trim().length < 10)) {
      setRejectionError('Rejection reason is required (minimum 10 characters)');
      return;
    }

    setRejectionError('');
    setUpdating(true);
    setError('');

    try {
      const token = getToken();
      if (!token) {
        navigate('/login');
        return;
      }

      // Determine the correct status transition
      let targetStatus = newStatus;
      if (appeal.status === 'pending' && newStatus === 'approved') {
        // Must go through under-review first
        targetStatus = 'under-review';
      }

      const response = await fetch(`${API_BASE_URL}/appeals/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          status: targetStatus,
          adminNotes: adminNotes.trim() || null,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // If we set to under-review and want to approve, make another call
        if (targetStatus === 'under-review' && newStatus === 'approved') {
          const approveResponse = await fetch(`${API_BASE_URL}/appeals/${id}/status`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
              status: 'approved',
              adminNotes: adminNotes.trim() || null,
            }),
          });
          const approveData = await approveResponse.json();
          if (approveData.success) {
            navigate('/admin/dashboard');
            return;
          }
        } else {
          navigate('/admin/dashboard');
        }
      } else {
        setError(data.message || 'Failed to update appeal status');
      }
    } catch (error) {
      console.error('Status update error:', error);
      setError('Network error. Please check if backend is running.');
    } finally {
      setUpdating(false);
    }
  };

  const handleApprove = () => {
    updateStatus('approved');
  };

  const handleReject = () => {
    if (!adminNotes || adminNotes.trim().length < 10) {
      setRejectionError('Rejection reason is required (minimum 10 characters)');
      return;
    }
    updateStatus('rejected');
  };

  const handleMoveToReview = () => {
    updateStatus('under-review');
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="appeal-review-page">
        <div className="page-content">
          <div className="loading-container">
            <p>Loading appeal details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error && !appeal) {
    return (
      <div className="appeal-review-page">
        <div className="page-content">
          <div className="error-message" style={{ 
            padding: '15px', 
            margin: '20px 0', 
            backgroundColor: '#ffebee', 
            color: '#c62828', 
            borderRadius: '4px' 
          }}>
            {error}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!appeal) {
    return null;
  }

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

          {error && (
            <div className="error-message" style={{ 
              padding: '15px', 
              margin: '20px 0', 
              backgroundColor: '#ffebee', 
              color: '#c62828', 
              borderRadius: '4px' 
            }}>
              {error}
            </div>
          )}

          <div className="details-grid">
            <div className="detail-cell">
              <div className="detail-label-small">Appeal ID</div>
              <div className="detail-value-small">{appeal._id}</div>
            </div>
            <div className="detail-cell">
              <div className="detail-label-small">Violation ID</div>
              <div className="detail-value-small">{appeal.violationId}</div>
            </div>
            <div className="detail-cell">
              <div className="detail-label-small">Status</div>
              <div className="detail-value-small" style={{
                textTransform: 'capitalize',
                fontWeight: 'bold',
                color: appeal.status === 'pending' ? '#FFA500' :
                       appeal.status === 'under-review' ? '#2196F3' :
                       appeal.status === 'approved' ? '#4CAF50' : '#F44336'
              }}>
                {appeal.status.replace('-', ' ')}
              </div>
            </div>
            <div className="detail-cell">
              <div className="detail-label-small">Submitted Date</div>
              <div className="detail-value-small">{formatDate(appeal.submittedAt || appeal.createdAt)}</div>
            </div>
            <div className="detail-cell">
              <div className="detail-label-small">Citizen Name</div>
              <div className="detail-value-small">{appeal.userId?.fullName || 'N/A'}</div>
            </div>
            <div className="detail-cell">
              <div className="detail-label-small">Citizen Email</div>
              <div className="detail-value-small">{appeal.userId?.email || 'N/A'}</div>
            </div>
            <div className="detail-cell full-width">
              <div className="detail-label-small">Appeal Context</div>
              <div className="detail-value-small">
                {appeal.appealReason?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'N/A'}
              </div>
            </div>
            <div className="detail-cell full-width">
              <div className="detail-label-small">Detailed Explanation</div>
              <div className="detail-value-small" style={{ whiteSpace: 'pre-wrap' }}>
                {appeal.description || 'N/A'}
              </div>
            </div>
          </div>

          {appeal.evidence && (
            <>
              <div className="section-header">
                <h2>Evidence</h2>
              </div>
              <div className="evidence-preview">
                {appeal.evidenceType === 'image' || appeal.evidence?.match(/\.(jpg|jpeg|png|gif)$/i) ? (
                  <img 
                    src={`${API_BASE_URL.replace('/api', '')}${appeal.evidenceUrl || appeal.evidence}`} 
                    alt="Evidence" 
                    style={{ maxWidth: '100%', height: 'auto' }}
                  />
                ) : (
                  <div style={{ padding: '20px', textAlign: 'center' }}>
                    <a 
                      href={`${API_BASE_URL.replace('/api', '')}${appeal.evidenceUrl || appeal.evidence}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: '#1280ED', textDecoration: 'none' }}
                    >
                      View Evidence Document
                    </a>
                  </div>
                )}
              </div>
            </>
          )}

          {appeal.status === 'pending' && (
            <div className="form-group">
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                Admin Notes (Optional)
              </label>
              <textarea
                className="comments-textarea"
                placeholder="Add your notes when moving to review..."
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                rows="4"
              />
            </div>
          )}

          {appeal.status === 'under-review' && (
            <div className="form-group">
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                Admin Notes <span style={{ color: 'red' }}>*</span>
                {appeal.status === 'under-review' && ' (Required for rejection)'}
              </label>
              <textarea
                className="comments-textarea"
                placeholder={appeal.status === 'under-review' ? 'Enter rejection reason (minimum 10 characters) or approval notes...' : 'Add your comments...'}
                value={adminNotes}
                onChange={(e) => {
                  setAdminNotes(e.target.value);
                  setRejectionError('');
                }}
                rows="4"
                required
              />
              {rejectionError && (
                <span style={{ color: '#F44336', fontSize: '14px', marginTop: '4px', display: 'block' }}>
                  {rejectionError}
                </span>
              )}
            </div>
          )}

          <div className="action-buttons">
            {appeal.status === 'pending' && (
              <button 
                onClick={handleMoveToReview} 
                className="action-button"
                style={{ backgroundColor: '#2196F3' }}
                disabled={updating}
              >
                {updating ? 'Processing...' : 'Move to Under Review'}
              </button>
            )}
            {appeal.status === 'under-review' && (
              <>
                <button 
                  onClick={handleApprove} 
                  className="action-button approve"
                  disabled={updating}
                >
                  {updating ? 'Processing...' : 'Approve Appeal'}
                </button>
                <button 
                  onClick={handleReject} 
                  className="action-button reject"
                  disabled={updating}
                >
                  {updating ? 'Processing...' : 'Reject Appeal'}
                </button>
              </>
            )}
            {(appeal.status === 'approved' || appeal.status === 'rejected') && (
              <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
                <p>This appeal has been {appeal.status === 'approved' ? 'approved' : 'rejected'}.</p>
                {appeal.adminNotes && (
                  <p style={{ marginTop: '10px', fontStyle: 'italic' }}>
                    Notes: {appeal.adminNotes}
                  </p>
                )}
                {appeal.reviewedAt && (
                  <p style={{ marginTop: '10px', fontSize: '14px' }}>
                    Reviewed on: {formatDate(appeal.reviewedAt)}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AppealReview;

