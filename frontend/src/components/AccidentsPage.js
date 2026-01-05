import React, { useState } from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Paper,
  Grid,
  Chip,
  Alert,
  LinearProgress
} from '@mui/material';
import {
  CloudUpload,
  PlayArrow,
  Warning,
  ArrowBack,
  LocalHospital
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const AccidentsPage = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('video/')) {
      setSelectedFile(file);
      setAnalysisResult(null);
    } else {
      alert('Please select a valid video file');
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    
    setAnalyzing(true);
    setUploading(true);
    
    // Simulate upload and analysis process
    setTimeout(() => {
      setUploading(false);
    }, 2000);
    
    setTimeout(() => {
      setAnalyzing(false);
      setAnalysisResult({
        accidents: [
          { type: 'Rear-end Collision', severity: 'High', timestamp: '00:45', location: 'Main Street' },
          { type: 'Side Impact', severity: 'Medium', timestamp: '02:12', location: 'Elm Avenue' },
          { type: 'Single Vehicle', severity: 'Low', timestamp: '03:28', location: 'Oak Road' }
        ],
        totalAccidents: 3,
        duration: '05:30',
        emergencyContacts: true
      });
    }, 4000);
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={handleBack}
          sx={{ mb: 2 }}
        >
          Back to Dashboard
        </Button>
        
        <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
          🚨 Road Accident Detection
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Upload traffic footage to detect and analyze road accidents automatically
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Upload Section */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, height: '100%' }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CloudUpload />
                Upload Video
              </Typography>
              
              <Box sx={{ 
                border: '2px dashed',
                borderColor: selectedFile ? 'primary.main' : 'grey.300',
                borderRadius: 2,
                p: 4,
                textAlign: 'center',
                bgcolor: selectedFile ? 'primary.50' : 'grey.50',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                '&:hover': {
                  borderColor: 'primary.main',
                  bgcolor: 'primary.50'
                }
              }}>
                <input
                  accept="video/*"
                  type="file"
                  onChange={handleFileSelect}
                  style={{ display: 'none' }}
                  id="video-upload"
                />
                <label htmlFor="video-upload" style={{ cursor: 'pointer' }}>
                  <Warning sx={{ fontSize: 48, color: selectedFile ? 'primary.main' : 'grey.400', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    {selectedFile ? selectedFile.name : 'Drop video here or click to browse'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Supported formats: MP4, AVI, MOV, WMV
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Maximum file size: 500MB
                  </Typography>
                </label>
              </Box>

              {selectedFile && (
                <Box sx={{ mt: 2 }}>
                  <Chip 
                    label={`Selected: ${selectedFile.name}`}
                    color="primary"
                    variant="outlined"
                  />
                </Box>
              )}

              <Button
                fullWidth
                variant="contained"
                startIcon={<PlayArrow />}
                onClick={handleAnalyze}
                disabled={!selectedFile || analyzing}
                sx={{ mt: 3, py: 1.5 }}
              >
                {analyzing ? 'Analyzing...' : 'Analyze Video'}
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Results Section */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, height: '100%' }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                📊 Analysis Results
              </Typography>

              {uploading && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" gutterBottom>Uploading video...</Typography>
                  <LinearProgress />
                </Box>
              )}

              {analyzing && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" gutterBottom>Analyzing accidents...</Typography>
                  <LinearProgress />
                </Box>
              )}

              {analysisResult ? (
                <Box>
                  <Alert 
                    severity={analysisResult.emergencyContacts ? "warning" : "success"} 
                    sx={{ mb: 3 }}
                  >
                    {analysisResult.emergencyContacts ? '🚨' : '✅'} 
                    Analysis Complete! Found {analysisResult.totalAccidents} accidents
                  </Alert>

                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      Detected Accidents:
                    </Typography>
                    {analysisResult.accidents.map((accident, index) => (
                      <Paper key={index} sx={{ p: 2, mb: 1, bgcolor: 'grey.50' }}>
                        <Box sx={{ mb: 1 }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                            <Typography variant="body1" fontWeight="bold">
                              {accident.type}
                            </Typography>
                            <Chip 
                              label={accident.severity}
                              color={getSeverityColor(accident.severity)}
                              size="small"
                            />
                          </Box>
                          <Typography variant="body2" color="text.secondary">
                            📍 Location: {accident.location}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            ⏰ Timestamp: {accident.timestamp}
                          </Typography>
                        </Box>
                      </Paper>
                    ))}
                  </Box>

                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Chip icon={<LocalHospital />} label="Emergency Services" variant="outlined" color="error" />
                    <Chip label={`Duration: ${analysisResult.duration}`} variant="outlined" />
                  </Box>
                </Box>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <Warning sx={{ fontSize: 64, color: 'grey.300', mb: 2 }} />
                  <Typography variant="body1" color="text.secondary">
                    Upload and analyze a video to see accident detection results here
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AccidentsPage;