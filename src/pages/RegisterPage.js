import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import './RegisterPage.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    nicNumber: '',
    drivingLicense: '',
    email: '',
    mobileNumber: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement registration logic
    console.log('Register:', formData);
    navigate('/login');
  };

  return (
    <div className="register-page">
      <div className="page-content">
        <div className="form-container">
          <div className="form-header">
            <h1 className="form-title">Citizen Registration</h1>
          </div>

          <form onSubmit={handleSubmit} className="register-form">
            <div className="form-group">
              <label htmlFor="fullName" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="nicNumber" className="form-label">
                NIC Number
              </label>
              <input
                type="text"
                id="nicNumber"
                name="nicNumber"
                value={formData.nicNumber}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your NIC number"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="drivingLicense" className="form-label">
                Driving License Number
              </label>
              <input
                type="text"
                id="drivingLicense"
                name="drivingLicense"
                value={formData.drivingLicense}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your driving license number"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="mobileNumber" className="form-label">
                Mobile Number
              </label>
              <input
                type="tel"
                id="mobileNumber"
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your mobile number"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your password"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="form-input"
                placeholder="Confirm your password"
                required
              />
            </div>

            <button type="submit" className="submit-button">
              Register
            </button>
          </form>

          <div className="form-footer">
            <p>
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RegisterPage;

