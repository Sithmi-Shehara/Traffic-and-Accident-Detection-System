import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Container,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  Box,
  Avatar,
  Paper,
  Grid,
  Link as MuiLink
} from '@mui/material';
import { Login as LoginIcon, Email, Lock } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';


//Added initial state for form data
const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // Added error handling state

  const [error, setError] = useState('');
  // Loading state added for UX improvement
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
// Added handleChange function for form inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Added async submit handling for improved login flow
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper 
        elevation={12} 
        sx={{ 
          p: 4, 
          borderRadius: 3,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white'
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Avatar sx={{ mx: 'auto', mb: 2, bgcolor: 'rgba(255,255,255,0.2)', width: 64, height: 64 }}>
            <LoginIcon sx={{ fontSize: 32 }} />
          </Avatar>
          <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
            Welcome Back
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            Sign in to your account
          </Typography>
        </Box>

        <Card sx={{ bgcolor: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)' }}>
          <CardContent sx={{ p: 4 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                {error}
              </Alert>
            )}
            // Form added
            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    variant="outlined"
                    InputProps={{
                      startAdornment: <Email sx={{ mr: 1, color: 'action.active' }} />
                    }}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    variant="outlined"
                    InputProps={{
                      startAdornment: <Lock sx={{ mr: 1, color: 'action.active' }} />
                    }}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    disabled={loading}
                    sx={{ 
                      py: 1.5, 
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      borderRadius: 2,
                      mt: 2
                    }}
                  >
                    {loading ? 'Signing In...' : 'Sign In'}
                  </Button>
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Don't have an account?{' '}
                <MuiLink 
                  component={Link} 
                  to="/signup" 
                  sx={{ 
                    color: 'primary.main',
                    textDecoration: 'none',
                    fontWeight: 600,
                    '&:hover': { textDecoration: 'underline' }
                  }}
                >
                  Sign Up
                </MuiLink>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Paper>
    </Container>
  );
};

export default Login;