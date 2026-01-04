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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import {
  CloudUpload,
  PlayArrow,
  CreditCard,
  ArrowBack,
  Search,
  CheckCircle
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const NumberPlatePage = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && (file.type.startsWith('video/') || file.type.startsWith('image/'))) {
      setSelectedFile(file);
      setAnalysisResult(null);
    } else {
      alert('Please select a valid video or image file');
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
        plates: [
          { number: 'ABC-1234', confidence: 98, timestamp: '00:15', vehicle: 'Toyota Camry', status: 'Valid' },
          { number: 'XYZ-5678', confidence: 95, timestamp: '01:23', vehicle: 'Honda Civic', status: 'Valid' },
          { number: 'DEF-9012', confidence: 87, timestamp: '02:45', vehicle: 'Ford Focus', status: 'Expired' },
          { number: 'GHI-3456', confidence: 92, timestamp: '03:12', vehicle: 'BMW X3', status: 'Valid' }
        ],
        totalPlates: 4,
        duration: selectedFile.type.startsWith('video/') ? '05:30' : 'N/A',
        fileType: selectedFile.type.startsWith('video/') ? 'Video' : 'Image'
      });
    }, 4000);
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  const getStatusColor = (status) => {
    return status === 'Valid' ? 'success' : 'error';
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
          🔍 Number Plate Identification
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Upload a video or image to automatically detect and read license plate numbers
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* Upload Section */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, height: '100%' }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CloudUpload />
                Upload Media
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
                  accept="video/*,image/*"
                  type="file"
                  onChange={handleFileSelect}
                  style={{ display: 'none' }}
                  id="media-upload"
                />
                <label htmlFor="media-upload" style={{ cursor: 'pointer' }}>
                  <CreditCard sx={{ fontSize: 48, color: selectedFile ? 'primary.main' : 'grey.400', mb: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    {selectedFile ? selectedFile.name : 'Drop video/image here or click to browse'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Supported formats: MP4, AVI, MOV, JPG, PNG
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
                  <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                    ({selectedFile.type.startsWith('video/') ? 'Video' : 'Image'})
                  </Typography>
                </Box>
              )}

              <Button
                fullWidth
                variant="contained"
                startIcon={<Search />}
                onClick={handleAnalyze}
                disabled={!selectedFile || analyzing}
                sx={{ mt: 3, py: 1.5 }}
              >
                {analyzing ? 'Analyzing...' : 'Analyze Media'}
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
                  <Typography variant="body2" gutterBottom>Uploading file...</Typography>
                  <LinearProgress />
                </Box>
              )}

              {analyzing && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" gutterBottom>Detecting number plates...</Typography>
                  <LinearProgress />
                </Box>
              )}

              {analysisResult ? (
                <Box>
                  <Alert severity="success" sx={{ mb: 3 }}>
                    ✅ Analysis Complete! Found {analysisResult.totalPlates} number plates
                  </Alert>

                  <Box sx={{ mb: 2 }}>
                    <Chip label={`File Type: ${analysisResult.fileType}`} variant="outlined" />
                    {analysisResult.duration !== 'N/A' && (
                      <Chip label={`Duration: ${analysisResult.duration}`} variant="outlined" sx={{ ml: 1 }} />
                    )}
                  </Box>

                  <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
                    <Table stickyHeader>
                      <TableHead>
                        <TableRow>
                          <TableCell><strong>Plate Number</strong></TableCell>
                          <TableCell><strong>Vehicle</strong></TableCell>
                          <TableCell><strong>Confidence</strong></TableCell>
                          <TableCell><strong>Status</strong></TableCell>
                          <TableCell><strong>Time</strong></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {analysisResult.plates.map((plate, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <CreditCard fontSize="small" />
                                <Typography variant="body2" fontWeight="bold">
                                  {plate.number}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>{plate.vehicle}</TableCell>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="body2">{plate.confidence}%</Typography>
                                {plate.confidence > 90 && <CheckCircle fontSize="small" color="success" />}
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Chip 
                                label={plate.status}
                                color={getStatusColor(plate.status)}
                                size="small"
                              />
                            </TableCell>
                            <TableCell>{plate.timestamp}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>

                  <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    <Chip icon={<CheckCircle />} label="OCR Complete" variant="outlined" color="success" />
                    <Chip label={`${analysisResult.plates.filter(p => p.status === 'Valid').length} Valid Plates`} variant="outlined" color="primary" />
                    <Chip label={`${analysisResult.plates.filter(p => p.status === 'Expired').length} Expired Plates`} variant="outlined" color="warning" />
                  </Box>
                </Box>
              ) : (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <CreditCard sx={{ fontSize: 64, color: 'grey.300', mb: 2 }} />
                  <Typography variant="body1" color="text.secondary">
                    Upload and analyze media to see number plate detection results here
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

export default NumberPlatePage;