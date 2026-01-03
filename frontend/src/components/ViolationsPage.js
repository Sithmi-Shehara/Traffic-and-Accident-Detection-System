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
  DirectionsCar,
  ArrowBack
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ViolationsPage = () => {
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
        violations: [
          { type: 'Speeding', confidence: 92, timestamp: '00:15' },
          { type: 'No Helmet', confidence: 87, timestamp: '01:23' },
          { type: 'Wrong Lane', confidence: 78, timestamp: '02:45' }
        ],
        totalViolations: 3,
        duration: '05:30'
      });
    }, 4000);
  };

  const handleBack = () => {
    navigate('/dashboard');
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
          🚦 Traffic Violations Detection
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Upload a traffic video to automatically detect and analyze violations
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
                  <DirectionsCar sx={{ fontSize: 48, color: selectedFile ? 'primary.main' : 'grey.400', mb: 2 }} />
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
                  <Typography variant="body2" gutterBottom>Analyzing violations...</Typography>
                  <LinearProgress />
                </Box>
              )}

              {analysisResult ? (
                <Box>
                  <Alert severity="success" sx={{ mb: 3 }}>
                    ✅ Analysis Complete! Found {analysisResult.totalViolations} violations
                  </Alert>

                  <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      Detected Violations:
                    </Typography>
                    {analysisResult.violations.map((violation, index) => (
                      <Paper key={index} sx={{ p: 2, mb: 1, bgcolor: 'grey.50' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Box>
                            <Typography variant="body1" fontWeight="bold">
                              {violation.type}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Timestamp: {violation.timestamp}
                            </Typography>
                          </Box>
                          <Chip 
                            label={`${violation.confidence}%`}
                            color={violation.confidence > 85 ? 'success' : 'warning'}
                            size="small"
                          />
                        </Box>
                      </Paper>
                    ))}
                  </Box>

                  <Typography variant="body2" color="text.secondary">
                    Total video duration: {analysisResult.duration}
                  </Typography>
                </Box>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <DirectionsCar sx={{ fontSize: 64, color: 'grey.300', mb: 2 }} />
                  <Typography variant="body1" color="text.secondary">
                    Upload and analyze a video to see results here
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

export default ViolationsPage;