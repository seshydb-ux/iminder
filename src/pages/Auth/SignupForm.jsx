import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

export const SignupForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [accountType, setAccountType] = useState(null);

  const handleNext = () => {
    if (step === 1 && accountType) {
      setStep(2);
    } else if (step === 2) {
      alert('가입이 완료되었습니다!\n이메일 인증을 진행해주세요.');
      navigate('/');
    }
  };

  return (
    <div className="page-wrapper animate-fade-in" style={{padding: '20px', minHeight: '100vh', background: 'var(--bg-color)'}}>
      <div style={{display:'flex', alignItems:'center', marginBottom:'30px'}}>
        <button className="clay-btn secondary" style={{padding:'8px', marginRight:'15px'}} onClick={() => step === 1 ? navigate(-1) : setStep(1)}><ChevronLeft/></button>
        <h2 style={{margin:0, fontSize:'1.4rem'}}>회원가입</h2>
      </div>

      <div className="clay-card" style={{padding: '30px 20px'}}>
        {step === 1 && (
          <div className="animate-fade-in">
            <h3 style={{marginBottom: '20px'}}>가입 유형을 선택해주세요</h3>
            <div 
              className="clay-card" 
              style={{
                marginBottom:'15px', cursor:'pointer', padding:'20px',
                border: accountType === 'parent' ? '2px solid var(--primary)' : '2px solid transparent'
              }}
              onClick={() => setAccountType('parent')}
            >
              <div style={{fontSize:'1.1rem', fontWeight:'bold', marginBottom:'5px'}}>가정용 아이 보호자</div>
              <div style={{fontSize:'0.9rem', color:'#666'}}>부모, 보호자, 양육자</div>
            </div>
            
            <div 
              className="clay-card" 
              style={{
                marginBottom:'30px', cursor:'pointer', padding:'20px',
                border: accountType === 'org' ? '2px solid var(--primary)' : '2px solid transparent'
              }}
              onClick={() => setAccountType('org')}
            >
              <div style={{fontSize:'1.1rem', fontWeight:'bold', marginBottom:'5px'}}>기관 / 교사</div>
              <div style={{fontSize:'0.9rem', color:'#666'}}>보육기관, 유치원, 어린이집 교사 및 관리자</div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in">
            <h3 style={{marginBottom: '20px'}}>계정 정보를 입력해주세요</h3>
            <input className="clay-input" type="text" placeholder="보호자 이름" />
            <input className="clay-input" type="email" placeholder="이메일" />
            <input className="clay-input" type="password" placeholder="비밀번호" />
            <input className="clay-input" type="password" placeholder="비밀번호 확인" />
            
            <div style={{marginTop: '20px', fontSize: '0.9rem', color: '#666', background: '#f5f5f5', padding: '15px', borderRadius: '12px'}}>
              <label style={{display:'flex', alignItems:'center', gap:'10px', marginBottom:'10px'}}>
                <input type="checkbox" /> [필수] 서비스 이용약관 동의
              </label>
              <label style={{display:'flex', alignItems:'center', gap:'10px'}}>
                <input type="checkbox" /> [필수] 개인정보 수집 및 이용 동의
              </label>
            </div>
          </div>
        )}

        <button 
          className="clay-btn accent" 
          style={{width: '100%', marginTop: '20px', opacity: (step === 1 && !accountType) ? 0.5 : 1}}
          onClick={handleNext}
          disabled={step === 1 && !accountType}
        >
          {step === 1 ? '다음' : '가입하기'}
        </button>
      </div>
    </div>
  );
};
