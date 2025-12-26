import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import './SubmitAppeal.css';

const SubmitAppeal = () => {
  const [formData, setFormData] = useState({
    violationId: '',
    appealReason: '',
    description: '',
    evidence: null,
    declaration: false,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement appeal submission logic
    console.log('Submit Appeal:', formData);
    navigate('/dashboard');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setFormData({
        ...formData,
        evidence: files[0],
      });
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="submit-appeal-page">
      <div className="page-content">
        <div className="form-container">
          <div className="form-header">
            <h1 className="form-title">Submit Appeal</h1>
          </div>

          <form onSubmit={handleSubmit} className="appeal-form">
            <div className="form-group">
              <label htmlFor="violationId" className="form-label">
                Violation ID
              </label>
              <div className="input-with-button">
                <input
                  type="text"
                  id="violationId"
                  name="violationId"
                  value={formData.violationId}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter violation ID"
                  required
                />
                <button type="button" className="search-button">
                  🔍
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="appealReason" className="form-label">
                Appeal Reason
              </label>
              <select
                id="appealReason"
                name="appealReason"
                value={formData.appealReason}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="">Select Appeal Reason</option>
                <option value="incorrect-speed-limit">Incorrect Speed Limit</option>
                <option value="wrong-vehicle">Wrong Vehicle</option>
                <option value="emergency-situation">Emergency Situation</option>
                <option value="technical-error">Technical Error</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-textarea"
                rows="6"
                placeholder="Provide detailed description of your appeal..."
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Upload Evidence</label>
              <div
                className="file-upload-area"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <div className="upload-content">
                  <p className="upload-text-primary">Drag and drop files here</p>
                  <p className="upload-text-secondary">Or click to browse</p>
                </div>
                <input
                  type="file"
                  id="evidence"
                  name="evidence"
                  onChange={handleChange}
                  className="file-input"
                  accept="image/*,.pdf"
                />
              </div>
              {formData.evidence && (
                <p className="file-name">{formData.evidence.name}</p>
              )}
            </div>

            <div className="form-group">
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="declaration"
                  name="declaration"
                  checked={formData.declaration}
                  onChange={handleChange}
                  className="checkbox-input"
                  required
                />
                <label htmlFor="declaration" className="checkbox-label">
                  I declare that the information provided is true and accurate 
                  to the best of my knowledge.
                </label>
              </div>
            </div>

            <button type="submit" className="submit-button">
              Submit Appeal
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SubmitAppeal;

