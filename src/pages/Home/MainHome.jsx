import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Bell } from 'lucide-react';
import { AppShell } from '../../components/layout/AppShell';
import { ChildContext, NotificationContext } from '../../contexts';

export const MainHome = () => {
  const navigate = useNavigate();
  const { childList } = useContext(ChildContext);
  const { notifications } = useContext(NotificationContext);
  const [showModal, setShowModal] = useState(false);

  const unreadCount = notifications ? notifications.filter(n => n.isRead === false).length : 0;

  return (
    <AppShell>
      <div className="page-wrapper animate-fade-in" style={{ backgroundColor: '#fffdf0', minHeight: '100%', padding: '20px' }}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'30px'}}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>오늘의 우리아이</h2>
          <div style={{position:'relative', cursor:'pointer'}} onClick={() => navigate('/notifications')}>
            <Bell size={24} color="#333" />
            {unreadCount > 0 && (
              <div style={{
                position:'absolute', top:'-4px', right:'-4px', background:'var(--primary)', color:'#fff', 
                fontSize:'10px', width:'18px', height:'18px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:'bold'
              }}>
                {unreadCount}
              </div>
            )}
          </div>
        </div>

        <div style={{display:'flex', justifyContent:'center', gap:'20px'}}>
          {childList.map(c => (
            <div key={c.id} className="clay-card" style={{
              textAlign:'center', cursor: c.status.includes('요청 중') ? 'not-allowed' : 'pointer', 
              opacity: c.status.includes('요청 중') ? 0.7 : 1,
              width: childList.length === 1 ? '200px' : '150px',
              position: 'relative'
            }} onClick={() => {
              if(!c.status.includes('요청 중')) navigate('/dashboard');
            }}>
              {/* 상태 배지 */}
              <div style={{
                position: 'absolute', top: '10px', left: '10px', fontSize: '0.75rem', fontWeight: '500',
                padding: '4px 8px', borderRadius: '12px', background: c.status === '정식등록' || c.status === '확인 완료' ? '#f0fdf4' : '#f3f4f6',
                color: c.status === '정식등록' || c.status === '확인 완료' ? '#166534' : '#4b5563'
              }}>
                {c.status === '정식등록' ? '확인 완료' : c.status}
              </div>

              <div style={{fontSize:'4rem', marginBottom:'10px', marginTop:'20px'}}>{c.char}</div>
              <h3 style={{margin:'0 0 5px 0', fontSize:'1.2rem'}}>{c.name} <span style={{fontSize:'0.9rem', color:'#666', fontWeight:'normal'}}>({c.age})</span></h3>
              {/* 최근 마음날씨 노출 보류 */}
            </div>
          ))}
        </div>

        <div style={{marginTop:'30px', textAlign:'center'}}>
          <button className="clay-btn secondary" style={{borderRadius:'50%', width:'50px', height:'50px', padding:0, display:'inline-flex', alignItems:'center', justifyContent:'center'}} onClick={() => setShowModal(true)}>
            <Plus size={24} />
          </button>
          <p style={{fontSize:'0.9rem', color:'#666', marginTop:'10px'}}>아이 추가하기</p>
        </div>

        {/* 법정대리인 동의 모달 (더미) */}
        {showModal && (
          <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:100}}>
            <div className="clay-card animate-fade-in" style={{width:'90%', maxWidth:'320px', padding:'20px'}}>
              <h3 style={{marginTop:0}}>법정대리인 동의</h3>
              <p style={{fontSize:'0.9rem', color:'#666', lineHeight:'1.5'}}>
                아이의 핵심정보(생년월일, 성별 등)를 등록하기 위해 보호자 인증 및 동의가 필요합니다.
              </p>
              <div style={{display:'flex', gap:'10px', marginTop:'20px'}}>
                <button className="clay-btn secondary" style={{flex:1}} onClick={() => setShowModal(false)}>취소</button>
                <button className="clay-btn" style={{flex:1}} onClick={() => {
                  alert('1차 MVP에서는 더미 인증으로 통과합니다.');
                  setShowModal(false);
                }}>인증하기</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
};
