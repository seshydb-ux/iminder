import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ChevronLeft, Check, Sun, Cloud, CloudRain, CloudLightning, Wind } from 'lucide-react';
import { AppShell } from '../../components/layout/AppShell';

export const WriteRecord = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dateParam = searchParams.get('date');
  
  const [date, setDate] = useState(dateParam || new Date().toISOString().split('T')[0]);
  const [weather, setWeather] = useState('');
  const [content, setContent] = useState('');
  const [coachingChecked, setCoachingChecked] = useState(true);

  const weathers = [
    { id: 'sunny', icon: '☀️', label: '맑음' },
    { id: 'cloudy', icon: '☁️', label: '흐림' },
    { id: 'rainy', icon: '🌧️', label: '비' },
    { id: 'stormy', icon: '🌩️', label: '천둥' },
    { id: 'windy', icon: '💨', label: '바람' },
  ];

  const handleSave = () => {
    // 더미 저장 로직
    const records = JSON.parse(localStorage.getItem('mindRecords') || '[]');
    const newRecord = {
      id: `record_${Date.now()}`,
      recordDate: date,
      weather: weathers.find(w => w.id === weather)?.icon || '☀️',
      text: content,
      coachingApplied: coachingChecked
    };
    localStorage.setItem('mindRecords', JSON.stringify([...records, newRecord]));
    alert('기록이 저장되었습니다.');
    navigate('/dashboard');
  };

  return (
    <AppShell hideBottomTab={true}>
      <div className="page-wrapper animate-fade-in" style={{padding: '20px', minHeight: '100vh', background: 'var(--bg-color)'}}>
        
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'30px'}}>
          <div style={{display:'flex', alignItems:'center'}}>
            <button className="clay-btn secondary" style={{padding:'8px', marginRight:'15px'}} onClick={() => navigate(-1)}>
              <ChevronLeft size={20} />
            </button>
            <h2 style={{margin:0, fontSize:'1.4rem'}}>마음기록 남기기</h2>
          </div>
          <button 
            className="clay-btn accent" 
            style={{padding: '8px 16px', fontSize: '0.9rem', opacity: weather && content ? 1 : 0.5}}
            disabled={!weather || !content}
            onClick={handleSave}
          >
            저장
          </button>
        </div>

        <div className="clay-card" style={{padding: '20px', marginBottom: '20px'}}>
          <h3 style={{margin: '0 0 10px 0', fontSize: '1rem'}}>날짜</h3>
          <input 
            type="date" 
            className="clay-input" 
            value={date} 
            onChange={(e) => setDate(e.target.value)} 
            disabled={!!dateParam}
            style={{marginBottom: 0}}
          />
        </div>

        <div className="clay-card" style={{padding: '20px', marginBottom: '20px'}}>
          <h3 style={{margin: '0 0 15px 0', fontSize: '1rem'}}>오늘 아이의 마음날씨는 어땠나요?</h3>
          <div style={{display: 'flex', justifyContent: 'space-between', gap: '5px'}}>
            {weathers.map(w => (
              <div 
                key={w.id}
                style={{
                  flex: 1, height: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  background: weather === w.id ? '#f3e8ff' : '#fff',
                  border: weather === w.id ? '2px solid var(--primary)' : '1px solid #eee',
                  borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s'
                }}
                onClick={() => setWeather(w.id)}
              >
                <span style={{fontSize: '1.5rem', marginBottom: '4px'}}>{w.icon}</span>
                <span style={{fontSize: '0.75rem', fontWeight: weather === w.id ? 'bold' : 'normal', color: weather === w.id ? 'var(--primary)' : '#666'}}>{w.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 전문가 코칭 연동 영역 */}
        <div className="clay-card" style={{padding: '20px', marginBottom: '20px', background: '#f8f9fa', border: '1px solid #eee'}}>
          <h3 style={{margin: '0 0 10px 0', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px'}}>
            전문가 AI 코칭 연동
          </h3>
          <div style={{display: 'flex', alignItems: 'flex-start', gap: '10px'}}>
            <div 
              style={{
                width: '24px', height: '24px', borderRadius: '50%', background: coachingChecked ? 'var(--primary)' : '#fff', 
                border: coachingChecked ? 'none' : '2px solid #ccc', display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', flexShrink: 0, marginTop: '2px'
              }}
              onClick={() => setCoachingChecked(!coachingChecked)}
            >
              {coachingChecked && <Check size={16} color="#fff" />}
            </div>
            <div>
              <p style={{margin: '0 0 5px 0', fontWeight: 'bold', fontSize: '0.95rem'}}>추천 코칭을 실천했어요</p>
              <p style={{margin: 0, fontSize: '0.85rem', color: '#666', lineHeight: '1.4'}}>
                "혼자서 멋지게 블록을 쌓았네!" 구체적인 행동 칭찬하기
              </p>
            </div>
          </div>
        </div>

        <div className="clay-card" style={{padding: '20px', marginBottom: '20px'}}>
          <h3 style={{margin: '0 0 10px 0', fontSize: '1rem'}}>기록 남기기</h3>
          <textarea 
            className="clay-input" 
            placeholder="아이와 있었던 일이나 부모님의 감정을 자유롭게 기록해보세요."
            style={{height: '150px', resize: 'none', marginBottom: 0}}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
      </div>
    </AppShell>
  );
};
