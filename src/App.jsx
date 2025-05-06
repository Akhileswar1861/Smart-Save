import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AccountsPage from './pages/AccountsPage';
import CalculatorPage from './pages/CalculatorPage';
import SimulatorPage from './pages/SimulatorPage';
import VaultPage from './pages/VaultPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/accounts" element={<AccountsPage />} />
        <Route path="/calculator" element={<CalculatorPage />} />
        <Route path="/simulator" element={<SimulatorPage />} />
        <Route path="/vault" element={<VaultPage />} />
      </Routes>
    </Router>
  );
}
