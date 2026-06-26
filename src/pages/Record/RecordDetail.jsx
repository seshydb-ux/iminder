import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Edit3, CheckCircle } from 'lucide-react';
import { AppShell } from '../../components/layout/AppShell';

export const RecordDetail = () => {
  const navigate = useNavigate();
  const [record, setRecord] = useState(null);

  useEffect(() => {
    // 가장 최근 작성된 기록을 불러오는 더미 로직
    const records = JSON.parse(localStorage.getItem('mindRecords') || '[]');
    if (records.length > 0) {
      setRecord(records[records.length - 1]);
    } else {
      // 기록이 없을 경우 가짜 기록 생성
      setRecord({
        recordDate: new Date().toISOString().split('T')[0],
        weather: '☀️',
        text: '오늘 블록 놀이를 하면서 아이가 무척 즐거워했다. 지난번에는 블록이 무너지면 울면서 짜증을 냈는데, 오늘은 다시 쌓으면 된다면서 긍정적으로 반응했다. 너무 대견해서 코칭대로 구체적으로 칭찬해주었다.',
        coachingApplied: true
      });
    }
  }, []);

  if (!record) return null;

  return (
    <AppShell>
      <div className="page-wrapper animate-fade-in" style={{padding: '20px', minHeight: '100vh', background: 'var(--bg-color)'}}>
        
        {/* 헤더 */}
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'30px'}}>
          <div style={{display:'flex', alignItems:'center'}}>
            <button className="clay-btn secondary" style={{padding:'8px', marginRight:'15px'}} onClick={() => navigate('/dashboard')}>
              <ChevronLeft size={20} />
            </button>
            <h2 style={{margin:0, fontSize:'1.4rem'}}>상세 기록</h2>
          </div>
          <button className="clay-btn secondary" style={{padding:'8px'}} onClick={() => alert('수정 모드 진입')}>
            <Edit3 size={18} color="#666" />
          </button>
        </div>

        <div className="clay-card" style={{padding: '30px 20px', marginBottom: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
          <div style={{fontSize: '4rem', marginBottom: '10px'}}>{record.weather}</div>
          <h3 style={{margin: '0 0 5px 0', fontSize: '1.2rem'}}>{record.recordDate}</h3>
          <p style={{margin: 0, color: '#666', fontSize: '0.9rem'}}>오늘의 마음날씨</p>
        </div>

        {record.coachingApplied && (
          <div className="clay-card" style={{padding: '20px', marginBottom: '20px', background: '#f0fdf4', border: '1px solid #dcfce7', display: 'flex', gap: '10px', alignItems: 'flex-start'}}>
            <CheckCircle size={20} color="#166534" style={{flexShrink: 0, marginTop: '2px'}} />
            <div>
              <p style={{margin: '0 0 5px 0', fontWeight: 'bold', color: '#166534', fontSize: '0.95rem'}}>전문가 코칭 실천 완료!</p>
              <p style={{margin: 0, fontSize: '0.85rem', color: '#166534', lineHeight: '1.4'}}>
                AI가 제안한 맞춤 코칭을 일상 속에서 실천하셨군요! 아이의 긍정적인 변화에 큰 도움이 될 거예요.
              </p>
            </div>
          </div>
        )}

        <div className="clay-card" style={{padding: '25px 20px', marginBottom: '20px', minHeight: '200px'}}>
          <p style={{margin: 0, lineHeight: '1.7', color: '#333', fontSize: '0.95rem'}}>
            {record.text}
          </p>
        </div>
      </div>
    </AppShell>
  );
};
