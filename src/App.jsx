import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { initializeStorage } from './utils/storage';
import { AppProvider } from './contexts';

import { Login, SignupForm, OrgBlockScreen, MainHome, ActionFlow, AnalysisResult, Dashboard, WriteRecord, RecordDetail, MyPage, PhoneRegister, Notifications } from './pages/index.js';
import './index.css';

function App() {
  useEffect(() => {
    initializeStorage();
  }, []);

  return (
    <AppProvider>
      <BrowserRouter>
        <div className="container">
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup-form" element={<SignupForm />} />
            <Route path="/org-block" element={<OrgBlockScreen />} />
            
            {/* 메인 라우트 */}
            <Route path="/home" element={<MainHome />} />
            <Route path="/action" element={<ActionFlow />} />
            <Route path="/analysis-result" element={<AnalysisResult />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/write-record" element={<WriteRecord />} />
            <Route path="/record-detail" element={<RecordDetail />} />
            
            {/* 마이페이지 & 알림 라우트 */}
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/mypage/phone" element={<PhoneRegister />} />
            <Route path="/notifications" element={<Notifications />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
