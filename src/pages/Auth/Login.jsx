import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts';

export const Login = () => {
  const navigate = useNavigate();
  const { setAuthUser } = useContext(AuthContext);
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    // 3초 후 애니메이션 종료
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleLogin = (provider) => {
    // 더미 로그인 처리 (로컬 스토리지에 로그인 상태 임시 저장)
    const mockUser = {
      userId: "user_001",
      nickname: "지훈이 부모님",
      email: "parent@example.com",
      loginProvider: provider,
      accountType: "home_guardian",
      phoneNumber: "",
      phoneVerified: false
    };
    setAuthUser(mockUser);
    localStorage.setItem('authUser', JSON.stringify(mockUser));
    navigate('/home');
  };

  return (
    <div className="page-wrapper" style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
      minHeight: '100vh', background: 'var(--bg-color)'
    }}>
      {/* 1. 상단 타이틀 영역 (페이드인 & 텍스트 그리기) */}
      <div style={{textAlign: 'center', marginBottom: '-10px', marginTop: '10px'}}>
        <p className="fade-in-element" style={{
          margin: 0, 
          marginBottom: '5px',
          color: '#666', 
          fontSize: '0.9rem',
          letterSpacing: '1px'
        }}>
          AI로 분석하는 우리아이 마음
        </p>

        {/* 점이 지나가며 글자 나타나는 애니메이션 */}
        <div className="draw-text-wrapper">
          <div className="drawing-dot"></div>
          <div className="draw-text-mask">
            iminder
          </div>
        </div>
      </div>

      {/* 2. 중앙 캐릭터 (크기 확대) */}
      <div className="fade-in-element" style={{ marginBottom: '-10px', animationDelay: '1.5s' }}>
        <div style={{
          width: '260px', height: '260px', borderRadius: '50%', background: '#fff', 
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 10px 30px rgba(100,60,180,0.1)'
        }}>
          <span style={{fontSize: '120px', lineHeight: 1}}>💊</span>
        </div>
      </div>

      {/* 3. 하단 로그인 입력폼 및 버튼 (캐릭터 등장 후 나타남) */}
      <div className="fade-in-element clay-card" style={{ 
        width: '100%', 
        maxWidth: '340px', 
        animationDelay: '2s',
        padding: '30px 20px',
        boxSizing: 'border-box'
      }}>
        <div style={{marginBottom: '15px'}}>
          <input className="clay-input" type="text" placeholder="아이디 (이메일)" style={{marginBottom: '10px'}} />
          <input className="clay-input" type="password" placeholder="비밀번호" style={{marginBottom: '0'}} />
        </div>

        {/* 소셜 로그인 3종 (K, N, G) */}
        <div style={{display:'flex', gap:'10px', marginBottom:'20px'}}>
          <button style={{
            flex:1, height:'45px', borderRadius:'12px', border:'none', background:'#FEE500', color:'#000000',
            fontWeight:'bold', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center'
          }} onClick={() => handleLogin('kakao')}>
            K
          </button>
          <button style={{
            flex:1, height:'45px', borderRadius:'12px', border:'none', background:'#03C75A', color:'#fff',
            fontWeight:'bold', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center'
          }} onClick={() => handleLogin('naver')}>
            N
          </button>
          <button style={{
            flex:1, height:'45px', borderRadius:'12px', border:'1px solid #ddd', background:'#fff', color:'#333',
            fontWeight:'bold', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center'
          }} onClick={() => handleLogin('google')}>
            G
          </button>
        </div>

        {/* 하단 링크 메뉴 */}
        <div style={{display:'flex', flexDirection:'column', gap:'10px', fontSize:'0.85rem', color:'#666', textAlign:'center'}}>
          <span style={{cursor:'pointer'}} onClick={() => navigate('/org-block')}>기관회원 로그인하러가기</span>
          <span style={{cursor:'pointer'}} onClick={() => navigate('/signup-form')}>회원가입하러가기</span>
          <span style={{cursor:'pointer'}}>아이디/비밀번호 찾기</span>
        </div>
      </div>
    </div>
  );
};
