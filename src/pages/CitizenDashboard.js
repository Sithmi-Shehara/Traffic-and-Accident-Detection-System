import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import API_BASE_URL from '../config/api';
import { getToken, isAuthenticated } from '../utils/auth';
import './CitizenDashboard.css';

const CitizenDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    underReview: 0,
    approved: 0,
    rejected: 0,
  });
  const [appeals, setAppeals] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }
    
    fetchUserData();
    fetchAppeals();
  }, [navigate]);

  const fetchUserData = async () => {
    try {
      const token = getToken();
      if (!token) return;

      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setUser(data.data.user);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchAppeals = async () => {
    try {
      setLoading(true);
      const token = getToken();
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/appeals?page=1&limit=10`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        const appealsList = data.data.appeals || [];
        setAppeals(appealsList);
        
        // Calculate stats
        const total = appealsList.length;
        const pending = appealsList.filter(a => a.status === 'pending').length;
        const underReview = appealsList.filter(a => a.status === 'under-review').length;
        const approved = appealsList.filter(a => a.status === 'approved').length;
        const rejected = appealsList.filter(a => a.status === 'rejected').length;
        
        setStats({
          total: data.total || total,
          pending: pending,
          underReview: underReview,
          approved: approved,
          rejected: rejected,
        });
      } else {
        setError(data.message || 'Failed to fetch appeals');
      }
    } catch (error) {
      console.error('Appeals fetch error:', error);
      setError('Network error. Please check if backend is running.');
    } finally {
      setLoading(false);
    }
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

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'under-review':
        return 'Under Review';
      case 'approved':
        return 'Approved';
      case 'rejected':
        return 'Rejected';
      default:
        return status;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'pending':
        return 'pending';
      case 'under-review':
        return 'under-review';
      case 'approved':
        return 'approved';
      case 'rejected':
        return 'rejected';
      default:
        return '';
    }
  };

  if (loading) {
    return (
      <div className="citizen-dashboard">
        <div className="dashboard-content">
          <div className="loading-container">
            <p>Loading dashboard...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const userName = user?.fullName || 'Citizen';
  const userInitials = userName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);

  return (
    <div className="citizen-dashboard">
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1 className="dashboard-title">My Appeals Dashboard</h1>
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

        <div className="user-profile">
          <div className="profile-avatar">
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: '#1280ED',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              fontWeight: 'bold',
            }}>
              {userInitials}
            </div>
          </div>
          <div className="profile-info">
            <h2 className="profile-name">{userName}</h2>
            <p className="profile-role">Citizen</p>
          </div>
        </div>

        <div className="stats-container">
          <div className="stat-card">
            <h3 className="stat-label">Total Appeals</h3>
            <p className="stat-value">{stats.total}</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-label">Pending</h3>
            <p className="stat-value">{stats.pending}</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-label">Under Review</h3>
            <p className="stat-value">{stats.underReview}</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-label">Approved</h3>
            <p className="stat-value">{stats.approved}</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-label">Rejected</h3>
            <p className="stat-value">{stats.rejected}</p>
          </div>
        </div>

        <div className="section-header">
          <h2 className="section-title">My Appeals</h2>
        </div>

        {appeals.length === 0 ? (
          <div style={{ padding: '20px', textAlign: 'center', color: '#757575' }}>
            <p>No appeals submitted yet.</p>
            <Link to="/submit-appeal" style={{ color: '#1280ED', textDecoration: 'none' }}>
              Submit your first appeal →
            </Link>
          </div>
        ) : (
          <div className="appeals-list">
            {appeals.map((appeal) => (
              <Link key={appeal._id} to={`/appeal-status/${appeal._id}`} className="appeal-card-link">
                <div className="appeal-card">
                  <div className="appeal-info">
                    <h3 className="appeal-id">Violation ID: {appeal.violationId}</h3>
                    <p className="appeal-violation">
                      Appeal Context: {appeal.appealReason?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) || 'N/A'}
                    </p>
                    <p style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
                      Submitted: {formatDate(appeal.submittedAt || appeal.createdAt)}
                    </p>
                    {appeal.adminNotes && (
                      <p style={{ fontSize: '12px', color: '#666', marginTop: '4px', fontStyle: 'italic' }}>
                        {appeal.status === 'approved' ? '✓ Approved' : appeal.status === 'rejected' ? '✗ Rejected: ' + appeal.adminNotes.substring(0, 50) + '...' : ''}
                      </p>
                    )}
                  </div>
                  <div className="appeal-status">
                    <span className={`status-badge ${getStatusClass(appeal.status)}`}>
                      {getStatusLabel(appeal.status)}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
        
        {appeals.length > 0 && (
          <div className="view-all-section">
            <Link to="/appeal-tracking" className="view-all-link">
              View All Appeals →
            </Link>
          </div>
        )}

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

