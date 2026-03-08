import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from './theme';
import Dashboard from './components/Dashboard';
import ViolationsPage from './components/ViolationsPage';
import AccidentsPage from './components/AccidentsPage';
import NumberPlatePage from './components/NumberPlatePage';
import AlertsPage from './components/AlertsPage';
import HelmetViolationPage from './components/HelmetViolationPage';
import SeatbeltViolationPage from './components/SeatbeltViolationPage';
import ViolationListPage from './components/ViolationListPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/violations" element={<ViolationsPage />} />
            <Route path="/accidents" element={<AccidentsPage />} />
            <Route path="/number-plate" element={<NumberPlatePage />} />
            <Route path="/alerts" element={<AlertsPage />} />
            <Route path="/helmet-violation" element={<HelmetViolationPage />} />
            <Route path="/seatbelt-violation" element={<SeatbeltViolationPage />} />
            <Route path="/violation-list" element={<ViolationListPage />} />
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
