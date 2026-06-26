import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Lock } from 'lucide-react';

export const OrgBlockScreen = () => {
  const navigate = useNavigate();
  return (
    <div className="page-wrapper animate-fade-in" style={{padding: '20px', minHeight: '100vh', background: 'var(--bg-color)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
      <div className="clay-card" style={{padding: '40px 20px', textAlign: 'center', maxWidth: '340px', width: '100%'}}>
        <div style={{display:'flex', justifyContent:'center', marginBottom:'20px'}}>
          <div style={{width:'60px', height:'60px', borderRadius:'50%', background:'#f3e8ff', display:'flex', alignItems:'center', justifyContent:'center'}}>
            <Lock size={30} color="var(--primary)" />
          </div>
        </div>
        <h2 style={{margin: '0 0 15px 0', fontSize:'1.3rem'}}>기관 회원가입 안내</h2>
        <p style={{color: '#666', lineHeight: '1.6', marginBottom: '30px', fontSize:'0.95rem'}}>
          기관 및 교사 계정은<br/>1차 MVP 프로토타입에서<br/>지원하지 않습니다.
        </p>
        <button className="clay-btn" style={{width: '100%'}} onClick={() => navigate(-1)}>
          돌아가기
        </button>
      </div>
    </div>
  );
};
