import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Play, Camera, Plus } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth, isSameDay, isToday } from 'date-fns';
import { AppShell } from '../../components/layout/AppShell';

export const Dashboard = () => {
  const navigate = useNavigate();
  
  // 상태 관리
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [mindRecords, setMindRecords] = useState([]);
  const [analysisResults, setAnalysisResults] = useState([]);
  const [child, setChild] = useState(null);
  const [activeChartTab, setActiveChartTab] = useState('마음 안정 흐름');

  useEffect(() => {
    // 로컬 스토리지에서 더미 데이터 로드
    const childrenData = JSON.parse(localStorage.getItem('children') || '[]') || [];
    setChild(childrenData[0] || { name: '아이', char: '🧒', age: '만 4세' });

    const records = JSON.parse(localStorage.getItem('mindRecords') || '[]') || [];
    setMindRecords(records);

    const analysis = JSON.parse(localStorage.getItem('analysisResults') || '[]') || [];
    setAnalysisResults(analysis);
  }, []);

  // 달력 관련 로직
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  // 해당 날짜의 기록 찾기
  const getRecordForDate = (date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    return mindRecords.find(r => r.recordDate === formattedDate);
  };

  const selectedRecord = getRecordForDate(selectedDate);

  // 차트 더미 데이터 (Recharts)
  const chartData = [
    { name: '1일', value: 2 },
    { name: '5일', value: 3 },
    { name: '10일', value: 4 },
    { name: '15일', value: 3 },
    { name: '20일', value: 5 },
  ];

  return (
    <AppShell>
      <div className="page-wrapper animate-fade-in" style={{padding: '20px', minHeight: '100vh', background: 'var(--bg-color)'}}>
        {/* 헤더 */}
        <div style={{display:'flex', alignItems:'center', marginBottom:'20px'}}>
          <button className="clay-btn secondary" style={{padding:'8px', marginRight:'15px'}} onClick={() => navigate(-1)}>
            <ChevronLeft size={20} />
          </button>
          <h2 style={{margin:0, fontSize:'1.4rem'}}>{child?.name}의 기록</h2>
        </div>

        {/* 상단 아이 정보 & 행동분석 버튼 */}
        <div className="clay-card" style={{padding: '20px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
            <div style={{fontSize: '2.5rem'}}>{child?.char}</div>
            <div>
              <h3 style={{margin: '0 0 5px 0', fontSize: '1.2rem'}}>{child?.name}</h3>
              <p style={{margin: 0, color: '#666', fontSize: '0.9rem'}}>{child?.age}</p>
            </div>
          </div>
          <button 
            className="clay-btn accent" 
            style={{padding: '10px 15px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '5px'}}
            onClick={() => navigate('/action')}
          >
            <Camera size={16} /> 행동분석하기
          </button>
        </div>

        {/* 마음날씨 달력 */}
        <div className="clay-card" style={{padding: '20px', marginBottom: '20px'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
            <h3 style={{margin: 0, fontSize: '1.1rem'}}>마음날씨 달력</h3>
            <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
              <button style={{background:'none', border:'none', cursor:'pointer'}} onClick={prevMonth}><ChevronLeft size={20}/></button>
              <span style={{fontWeight:'bold', fontSize:'1.1rem'}}>{format(currentMonth, 'yyyy년 M월')}</span>
              <button style={{background:'none', border:'none', cursor:'pointer'}} onClick={nextMonth}><ChevronRight size={20}/></button>
            </div>
          </div>

          <div style={{display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '5px', textAlign: 'center', marginBottom: '10px'}}>
            {['일', '월', '화', '수', '목', '금', '토'].map(d => (
              <div key={d} style={{fontSize: '0.8rem', color: '#888', fontWeight: 'bold'}}>{d}</div>
            ))}
          </div>

          <div style={{display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '5px'}}>
            {days.map((day, i) => {
              const record = getRecordForDate(day);
              const isSelected = isSameDay(day, selectedDate);
              const isCurrentMonth = isSameMonth(day, monthStart);
              const isTodayDate = isToday(day);

              return (
                <div 
                  key={i} 
                  style={{
                    height: '50px', 
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    background: isSelected ? '#f3e8ff' : '#fff',
                    borderRadius: '8px', cursor: 'pointer',
                    opacity: isCurrentMonth ? 1 : 0.3,
                    border: isTodayDate ? '2px solid var(--primary)' : '1px solid #f0f0f0'
                  }}
                  onClick={() => setSelectedDate(day)}
                >
                  <span style={{fontSize: '0.8rem', fontWeight: isTodayDate ? 'bold' : 'normal', color: isSelected ? 'var(--primary)' : '#333'}}>
                    {format(day, 'd')}
                  </span>
                  <span style={{fontSize: '1.1rem', marginTop: '2px'}}>
                    {record ? record.weather : ''}
                  </span>
                </div>
              );
            })}
          </div>

          {/* 달력 선택 동작 (Q6.5 반영) */}
          <div style={{marginTop: '20px', paddingTop: '15px', borderTop: '1px solid #eee'}}>
            <p style={{margin: '0 0 10px 0', fontSize: '0.95rem', fontWeight: 'bold'}}>
              {format(selectedDate, 'yyyy년 M월 d일')}
            </p>
            {selectedRecord ? (
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8f9fa', padding: '12px 15px', borderRadius: '8px'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                  <span style={{fontSize: '1.5rem'}}>{selectedRecord.weather}</span>
                  <span style={{fontSize: '0.95rem', color: '#444'}}>기록이 있습니다.</span>
                </div>
                <button className="clay-btn secondary" style={{padding: '6px 12px', fontSize: '0.85rem'}} onClick={() => navigate(`/record-detail`)}>
                  상세 보기
                </button>
              </div>
            ) : (
              <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', background: '#f8f9fa', padding: '15px', borderRadius: '8px'}}>
                <span style={{fontSize: '0.9rem', color: '#666'}}>이 날의 마음날씨 기록이 없어요.</span>
                <button className="clay-btn" style={{padding: '8px 16px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '5px'}} onClick={() => navigate(`/write-record?date=${format(selectedDate, 'yyyy-MM-dd')}`)}>
                  <Plus size={16} /> 아이마음기록 남기기
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 세부 지표 그래프 (Q6.6 반영) */}
        <div className="clay-card" style={{padding: '20px', marginBottom: '20px'}}>
          <h3 style={{margin: '0 0 15px 0', fontSize: '1.1rem'}}>세부 지표 흐름</h3>
          
          <div style={{display: 'flex', gap: '10px', marginBottom: '20px', overflowX: 'auto', paddingBottom: '5px'}}>
            {['마음 안정 흐름', '놀이·교육 몰입 반응'].map(tab => (
              <button 
                key={tab}
                style={{
                  padding: '8px 16px', borderRadius: '20px', border: 'none',
                  background: activeChartTab === tab ? 'var(--primary)' : '#f0f0f0',
                  color: activeChartTab === tab ? '#fff' : '#666',
                  fontSize: '0.85rem', fontWeight: activeChartTab === tab ? 'bold' : 'normal',
                  cursor: 'pointer', whiteSpace: 'nowrap'
                }}
                onClick={() => setActiveChartTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div style={{height: '200px', width: '100%'}}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                <XAxis dataKey="name" tick={{fontSize: 12, fill: '#888'}} axisLine={false} tickLine={false} />
                <YAxis tick={{fontSize: 0}} axisLine={false} tickLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="var(--primary)" strokeWidth={3} dot={{r: 4, fill: 'var(--primary)'}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p style={{textAlign: 'center', fontSize: '0.8rem', color: '#888', marginTop: '10px'}}>* 최근 30일간의 변화 흐름입니다.</p>
        </div>

        {/* AI 분석결과 타임라인 (Q6.7 반영) */}
        <div className="clay-card" style={{padding: '20px', marginBottom: '20px'}}>
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px'}}>
            <h3 style={{margin: 0, fontSize: '1.1rem'}}>AI 분석결과 타임라인</h3>
          </div>
          
          {analysisResults.length === 0 ? (
            <div style={{textAlign: 'center', padding: '30px 0', color: '#999', fontSize: '0.9rem'}}>
              아직 저장된 분석결과가 없습니다.
            </div>
          ) : (
            <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
              {analysisResults.map(res => (
                <div key={res.analysisId} style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px', background: '#f8f9fa', borderRadius: '12px'}}>
                  <div>
                    <div style={{fontWeight: 'bold', fontSize: '1rem', color: '#333', marginBottom: '4px'}}>{res.analysisDate}</div>
                    <div style={{fontSize: '0.85rem', color: '#666', display: 'flex', alignItems: 'center', gap: '5px'}}>
                      <Play size={14} /> {res.videoType}
                    </div>
                  </div>
                  <button className="clay-btn secondary" style={{padding: '8px 12px', fontSize: '0.85rem'}} onClick={() => navigate(`/analysis-result`)}>
                    상세보기
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
};
