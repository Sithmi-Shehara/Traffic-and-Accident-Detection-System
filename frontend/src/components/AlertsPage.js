import React, { useState } from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Modal,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Alert,
  IconButton
} from '@mui/material';
import {
  ArrowBack,
  Notifications,
  Sms,
  Send,
  Visibility,
  Refresh,
  Close
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Sample data - in real app this would come from API
const alertsData = [
  {
    id: "TV-2024-001",
    licensePlate: "ABC-1234",
    ownerSMS: "Delivered",
    authorityAlert: "Sent",
    timestamp: "2024-01-15 14:30:25",
    violation: {
      type: "Speeding",
      location: "Main Street, Colombo",
      speed: "85 km/h",
      limit: "50 km/h",
      fine: "Rs. 5,000",
      points: 3,
      evidence: "video_evidence_001.mp4",
      vehicleInfo: "Toyota Camry - White",
      ownerName: "John Silva",
      ownerContact: "+94 77 123 4567"
    }
  },
  {
    id: "TV-2024-002",
    licensePlate: "XYZ-5678",
    ownerSMS: "Pending",
    authorityAlert: "Sent",
    timestamp: "2024-01-15 15:45:12",
    violation: {
      type: "No Helmet",
      location: "Galle Road, Colombo",
      speed: "N/A",
      limit: "N/A",
      fine: "Rs. 2,500",
      points: 2,
      evidence: "image_evidence_002.jpg",
      vehicleInfo: "Honda CB150R - Red",
      ownerName: "Sarah Fernando",
      ownerContact: "+94 77 987 6543"
    }
  },
  {
    id: "TV-2024-003",
    licensePlate: "DEF-9012",
    ownerSMS: "Failed",
    authorityAlert: "Failed",
    timestamp: "2024-01-15 16:20:33",
    violation: {
      type: "Wrong Lane",
      location: "Duplication Road, Colombo",
      speed: "N/A",
      limit: "N/A",
      fine: "Rs. 3,000",
      points: 2,
      evidence: "video_evidence_003.mp4",
      vehicleInfo: "Suzuki Alto - Blue",
      ownerName: "Michael Perera",
      ownerContact: "+94 77 555 1234"
    }
  },
  {
    id: "TV-2024-004",
    licensePlate: "GHI-3456",
    ownerSMS: "Delivered",
    authorityAlert: "Sent",
    timestamp: "2024-01-15 17:10:45",
    violation: {
      type: "Parking Violation",
      location: "Flower Road, Colombo",
      speed: "N/A",
      limit: "N/A",
      fine: "Rs. 1,500",
      points: 1,
      evidence: "image_evidence_004.jpg",
      vehicleInfo: "Toyota Prius - Green",
      ownerName: "Emma Rodrigo",
      ownerContact: "+94 77 888 9999"
    }
  }
];

const AlertsPage = () => {
  const navigate = useNavigate();
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [open, setOpen] = useState(false);

  const handleBack = () => {
    navigate('/dashboard');
  };

  const handleRowClick = (alert) => {
    setSelectedAlert(alert);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedAlert(null);
  };

  const handleRetryOwnerSMS = () => {
    // In real app, this would call API to retry SMS
    alert('Retrying SMS to owner...');
  };

  const handleSendAuthorityAlert = () => {
    // In real app, this would call API to send authority alert
    alert('Sending alert to authority...');
  };

  const handleViewEvidence = () => {
    // In real app, this would open evidence viewer
    alert('Opening evidence viewer...');
  };

  const getSMSStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered': return 'success';
      case 'pending': return 'warning';
      case 'failed': return 'error';
      default: return 'default';
    }
  };

  const getAuthorityStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'sent': return 'success';
      case 'failed': return 'error';
      default: return 'default';
    }
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
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
          🚨 Violation Alerts
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Monitor and manage violation notifications and alerts
        </Typography>
      </Box>

      {/* Alerts Table */}
      <Card sx={{ borderRadius: 3 }}>
        <CardContent sx={{ p: 0 }}>
          <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
            <Typography variant="h5" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Notifications />
              Recent Alerts ({alertsData.length})
            </Typography>
          </Box>

          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: 'grey.50' }}>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
                    VIOLATION REF ID
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
                    LICENSE PLATE
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
                    OWNER SMS
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
                    AUTHORITY ALERT
                  </TableCell>
                  <TableCell sx={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
                    TIME STAMP
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {alertsData.map((alert, index) => (
                  <TableRow 
                    key={alert.id}
                    onClick={() => handleRowClick(alert)}
                    sx={{ 
                      cursor: 'pointer',
                      '&:hover': { bgcolor: 'action.hover' },
                      bgcolor: index % 2 === 0 ? 'grey.50' : 'white'
                    }}
                  >
                    <TableCell sx={{ fontWeight: 'medium', color: 'primary.main' }}>
                      {alert.id}
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'medium' }}>
                      {alert.licensePlate}
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={alert.ownerSMS}
                        color={getSMSStatusColor(alert.ownerSMS)}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={alert.authorityAlert}
                        color={getAuthorityStatusColor(alert.authorityAlert)}
                        size="small"
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
                      {alert.timestamp}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Violation Details Modal */}
      <Dialog 
        open={open} 
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: 3
          }
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          bgcolor: 'primary.main',
          color: 'white'
        }}>
          <Typography variant="h6" fontWeight="bold">
            Violation Details - {selectedAlert?.id}
          </Typography>
          <IconButton onClick={handleClose} sx={{ color: 'white' }}>
            <Close />
          </IconButton>
        </DialogTitle>
        
        <DialogContent sx={{ p: 3 }}>
          {selectedAlert && (
            <Grid container spacing={3}>
              {/* Basic Information */}
              <Grid item xs={12}>
                <Alert severity="info" sx={{ mb: 2 }}>
                  <strong>Violation Type:</strong> {selectedAlert.violation.type}
                </Alert>
              </Grid>

              {/* Violation Details */}
              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
                  <Typography variant="h6" gutterBottom color="primary">
                    🚗 Vehicle Information
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography><strong>License Plate:</strong> {selectedAlert.licensePlate}</Typography>
                    <Typography><strong>Vehicle:</strong> {selectedAlert.violation.vehicleInfo}</Typography>
                    <Typography><strong>Owner:</strong> {selectedAlert.violation.ownerName}</Typography>
                    <Typography><strong>Contact:</strong> {selectedAlert.violation.ownerContact}</Typography>
                  </Box>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
                  <Typography variant="h6" gutterBottom color="primary">
                    📋 Violation Details
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Typography><strong>Type:</strong> {selectedAlert.violation.type}</Typography>
                    <Typography><strong>Location:</strong> {selectedAlert.violation.location}</Typography>
                    {selectedAlert.violation.speed !== 'N/A' && (
                      <Typography><strong>Speed:</strong> {selectedAlert.violation.speed} (Limit: {selectedAlert.violation.limit})</Typography>
                    )}
                    <Typography><strong>Fine:</strong> {selectedAlert.violation.fine}</Typography>
                    <Typography><strong>Points:</strong> {selectedAlert.violation.points}</Typography>
                  </Box>
                </Paper>
              </Grid>

              {/* Status Information */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
                  <Typography variant="h6" gutterBottom color="primary">
                    📊 Status Information
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <Chip 
                      label={`Owner SMS: ${selectedAlert.ownerSMS}`}
                      color={getSMSStatusColor(selectedAlert.ownerSMS)}
                    />
                    <Chip 
                      label={`Authority Alert: ${selectedAlert.authorityAlert}`}
                      color={getAuthorityStatusColor(selectedAlert.authorityAlert)}
                    />
                    <Chip 
                      label={`Evidence: ${selectedAlert.violation.evidence}`}
                      variant="outlined"
                    />
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        
        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button
            onClick={handleRetryOwnerSMS}
            startIcon={<Sms />}
            variant="outlined"
            color="primary"
            disabled={selectedAlert?.ownerSMS === 'Delivered'}
          >
            Retry Owner SMS
          </Button>
          <Button
            onClick={handleSendAuthorityAlert}
            startIcon={<Send />}
            variant="outlined"
            color="secondary"
            disabled={selectedAlert?.authorityAlert === 'Sent'}
          >
            Send Authority Alert
          </Button>
          <Button
            onClick={handleViewEvidence}
            startIcon={<Visibility />}
            variant="contained"
            color="primary"
          >
            View Evidence
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AlertsPage;