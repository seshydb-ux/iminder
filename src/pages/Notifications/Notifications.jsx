import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Check, Bell } from 'lucide-react';
import { NotificationContext } from '../../contexts';
import { AppShell } from '../../components/layout/AppShell';

export const Notifications = () => {
  const navigate = useNavigate();
  const { notifications, setNotifications } = useContext(NotificationContext);

  const markAsRead = (id) => {
    setNotifications(prev => prev.map(n => n.notificationId === id ? { ...n, isRead: true } : n));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  return (
    <AppShell hideBottomTab={true}>
      <div className="page-wrapper animate-fade-in" style={{padding: '20px', minHeight: '100vh', background: 'var(--bg-color)'}}>
        
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'30px'}}>
          <div style={{display:'flex', alignItems:'center'}}>
            <button className="clay-btn secondary" style={{padding:'8px', marginRight:'15px'}} onClick={() => navigate(-1)}>
              <ChevronLeft size={20} />
            </button>
            <h2 style={{margin:0, fontSize:'1.4rem'}}>알림</h2>
          </div>
          <button style={{background:'none', border:'none', color:'var(--primary)', fontWeight:'bold', cursor:'pointer'}} onClick={markAllAsRead}>
            모두 읽음
          </button>
        </div>

        {(!notifications || notifications.length === 0) ? (
          <div style={{textAlign:'center', marginTop:'100px', color:'#999'}}>
            <Bell size={48} style={{opacity:0.3, marginBottom:'10px'}} />
            <p>새로운 알림이 없습니다.</p>
          </div>
        ) : (
          <div style={{display:'flex', flexDirection:'column', gap:'15px'}}>
            {notifications.map(noti => (
              <div 
                key={noti.notificationId} 
                className="clay-card" 
                style={{
                  padding:'20px', 
                  borderLeft: noti.isRead ? 'none' : '4px solid var(--primary)',
                  opacity: noti.isRead ? 0.6 : 1,
                  cursor: 'pointer'
                }}
                onClick={() => {
                  markAsRead(noti.notificationId);
                  navigate('/analysis-result');
                }}
              >
                <div style={{display:'flex', justifyContent:'space-between', marginBottom:'8px'}}>
                  <h3 style={{margin:0, fontSize:'1rem', color: noti.isRead ? '#666' : '#000'}}>{noti.title}</h3>
                  <span style={{fontSize:'0.75rem', color:'#999'}}>방금 전</span>
                </div>
                <p style={{margin:0, fontSize:'0.9rem', color:'#666', lineHeight:'1.4'}}>{noti.message}</p>
                {!noti.isRead && (
                  <div style={{display:'flex', alignItems:'center', gap:'5px', marginTop:'10px', color:'var(--primary)', fontSize:'0.8rem', fontWeight:'bold'}}>
                    <Check size={14} /> 탭해서 확인하기
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
};
