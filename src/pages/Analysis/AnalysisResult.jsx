import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, PlayCircle, Lightbulb, CheckCircle } from 'lucide-react';
import { AppShell } from '../../components/layout/AppShell';

export const AnalysisResult = () => {
  const navigate = useNavigate();

  return (
    <AppShell>
      <div className="page-wrapper animate-fade-in" style={{padding: '20px', minHeight: '100vh', background: 'var(--bg-color)'}}>
        
        {/* 헤더 */}
        <div style={{display:'flex', alignItems:'center', marginBottom:'20px'}}>
          <button className="clay-btn secondary" style={{padding:'8px', marginRight:'15px'}} onClick={() => navigate('/dashboard')}>
            <ChevronLeft size={20} />
          </button>
          <h2 style={{margin:0, fontSize:'1.4rem'}}>분석 결과 상세보기</h2>
        </div>

        {/* 1. 오늘의 관찰 요약 */}
        <div className="clay-card" style={{padding: '25px 20px', marginBottom: '20px', background: '#f8f9fa'}}>
          <h3 style={{margin: '0 0 15px 0', fontSize: '1.2rem', color: 'var(--primary)'}}>오늘의 마음 관찰 결과 요약</h3>
          <p style={{margin: 0, fontSize: '0.95rem', color: '#333', lineHeight: '1.6'}}>
            아이는 블록 놀이를 하는 동안 <strong>높은 집중력</strong>을 보였으며, 장난감이 무너졌을 때도 짜증내지 않고 다시 시도하는 <strong>긍정적인 회복 탄력성</strong>이 관찰되었습니다. 보호자의 가벼운 격려에도 밝게 반응하는 모습이 인상적입니다.
          </p>
        </div>

        {/* 2. 주요 관찰 장면 */}
        <div className="clay-card" style={{padding: '20px', marginBottom: '20px'}}>
          <h3 style={{margin: '0 0 15px 0', fontSize: '1.1rem'}}>주요 관찰 장면</h3>
          <div style={{display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '10px'}}>
            {[1, 2, 3].map(item => (
              <div key={item} style={{minWidth: '140px', background: '#eee', borderRadius: '12px', overflow: 'hidden', position: 'relative'}}>
                <div style={{height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#e2e8f0'}}>
                  <PlayCircle size={32} color="#94a3b8" />
                </div>
                <div style={{padding: '8px', fontSize: '0.8rem', background: '#fff'}}>
                  <span style={{fontWeight: 'bold', color: 'var(--primary)'}}>0{item}:15</span>
                  <p style={{margin: '4px 0 0 0', color: '#666'}}>긍정적 감정 표현</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. 마음 지표 분석결과 */}
        <div className="clay-card" style={{padding: '20px', marginBottom: '20px'}}>
          <h3 style={{margin: '0 0 15px 0', fontSize: '1.1rem'}}>마음 지표 분석결과</h3>
          <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
            <div>
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '5px'}}>
                <span style={{fontSize: '0.9rem', fontWeight: 'bold'}}>감정 조절 능력</span>
                <span style={{fontSize: '0.9rem', color: 'var(--primary)', fontWeight: 'bold'}}>우수</span>
              </div>
              <div style={{width: '100%', height: '8px', background: '#eee', borderRadius: '4px'}}>
                <div style={{width: '85%', height: '100%', background: 'var(--primary)', borderRadius: '4px'}}></div>
              </div>
            </div>
            <div>
              <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '5px'}}>
                <span style={{fontSize: '0.9rem', fontWeight: 'bold'}}>놀이 몰입도</span>
                <span style={{fontSize: '0.9rem', color: 'var(--primary)', fontWeight: 'bold'}}>매우 우수</span>
              </div>
              <div style={{width: '100%', height: '8px', background: '#eee', borderRadius: '4px'}}>
                <div style={{width: '95%', height: '100%', background: 'var(--primary)', borderRadius: '4px'}}></div>
              </div>
            </div>
          </div>
        </div>

        {/* 4. 맞춤 코칭 제안 */}
        <div className="clay-card" style={{padding: '25px 20px', marginBottom: '20px', border: '2px solid #f3e8ff'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px'}}>
            <Lightbulb size={24} color="var(--primary)" />
            <h3 style={{margin: 0, fontSize: '1.2rem'}}>전문가 AI 코칭 제안</h3>
          </div>
          <p style={{margin: '0 0 20px 0', fontSize: '0.95rem', color: '#444', lineHeight: '1.6'}}>
            오늘처럼 아이가 스스로 놀이에 몰입할 때는 <strong>적극적인 개입보다는 관찰</strong>하는 것이 좋습니다. 놀이가 끝난 후 "혼자서 멋지게 블록을 쌓았네!"라며 <strong>구체적인 행동을 칭찬</strong>해주세요.
          </p>
          
          <button 
            className="clay-btn accent" 
            style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'}}
            onClick={() => {
              alert('코칭 수행이 아이마음기록에 추가됩니다.');
              navigate('/write-record');
            }}
          >
            <CheckCircle size={18} /> 오늘의 코칭 수행 기록하기
          </button>
        </div>
      </div>
    </AppShell>
  );
};
