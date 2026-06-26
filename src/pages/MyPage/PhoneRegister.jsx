import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { AppShell } from '../../components/layout/AppShell';

export const PhoneRegister = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  
  const handleSave = () => {
    if(phone.length < 10) {
      alert('올바른 전화번호를 입력해주세요.');
      return;
    }
    alert('전화번호가 등록되었습니다.');
    navigate(-1);
  };

  return (
    <AppShell hideBottomTab={true}>
      <div className="page-wrapper animate-fade-in" style={{padding: '20px', minHeight: '100vh', background: 'var(--bg-color)'}}>
        <div style={{display:'flex', alignItems:'center', marginBottom:'30px'}}>
          <button className="clay-btn secondary" style={{padding:'8px', marginRight:'15px'}} onClick={() => navigate(-1)}><ChevronLeft/></button>
          <h2 style={{margin:0, fontSize:'1.4rem'}}>전화번호 등록 / 수정</h2>
        </div>

        <div className="clay-card" style={{padding: '30px 20px'}}>
          <h3 style={{marginBottom: '20px'}}>연락처 정보를 입력해주세요</h3>
          <p style={{fontSize: '0.9rem', color: '#666', lineHeight: '1.5', marginBottom: '20px'}}>
            * 알림 발송 및 긴급 연락을 위해 정확한 번호를 입력해주세요.
          </p>
          <input 
            type="tel" 
            className="clay-input" 
            placeholder="숫자만 입력 (예: 01012345678)" 
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ''))}
            maxLength={11}
          />
          <button 
            className="clay-btn accent" 
            style={{width: '100%', marginTop: '10px'}}
            onClick={handleSave}
            disabled={phone.length < 10}
          >
            저장하기
          </button>
        </div>
      </div>
    </AppShell>
  );
};
