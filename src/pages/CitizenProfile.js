import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import API_BASE_URL from '../config/api';
import { getToken, isAuthenticated } from '../utils/auth';
import './CitizenProfile.css';

const CitizenProfile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [user, setUser] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }
    fetchUserData();
  }, [navigate]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const token = getToken();
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setUser(data.data.user);
        if (data.data.user.profilePhoto) {
          setPhotoPreview(`${API_BASE_URL.replace('/api', '')}${data.data.user.profilePhoto}`);
        }
      } else {
        setError(data.message || 'Failed to fetch profile');
      }
    } catch (error) {
      console.error('Profile fetch error:', error);
      setError('Network error. Please check if backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB');
        return;
      }

      setProfilePhoto(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setError('');
    }
  };

  const handlePhotoUpload = async () => {
    if (!profilePhoto) {
      setError('Please select a photo to upload');
      return;
    }

    try {
      setUpdating(true);
      setError('');
      setSuccess('');
      
      const token = getToken();
      if (!token) {
        navigate('/login');
        return;
      }

      const formData = new FormData();
      formData.append('profilePhoto', profilePhoto);

      const response = await fetch(`${API_BASE_URL}/auth/profile-photo`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Profile photo updated successfully');
        setProfilePhoto(null);
        fetchUserData(); // Refresh user data
      } else {
        setError(data.message || 'Failed to update profile photo');
      }
    } catch (error) {
      console.error('Photo upload error:', error);
      setError('Network error. Please try again.');
    } finally {
      setUpdating(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div className="citizen-profile-page">
        <div className="page-content">
          <div className="loading-container">
            <p>Loading profile...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const userName = user?.fullName || 'Citizen';
  const userInitials = userName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);

  return (
    <div className="citizen-profile-page">
      <div className="page-content">
        <div className="profile-container">
          <div className="profile-header">
            <h1 className="profile-title">My Profile</h1>
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

          {success && (
            <div className="success-message" style={{ 
              padding: '15px', 
              margin: '20px 0', 
              backgroundColor: '#e8f5e9', 
              color: '#2e7d32', 
              borderRadius: '4px' 
            }}>
              {success}
            </div>
          )}

          {user && (
            <div className="profile-content">
              <div className="photo-section">
                <div className="photo-container">
                  {photoPreview ? (
                    <img src={photoPreview} alt="Profile" className="profile-photo" />
                  ) : (
                    <div className="profile-photo-placeholder">
                      {userInitials}
                    </div>
                  )}
                </div>
                <div className="photo-upload-section">
                  <input
                    type="file"
                    id="profilePhoto"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="profilePhoto" className="photo-upload-button">
                    {profilePhoto ? 'Change Photo' : 'Upload Photo'}
                  </label>
                  {profilePhoto && (
                    <button
                      onClick={handlePhotoUpload}
                      className="save-photo-button"
                      disabled={updating}
                    >
                      {updating ? 'Uploading...' : 'Save Photo'}
                    </button>
                  )}
                </div>
              </div>

              <div className="profile-info-section">
                <div className="info-card">
                  <h3 className="info-section-title">Personal Information</h3>
                  <div className="info-grid">
                    <div className="info-item">
                      <label className="info-label">Full Name</label>
                      <p className="info-value">{user.fullName}</p>
                    </div>
                    <div className="info-item">
                      <label className="info-label">Email</label>
                      <p className="info-value">{user.email}</p>
                    </div>
                    <div className="info-item">
                      <label className="info-label">NIC Number</label>
                      <p className="info-value">{user.nicNumber}</p>
                    </div>
                    <div className="info-item">
                      <label className="info-label">Driving License</label>
                      <p className="info-value">{user.drivingLicense}</p>
                    </div>
                    <div className="info-item">
                      <label className="info-label">Mobile Number</label>
                      <p className="info-value">{user.mobileNumber}</p>
                    </div>
                    <div className="info-item">
                      <label className="info-label">Account Created</label>
                      <p className="info-value">{formatDate(user.createdAt)}</p>
                    </div>
                    {user.lastLogin && (
                      <div className="info-item">
                        <label className="info-label">Last Login</label>
                        <p className="info-value">{formatDate(user.lastLogin)}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CitizenProfile;

