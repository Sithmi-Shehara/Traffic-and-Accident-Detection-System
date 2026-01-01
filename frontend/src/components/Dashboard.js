import React from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Avatar,
  Button,
  Chip,
  Paper
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Person,
  ExitToApp,
  DirectionsCar,
  Gavel,
  CheckCircle
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
//user details
const Dashboard = () => {
  const { user, logout } = useAuth();
 // Added a separate handler for logout
  const handleLogout = () => {
    logout();
  };
//initial setup 
  const stats = [
    {
      title: 'Total Violations',
      value: '0',
      icon: <DirectionsCar />,
      color: 'primary'
    },
    {
      title: 'Pending Cases',
      value: '0',
      icon: <Gavel />,
      color: 'warning'
    },
    {
      title: 'Resolved Cases',
      value: '0',
      icon: <CheckCircle />,
      color: 'success'
    }
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Header */}
      <Paper 
        elevation={2} 
        sx={{ 
          p: 3, 
          mb: 4,
          borderRadius: 0,
          borderBottom: 1,
          borderColor: 'divider'
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 2
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48 }}>
                <DashboardIcon />
              </Avatar>
              <Box>
                <Typography variant="h5" fontWeight="bold">
                  Traffic Violation Dashboard
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Welcome back, {user?.name}
                </Typography>
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Chip 
                icon={<Person />} 
                label={user?.email} 
                variant="outlined"
                sx={{ display: { xs: 'none', sm: 'flex' } }}
              />
              <Button
                variant="contained"
                color="error"
                startIcon={<ExitToApp />}
                onClick={handleLogout}
                sx={{ borderRadius: 2 }}
              >
                Logout
              </Button>
            </Box>
          </Box>
        </Container>
      </Paper>

      <Container maxWidth="lg">
        {/* Welcome Card */}
        <Card sx={{ mb: 4, borderRadius: 3 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
              Welcome to the Traffic Violation System
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              Monitor and manage traffic violations efficiently. Access real-time data, 
              track case progress, and ensure compliance with traffic regulations.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip label="Real-time Monitoring" color="primary" variant="outlined" />
              <Chip label="Case Management" color="secondary" variant="outlined" />
              <Chip label="Analytics Dashboard" color="success" variant="outlined" />
            </Box>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {stats.map((stat, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card 
                sx={{ 
                  height: '100%',
                  borderRadius: 3,
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': { transform: 'translateY(-4px)' }
                }}
              >
                <CardContent sx={{ p: 3, textAlign: 'center' }}>
                  <Avatar 
                    sx={{ 
                      mx: 'auto', 
                      mb: 2, 
                      bgcolor: `${stat.color}.main`, 
                      width: 64, 
                      height: 64 
                    }}
                  >
                    {stat.icon}
                  </Avatar>
                  <Typography variant="h3" fontWeight="bold" color={`${stat.color}.main`} gutterBottom>
                    {stat.value}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    {stat.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Quick Actions */}
        <Card sx={{ borderRadius: 3 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom fontWeight="bold">
              Quick Actions
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Button 
                  fullWidth 
                  variant="outlined" 
                  startIcon={<DirectionsCar />}
                  sx={{ p: 2, borderRadius: 2, flexDirection: 'column', gap: 1 }}
                >
                  <Typography variant="body2" fontWeight="bold">
                    New Violation
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Record incident
                  </Typography>
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button 
                  fullWidth 
                  variant="outlined" 
                  startIcon={<Gavel />}
                  sx={{ p: 2, borderRadius: 2, flexDirection: 'column', gap: 1 }}
                >
                  <Typography variant="body2" fontWeight="bold">
                    View Cases
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Manage violations
                  </Typography>
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button 
                  fullWidth 
                  variant="outlined" 
                  startIcon={<CheckCircle />}
                  sx={{ p: 2, borderRadius: 2, flexDirection: 'column', gap: 1 }}
                >
                  <Typography variant="body2" fontWeight="bold">
                    Reports
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Generate reports
                  </Typography>
                </Button>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button 
                  fullWidth 
                  variant="outlined" 
                  startIcon={<Person />}
                  sx={{ p: 2, borderRadius: 2, flexDirection: 'column', gap: 1 }}
                >
                  <Typography variant="body2" fontWeight="bold">
                    Profile
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Account settings
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Dashboard;