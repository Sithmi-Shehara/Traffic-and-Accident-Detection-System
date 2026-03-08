import React, { useEffect, useMemo, useState } from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Alert,
  LinearProgress,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ViolationListPage = () => {
  const navigate = useNavigate();
  const [violations, setViolations] = useState([]);
  const [loadingViolations, setLoadingViolations] = useState(true);
  const [violationsError, setViolationsError] = useState('');
  const [filter, setFilter] = useState('');
  const [resolveTarget, setResolveTarget] = useState(null);
  const [resolving, setResolving] = useState(false);

  const apiBaseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

  useEffect(() => {
    let isMounted = true;
    const fetchViolations = async () => {
      try {
        setLoadingViolations(true);
        setViolationsError('');
        const response = await axios.get(`${apiBaseUrl}/violations`, {
          params: { limit: 200, offset: 0 }
        });
        if (isMounted) {
          setViolations(response.data?.data || []);
        }
      } catch (error) {
        if (isMounted) {
          setViolationsError('Failed to load violations data.');
        }
      } finally {
        if (isMounted) {
          setLoadingViolations(false);
        }
      }
    };

    fetchViolations();
    return () => {
      isMounted = false;
    };
  }, [apiBaseUrl]);

  const filteredViolations = useMemo(() => {
    if (!filter.trim()) return violations;
    const term = filter.trim().toLowerCase();
    return violations.filter((row) =>
      String(row.violation_type || '').toLowerCase().includes(term) ||
      String(row.number_plate || '').toLowerCase().includes(term) ||
      String(row.source_endpoint || '').toLowerCase().includes(term)
    );
  }, [filter, violations]);

  const { pendingViolations, resolvedViolations } = useMemo(() => {
    const pending = [];
    const resolved = [];
    for (const row of filteredViolations) {
      if (Number(row.is_resolved) === 1) {
        resolved.push(row);
      } else {
        pending.push(row);
      }
    }
    return { pendingViolations: pending, resolvedViolations: resolved };
  }, [filteredViolations]);

  const getPriority = (type) => {
    const value = String(type || '').toLowerCase().replace(/\s+/g, '_');
    if (value === 'crash' || value === 'crash_with_fire') return 'high';
    if (value === 'traffic_violation') return 'medium';
    if (value === 'helmet' || value === 'helmat' || value === 'helmet_violation' || value === 'seatbelt' || value === 'seatbelt_violation') return 'low';
    return 'low';
  };

  const priorityStyles = {
    high: { label: 'High', color: 'error' },
    medium: { label: 'Medium', color: 'warning' },
    low: { label: 'Low', color: 'success' }
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  const handleOpenResolve = (row) => {
    setResolveTarget(row);
  };

  const handleCloseResolve = () => {
    if (!resolving) {
      setResolveTarget(null);
    }
  };

  const handleConfirmResolve = async () => {
    if (!resolveTarget) return;
    try {
      setResolving(true);
      await axios.patch(`${apiBaseUrl}/violations/${resolveTarget.id}/resolve`);
      setViolations((prev) =>
        prev.map((row) =>
          row.id === resolveTarget.id ? { ...row, is_resolved: 1 } : row
        )
      );
      setResolveTarget(null);
    } catch (error) {
      setViolationsError('Failed to mark violation as resolved.');
    } finally {
      setResolving(false);
    }
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
          📋 Violation List
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Live data from the `violations` table
        </Typography>
      </Box>

      <Box sx={{ mb: 2, maxWidth: 360 }}>
        <TextField
          fullWidth
          label="Filter by type, plate, or source"
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
          size="small"
        />
      </Box>

      <Card sx={{ borderRadius: 3 }}>
        <CardContent sx={{ p: 0 }}>
          {loadingViolations && (
            <Box sx={{ p: 3 }}>
              <Typography variant="body2" gutterBottom>Loading violations...</Typography>
              <LinearProgress />
            </Box>
          )}

          {violationsError && (
            <Box sx={{ p: 3 }}>
              <Alert severity="error">{violationsError}</Alert>
            </Box>
          )}

          {!loadingViolations && !violationsError && (
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Priority</TableCell>
                    <TableCell>Number Plate</TableCell>
                    <TableCell>Source</TableCell>
                    <TableCell>Created</TableCell>
                    <TableCell>Image</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredViolations.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8}>
                        <Typography variant="body2" color="text.secondary">
                          No violations found.
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    <>
                      {pendingViolations.map((row) => (
                        <TableRow key={row.id} hover>
                          <TableCell>{row.id}</TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <Typography variant="body2">{row.violation_type}</Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            {(() => {
                              const key = getPriority(row.violation_type);
                              const { label, color } = priorityStyles[key];
                              return (
                                <Chip
                                  label={label}
                                  color={color}
                                  size="small"
                                  variant="outlined"
                                />
                              );
                            })()}
                          </TableCell>
                          <TableCell>{row.number_plate || '-'}</TableCell>
                          <TableCell>{row.source_endpoint || '-'}</TableCell>
                          <TableCell>
                            {row.created_at ? new Date(row.created_at).toLocaleString() : '-'}
                          </TableCell>
                          <TableCell>
                            {row.image_url ? (
                              <Button
                                size="small"
                                variant="outlined"
                                href={row.image_url}
                                target="_blank"
                                rel="noreferrer"
                              >
                                View
                              </Button>
                            ) : (
                              '-'
                            )}
                          </TableCell>
                          <TableCell>Pending</TableCell>
                          <TableCell align="right">
                            <Button
                              size="small"
                              variant="contained"
                              onClick={() => handleOpenResolve(row)}
                            >
                              Mark as Resolved
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}

                      {resolvedViolations.length > 0 && (
                        <TableRow>
                          <TableCell colSpan={8}>
                            <Typography variant="subtitle2" color="text.secondary">
                              Resolved Cases
                            </Typography>
                          </TableCell>
                        </TableRow>
                      )}

                      {resolvedViolations.map((row) => (
                        <TableRow key={row.id} hover>
                          <TableCell>{row.id}</TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              {String(row.violation_type).toLowerCase() === 'crash' && (
                                <Box
                                  sx={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: '50%',
                                    bgcolor: 'error.main',
                                    boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.2)'
                                  }}
                                />
                              )}
                              <Typography variant="body2">{row.violation_type}</Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            {(() => {
                              const key = getPriority(row.violation_type);
                              const { label, color } = priorityStyles[key];
                              return (
                                <Chip
                                  label={label}
                                  color={color}
                                  size="small"
                                  variant="outlined"
                                />
                              );
                            })()}
                          </TableCell>
                          <TableCell>{row.number_plate || '-'}</TableCell>
                          <TableCell>{row.source_endpoint || '-'}</TableCell>
                          <TableCell>
                            {row.created_at ? new Date(row.created_at).toLocaleString() : '-'}
                          </TableCell>
                          <TableCell>
                            {row.image_url ? (
                              <Button
                                size="small"
                                variant="outlined"
                                href={row.image_url}
                                target="_blank"
                                rel="noreferrer"
                              >
                                View
                              </Button>
                            ) : (
                              '-'
                            )}
                          </TableCell>
                          <TableCell>Resolved</TableCell>
                          <TableCell align="right">-</TableCell>
                        </TableRow>
                      ))}
                    </>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>

      <Dialog open={Boolean(resolveTarget)} onClose={handleCloseResolve}>
        <DialogTitle>Mark as Resolved</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to mark this violation as resolved?
          </DialogContentText>
          {resolveTarget && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary">
                #{resolveTarget.id} • {resolveTarget.violation_type} • {resolveTarget.number_plate || 'No plate'}
              </Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseResolve} disabled={resolving}>Cancel</Button>
          <Button variant="contained" onClick={handleConfirmResolve} disabled={resolving}>
            {resolving ? 'Saving...' : 'Confirm'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ViolationListPage;
