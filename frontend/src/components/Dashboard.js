import React, { useEffect, useState } from 'react';
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
  DirectionsCar,
  Warning, 
  CheckCircle,
  Notifications
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const [summary, setSummary] = useState({ total: 0, pending: 0, resolved: 0, crash_pending: 0, crash_fire_pending: 0 });

  const apiBaseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

  useEffect(() => {
    let isMounted = true;
    const fetchSummary = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/violations/summary`);
        if (isMounted) {
          const data = response.data?.data || {};
          setSummary({
            total: Number(data.total || 0),
            pending: Number(data.pending || 0),
            resolved: Number(data.resolved || 0),
            crash_pending: Number(data.crash_pending || 0),
            crash_fire_pending: Number(data.crash_fire_pending || 0)
          });
        }
      } catch (error) {
        if (isMounted) {
          setSummary({ total: 0, pending: 0, resolved: 0, crash_pending: 0, crash_fire_pending: 0 });
        }
      }
    };

    fetchSummary();
    return () => {
      isMounted = false;
    };
  }, [apiBaseUrl]);

  const handleViolationsClick = () => {
    navigate('/violations');
  };

  const handleAccidentsClick = () => {
    navigate('/accidents');
  };

  const handleHelmetClick = () => {
    navigate('/helmet-violation');
  };

  const handleSeatbeltClick = () => {
    navigate('/seatbelt-violation');
  };

  const handleViolationListClick = () => {
    navigate('/violation-list');
  };

  const handleAlertsClick = () => {
    navigate('/alerts');
  };

  const stats = [
    {
      title: 'Total Violations',
      value: String(summary.total),
      icon: <DirectionsCar />,
      color: 'primary'
    },
    {
      title: 'Pending Cases',
      value: String(summary.pending),
      icon: <Warning />,
      color: 'warning'
    },
    {
      title: 'Resolved Cases',
      value: String(summary.resolved),
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
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                  <Box
                    sx={{
                      position: 'relative',
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      bgcolor: 'success.main',
                      boxShadow: '0 0 0 0 rgba(46, 125, 50, 0.6)',
                      animation: 'pulse 1.6s infinite',
                      '@keyframes pulse': {
                        '0%': { boxShadow: '0 0 0 0 rgba(46, 125, 50, 0.6)' },
                        '70%': { boxShadow: '0 0 0 10px rgba(46, 125, 50, 0)' },
                        '100%': { boxShadow: '0 0 0 0 rgba(46, 125, 50, 0)' }
                      }
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: 600, color: 'success.main', letterSpacing: 0.5 }}
                  >
                    LIVE • Tracking Violations
                  </Typography>
                </Box>
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button
                variant="outlined"
                onClick={handleViolationListClick}
                sx={{ borderRadius: 2 }}
              >
                View Violation
              </Button>
              <Button
                variant="outlined"
                startIcon={<Notifications />}
                onClick={handleAlertsClick}
                sx={{ borderRadius: 2, mr: 1 }}
              >
                Alerts
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

          {/* Quick Actions */}
          <Card sx={{ borderRadius: 3 }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h5" gutterBottom fontWeight="bold">
                Quick Actions
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                  <Button 
                    fullWidth 
                    variant="outlined" 
                    startIcon={<DirectionsCar />}
                    onClick={handleViolationsClick}
                    sx={{ p: 2, borderRadius: 2, flexDirection: 'column', gap: 1 }}
                  >
                    <Typography variant="body2" fontWeight="bold">
                    Identify Violations
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Detect traffic violations
                    </Typography>
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Button 
                    fullWidth 
                    variant="outlined" 
                    startIcon={<Warning />}
                    onClick={handleAccidentsClick}
                    sx={{ p: 2, borderRadius: 2, flexDirection: 'column', gap: 1 }}
                  >
                    <Typography variant="body2" fontWeight="bold">
                      Identify Accidents
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Detect road accidents
                    </Typography>
                  </Button>
                </Grid>
                
                <Grid item xs={12} sm={6} md={4}>
                  <Button 
                    fullWidth 
                    variant="outlined" 
                    startIcon={<DirectionsCar />}
                    onClick={handleHelmetClick}
                    sx={{ p: 2, borderRadius: 2, flexDirection: 'column', gap: 1 }}
                  >
                    <Typography variant="body2" fontWeight="bold">
                      Helmal Violation
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Detect helmet violations
                    </Typography>
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <Button 
                    fullWidth 
                    variant="outlined" 
                    startIcon={<DirectionsCar />}
                    onClick={handleSeatbeltClick}
                    sx={{ p: 2, borderRadius: 2, flexDirection: 'column', gap: 1 }}
                  >
                    <Typography variant="body2" fontWeight="bold">
                      Seatbelt Violation
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Detect seatbelt violations
                    </Typography>
                  </Button>
                </Grid>
                
              </Grid>
              <Grid container spacing={2} sx={{ mt: 4 }}>
                <Grid item xs={12} md={6}>
                  <Card
                    sx={{
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: 'error.main',
                      background: 'linear-gradient(135deg, #7f1d1d 0%, #b91c1c 55%, #ef4444 100%)',
                      color: 'common.white',
                      boxShadow: '0 12px 30px rgba(185, 28, 28, 0.35)',
                      position: 'relative',
                      overflow: 'hidden',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        inset: 0,
                        background:
                          'radial-gradient(260px 160px at 20% 20%, rgba(255,255,255,0.2), transparent 60%), repeating-linear-gradient(90deg, rgba(255,255,255,0.15) 0, rgba(255,255,255,0.15) 1px, transparent 1px, transparent 18px)',
                        opacity: 0.55,
                        animation: 'criticalWave 3s ease-in-out infinite'
                      },
                      '@keyframes criticalWave': {
                        '0%': { transform: 'translateX(-10px)' },
                        '50%': { transform: 'translateX(10px)' },
                        '100%': { transform: 'translateX(-10px)' }
                      }
                    }}
                  >
                    <CardContent sx={{ p: 2.5, position: 'relative', zIndex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box>
                          <Typography variant="overline" sx={{ letterSpacing: 1 }}>
                            Critical
                          </Typography>
                          <Typography variant="h6" fontWeight="bold">
                            Crash Violations
                          </Typography>
                        </Box>
                        <Typography variant="h3" fontWeight="bold" pr={4}>
                          {summary.crash_pending}
                        </Typography>
                      </Box>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={handleViolationListClick}
                        sx={{
                          mt: 2,
                          bgcolor: 'common.white',
                          color: 'error.main',
                          fontWeight: 'bold',
                          '&:hover': { bgcolor: 'grey.100' }
                        }}
                      >
                        View List
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card
                    sx={{
                      borderRadius: 2,
                      border: '1px solid',
                      borderColor: 'warning.main',
                      background: 'linear-gradient(135deg, #7c2d12 0%, #f97316 55%, #fb923c 100%)',
                      color: 'common.white',
                      boxShadow: '0 12px 30px rgba(249, 115, 22, 0.35)',
                      position: 'relative',
                      overflow: 'hidden',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        inset: 0,
                        background:
                          'radial-gradient(260px 160px at 20% 20%, rgba(255,255,255,0.2), transparent 60%), repeating-linear-gradient(90deg, rgba(255,255,255,0.15) 0, rgba(255,255,255,0.15) 1px, transparent 1px, transparent 18px)',
                        opacity: 0.55,
                        animation: 'fireWave 3s ease-in-out infinite'
                      },
                      '@keyframes fireWave': {
                        '0%': { transform: 'translateX(-10px)' },
                        '50%': { transform: 'translateX(10px)' },
                        '100%': { transform: 'translateX(-10px)' }
                      }
                    }}
                  >
                    <CardContent sx={{ p: 2.5, position: 'relative', zIndex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Box>
                          <Typography variant="overline" sx={{ letterSpacing: 1 }}>
                            Critical
                          </Typography>
                          <Typography variant="h6" fontWeight="bold">
                            Crash With Fire
                          </Typography>
                        </Box>
                        <Typography variant="h3" fontWeight="bold" pr={4}>
                          {summary.crash_fire_pending}
                        </Typography>
                      </Box>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={handleViolationListClick}
                        sx={{
                          mt: 2,
                          bgcolor: 'common.white',
                          color: 'warning.main',
                          fontWeight: 'bold',
                          '&:hover': { bgcolor: 'grey.100' }
                        }}
                      >
                        View List
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Card>

        {/* Live Status Card */}
        <Card
          sx={{
            mb: 4,
            borderRadius: 4,
            overflow: 'hidden',
            position: 'relative',
            color: 'common.white',
            background: 'linear-gradient(135deg, #0b1020 0%, #0b1f3a 35%, #0a2f6b 70%, #0a4aa3 100%)',
            boxShadow: '0 20px 60px rgba(10, 74, 163, 0.35)',
            '&::before': {
              content: '""',
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(700px 360px at 12% 15%, rgba(59, 130, 246, 0.35), transparent 60%), radial-gradient(520px 260px at 85% 18%, rgba(56, 189, 248, 0.25), transparent 60%), radial-gradient(420px 240px at 70% 80%, rgba(14, 165, 233, 0.25), transparent 60%)',
              opacity: 1
            },
            '&::after': {
              content: '""',
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(120% 80% at 0% 50%, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0) 55%), radial-gradient(120% 80% at 100% 50%, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0) 55%), repeating-linear-gradient(90deg, rgba(255,255,255,0.08) 0, rgba(255,255,255,0.08) 1px, transparent 1px, transparent 26px)',
              opacity: 0.6,
              animation: 'wave 5s ease-in-out infinite'
            },
            '@keyframes wave': {
              '0%': { transform: 'translateX(-18px) scaleY(1)' },
              '50%': { transform: 'translateX(18px) scaleY(1.15)' },
              '100%': { transform: 'translateX(-18px) scaleY(1)' }
            }
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 4 }, position: 'relative', zIndex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
              <Box
                sx={{
                  position: 'relative',
                  width: 18,
                  height: 18,
                  borderRadius: '50%',
                  bgcolor: '#38bdf8',
                  boxShadow: '0 0 0 0 rgba(56, 189, 248, 0.65)',
                  animation: 'pulse 1.4s infinite',
                  '@keyframes pulse': {
                    '0%': { boxShadow: '0 0 0 0 rgba(56, 189, 248, 0.65)' },
                    '70%': { boxShadow: '0 0 0 18px rgba(56, 189, 248, 0)' },
                    '100%': { boxShadow: '0 0 0 0 rgba(56, 189, 248, 0)' }
                  }
                }}
              />
              <Typography variant="h5" fontWeight="bold" sx={{ letterSpacing: 1 }}>
                LIVE SYSTEM • Real‑Time Violation Tracking
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ mt: 2, maxWidth: 720, color: 'rgba(255,255,255,0.85)' }}>
              Streams are active. New incidents appear immediately in the violation list, while
              pending and resolved counts update dynamically.
            </Typography>

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

        
      </Container>
    </Box>
  );
};

export default Dashboard;
