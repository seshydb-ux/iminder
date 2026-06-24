import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login, SignupForm, OrgBlockScreen, MainHome, ActionFlow, AnalysisResult, Dashboard, WriteRecord, RecordDetail } from './pages';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup-form" element={<SignupForm />} />
          <Route path="/org-block" element={<OrgBlockScreen />} />
          <Route path="/home" element={<MainHome />} />
          <Route path="/action" element={<ActionFlow />} />
          <Route path="/analysis-result" element={<AnalysisResult />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/write-record" element={<WriteRecord />} />
          <Route path="/record-detail" element={<RecordDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;


