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
  LinearProgress,
  Divider
} from '@mui/material';
import {
  CloudUpload,
  PlayArrow,
  DirectionsCar,
  ArrowBack
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SeatbeltViolationPage = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [analysisError, setAnalysisError] = useState('');

  const detectionBaseUrl = process.env.REACT_APP_DETECTION_API_URL || 'http://localhost:5000';

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
    setAnalysisError('');

    try {
      const formData = new FormData();
      formData.append('video', selectedFile);

      const response = await axios.post(
        `${detectionBaseUrl}/detect/video`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      setAnalysisResult(response.data || { message: 'Request submitted' });
    } catch (error) {
      setAnalysisError('Failed to submit video for analysis.');
      setAnalysisResult(null);
    } finally {
      setUploading(false);
      setAnalyzing(false);
    }
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={handleBack}
          sx={{ mb: 2 }}
        >
          Back to Dashboard
        </Button>

        <Typography variant="h4" fontWeight="bold" color="primary" gutterBottom>
          Seatbelt Violation Detection
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Upload a traffic video to detect seatbelt violations
        </Typography>
      </Box>

      <Grid container spacing={4}>
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
                  id="seatbelt-video-upload"
                />
                <label htmlFor="seatbelt-video-upload" style={{ cursor: 'pointer' }}>
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
                  <Typography variant="body2" gutterBottom>Analyzing seatbelt violations...</Typography>
                  <LinearProgress />
                </Box>
              )}

              {analysisResult ? (
                <Box>
                  <Alert severity={analysisResult.violation_detected ? 'warning' : 'success'} sx={{ mb: 3 }}>
                    {analysisResult.violation_detected ? '⚠️' : '✅'} Seatbelt Violation Result
                  </Alert>

                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                    <Chip label={`Detected: ${analysisResult.violation_detected ? 'Yes' : 'No'}`} color={analysisResult.violation_detected ? 'warning' : 'success'} />
                    <Chip label={`Images Sent: ${analysisResult.images_sent ?? 0}`} variant="outlined" />
                    <Chip label={`Plates: ${analysisResult.detected_plates?.length ?? 0}`} variant="outlined" />
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Detected Plates
                  </Typography>
                  {analysisResult.detected_plates?.length ? (
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                      {analysisResult.detected_plates.map((plate) => (
                        <Chip key={plate} label={plate} />
                      ))}
                    </Box>
                  ) : (
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      No plates detected.
                    </Typography>
                  )}

                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Saved Images
                  </Typography>
                  {analysisResult.saved_images?.length ? (
                    <Grid container spacing={2}>
                      {analysisResult.saved_images.map((url) => (
                        <Grid item xs={12} sm={6} key={url}>
                          <Paper sx={{ p: 1 }}>
                            <img src={url} alt="seatbelt violation" style={{ width: '100%', borderRadius: 6 }} />
                            <Button size="small" href={url} target="_blank" rel="noreferrer" sx={{ mt: 1 }}>
                              Open
                            </Button>
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      No images saved.
                    </Typography>
                  )}
                </Box>
              ) : (
                <Box sx={{ textAlign: 'center', py: 6 }}>
                  {analysisError ? (
                    <Alert severity="error">{analysisError}</Alert>
                  ) : (
                    <Typography variant="body1" color="text.secondary">
                      Upload a video to see analysis results
                    </Typography>
                  )}
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SeatbeltViolationPage;
