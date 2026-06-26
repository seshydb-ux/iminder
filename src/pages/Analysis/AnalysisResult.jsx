import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronDown, ChevronUp, MoreVertical, MessageCircle, EyeOff, Bookmark, Edit3, Trash2 } from 'lucide-react';
import { AppShell } from '../../components/layout/AppShell';

export const AnalysisResult = () => {
  const navigate = useNavigate();

  // 더미 상태 관리
  const [coachingExpanded, setCoachingExpanded] = useState(false);
  const [expandedMetrics, setExpandedMetrics] = useState({});
  const [menuOpenScene, setMenuOpenScene] = useState(null);
  const [hiddenScenes, setHiddenScenes] = useState([]);
  const [consultScenes, setConsultScenes] = useState(['scene_001']); // 상담 참고용으로 표시된 장면들
  const [sceneMemos, setSceneMemos] = useState({});
  const [editingMemo, setEditingMemo] = useState(null);
  const [memoText, setMemoText] = useState('');

  // 외부 클릭 시 더보기 메뉴 닫기 처리
  useEffect(() => {
    const handleClickOutside = () => setMenuOpenScene(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // 더미 데이터 세팅
  const mindSummary = "블록 놀이를 진행하며 전반적으로 밝고 편안한 표정이 주로 관찰되었습니다. 장난감이 마음대로 조립되지 않을 때 잠시 소리를 지르는 불편한 반응이 보였으나, 곧 스스로 다른 블록을 찾아 시도하며 안정을 찾았습니다.";
  
  const coreMetrics = [
    {
      id: 'metric_1',
      title: '마음 안정 흐름',
      indicator: '비교적 안정적', // 보라색 알약
      colorLevel: 2, // 1: 왼쪽 연노랑, 2: 중간 노랑/연두, 3: 오른쪽 진초록
      desc: '활동 중 시선과 자세가 비교적 안정적으로 유지되었어요.',
      reasons: [
        '조립 활동을 일정 시간 유지했어요.',
        '실패 후 다시 시도하는 행동이 확인되었어요.'
      ],
      details: [
        '분석된 주요 놀이 구간: 약 12분 30초',
        '조립 활동 유지 구간: 약 7분 10초',
        '실패 후 재시도 행동: 2회'
      ]
    },
    {
      id: 'metric_2',
      title: '놀이·교육 몰입 반응',
      indicator: '증가 경향', 
      colorLevel: 3, 
      desc: '이전 기록 대비 놀이에 몰입하는 시간이 눈에 띄게 늘어났어요.',
      reasons: [
        '같은 활동으로 다시 돌아오는 모습이 관찰되었어요.',
        '만 5~7세 관찰 기준과 이전 기록 흐름을 함께 참고했어요.'
      ],
      details: [
        '같은 활동으로 다시 돌아온 횟수: 3회',
        '활동 전환 시 멈춤 반응: 1회 관찰'
      ]
    }
  ];

  const timelineScenes = [
    {
      id: 'scene_001',
      time: '01:35 부근',
      tag: '몰입',
      level: '일정 시간 관찰됨',
      sentence: '블록을 쌓아 올리며 집중하는 모습이 일정 시간 관찰되었습니다.',
    },
    {
      id: 'scene_002',
      time: '05:12 부근',
      tag: '안정 회복',
      level: '짧은 시간 뒤 안정됨',
      sentence: '블록이 무너진 뒤 소리를 냈으나 스스로 다른 모양을 만들며 짧은 시간 뒤 안정되었습니다.',
    },
    {
      id: 'scene_003',
      time: '11:40 부근',
      tag: '상호작용',
      level: '반응이 이어짐',
      sentence: '보호자가 이름을 부른 뒤 눈을 맞추며 웃는 모습이 관찰되었습니다.',
    }
  ];

  const todayReaction = "보호자가 곁에서 가볍게 지켜봐 줄 때 스스로 블록 놀이에 깊게 몰입하며 가장 편안하게 반응했습니다.";
  
  const coaching = {
    summary: "아이가 스스로 몰입할 때는 지켜봐주고, 끝난 뒤 구체적인 행동을 칭찬해주세요.",
    details: [
      { q: '왜 이 코칭이 추천되었나요?', a: '아이가 스스로 문제를 해결하고 안정을 찾는 긍정적 회복 탄력성을 보였기 때문이에요.' },
      { q: '연결된 주요 관찰 장면', a: '05:12 부근 블록이 무너진 뒤 스스로 다른 모양을 만들며 안정을 찾은 장면' },
      { q: '이렇게 말해보세요', a: '"혼자서 포기하지 않고 다른 모양으로 멋지게 만들었네!"' },
      { q: '피하면 좋은 표현', a: '"거봐, 엄마가 도와준다고 했지?" 처럼 아이의 성취감을 뺏는 말은 피해주세요.' },
      { q: '오늘 해볼 실천', a: '아이가 놀이에 집중할 때 5분 이상 개입 없이 지켜보기' }
    ]
  };

  const toggleMetric = (id, type) => {
    setExpandedMetrics(prev => ({
      ...prev,
      [`${id}_${type}`]: !prev[`${id}_${type}`]
    }));
  };

  const toggleConsult = (id) => {
    if (consultScenes.includes(id)) {
      setConsultScenes(prev => prev.filter(s => s !== id));
      alert('상담 참고용 표시가 해제되었어요.'); // 임시 토스트 대체
    } else {
      setConsultScenes(prev => [...prev, id]);
      alert('상담 참고용으로 표시했어요.');
    }
  };

  const hideScene = (id) => {
    setHiddenScenes(prev => [...prev, id]);
    // 상담 표시 해제 연동
    setConsultScenes(prev => prev.filter(s => s !== id));
  };

  const showScene = (id) => {
    setHiddenScenes(prev => prev.filter(s => s !== id));
    alert('장면이 다시 표시되었어요.');
  };

  const saveMemo = (id) => {
    setSceneMemos(prev => ({ ...prev, [id]: memoText }));
    setEditingMemo(null);
    setMemoText('');
  };

  const deleteMemo = (id) => {
    const newMemos = {...sceneMemos};
    delete newMemos[id];
    setSceneMemos(newMemos);
  };

  const visibleScenes = timelineScenes.filter(s => !hiddenScenes.includes(s.id));
  const hiddenScenesData = timelineScenes.filter(s => hiddenScenes.includes(s.id));

  return (
    <AppShell>
      <div className="page-wrapper animate-fade-in" style={{padding: '20px 20px 100px 20px', minHeight: '100vh', background: 'var(--bg-color)'}}>
        
        {/* 헤더 */}
        <div style={{display:'flex', alignItems:'center', marginBottom:'20px'}}>
          <button className="clay-btn secondary" style={{padding:'8px', marginRight:'15px'}} onClick={() => navigate('/dashboard')}>
            <ChevronLeft size={20} />
          </button>
          <h2 style={{margin:0, fontSize:'1.4rem'}}>분석 상세보기</h2>
        </div>

        {/* 1. 오늘의 마음상태 요약 */}
        <div className="clay-card" style={{padding: '20px', marginBottom: '20px', background: '#f8f9fa'}}>
          <h3 style={{margin: '0 0 10px 0', fontSize: '1.1rem', color: 'var(--primary)'}}>오늘의 마음상태 요약</h3>
          <p style={{margin: 0, fontSize: '0.95rem', color: '#333', lineHeight: '1.6'}}>
            {mindSummary}
          </p>
        </div>

        {/* 2. 핵심 관찰 지표 */}
        <div className="clay-card" style={{padding: '20px', marginBottom: '20px'}}>
          <h3 style={{margin: '0 0 20px 0', fontSize: '1.1rem'}}>핵심 관찰 지표</h3>
          <div style={{display: 'flex', flexDirection: 'column', gap: '25px'}}>
            {coreMetrics.map(metric => (
              <div key={metric.id}>
                <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px'}}>
                  <span style={{fontSize: '1rem', fontWeight: 'bold'}}>{metric.title}</span>
                  <span style={{background: '#e0e7ff', color: '#166534', padding: '4px 10px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold'}}>
                    {metric.indicator}
                  </span>
                </div>
                
                {/* 색흐름막대 */}
                <div style={{display:'flex', height:'8px', borderRadius:'4px', overflow:'hidden', marginBottom:'10px', background:'#eee'}}>
                  <div style={{flex:1, background: metric.colorLevel >= 1 ? '#fef08a' : 'transparent'}}></div>
                  <div style={{flex:1, background: metric.colorLevel >= 2 ? '#bef264' : 'transparent'}}></div>
                  <div style={{flex:1, background: metric.colorLevel === 3 ? '#22c55e' : 'transparent'}}></div>
                </div>

                <p style={{margin: '0 0 10px 0', fontSize: '0.9rem', color: '#444'}}>{metric.desc}</p>

                <div style={{display:'flex', gap:'10px', marginTop:'10px'}}>
                  <button className="clay-btn secondary" style={{flex:1, padding:'8px', fontSize:'0.85rem'}} onClick={() => toggleMetric(metric.id, 'reasons')}>
                    점수 근거 보기 {expandedMetrics[`${metric.id}_reasons`] ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}
                  </button>
                  <button className="clay-btn secondary" style={{flex:1, padding:'8px', fontSize:'0.85rem'}} onClick={() => toggleMetric(metric.id, 'details')}>
                    상세 관찰값 펼치기 {expandedMetrics[`${metric.id}_details`] ? <ChevronUp size={14}/> : <ChevronDown size={14}/>}
                  </button>
                </div>

                {expandedMetrics[`${metric.id}_reasons`] && (
                  <div className="animate-fade-in" style={{background:'#f8f9fa', padding:'15px', borderRadius:'8px', marginTop:'10px'}}>
                    <ul style={{margin:0, paddingLeft:'20px', fontSize:'0.85rem', color:'#555', lineHeight:'1.5'}}>
                      {metric.reasons.map((r, i) => <li key={i}>{r}</li>)}
                    </ul>
                  </div>
                )}
                
                {expandedMetrics[`${metric.id}_details`] && (
                  <div className="animate-fade-in" style={{background:'#f8f9fa', padding:'15px', borderRadius:'8px', marginTop:'10px'}}>
                    <ul style={{margin:0, paddingLeft:'20px', fontSize:'0.85rem', color:'#555', lineHeight:'1.5'}}>
                      {metric.details.map((d, i) => <li key={i}>{d}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 3. 주요 관찰 장면 타임라인 */}
        <div style={{marginBottom: '20px'}}>
          <h3 style={{margin: '0 0 15px 0', fontSize: '1.1rem', paddingLeft:'5px'}}>주요 관찰 장면 타임라인</h3>
          <div style={{display:'flex', flexDirection:'column', gap:'15px'}}>
            {visibleScenes.length === 0 ? (
              <div style={{textAlign:'center', padding:'30px', color:'#999', background:'#fff', borderRadius:'12px', border:'1px solid #eee'}}>
                표시할 장면이 없습니다.
              </div>
            ) : (
              visibleScenes.map(scene => (
                <div key={scene.id} className="clay-card" style={{padding:'20px', position:'relative'}}>
                  
                  {/* 상담 스티커 */}
                  {consultScenes.includes(scene.id) && (
                    <div 
                      style={{position:'absolute', top:'-10px', right:'15px', background:'#f3e8ff', color:'var(--primary)', padding:'6px 12px', borderRadius:'8px', fontSize:'0.8rem', fontWeight:'bold', border:'1px solid var(--primary)', cursor:'pointer', boxShadow:'0 2px 4px rgba(0,0,0,0.1)'}}
                      onClick={() => toggleConsult(scene.id)}
                    >
                      상담 참고용
                    </div>
                  )}

                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'10px'}}>
                    <div>
                      <span style={{fontSize:'0.85rem', color:'#888', fontWeight:'bold'}}>{scene.time}</span>
                      <div style={{display:'flex', gap:'5px', marginTop:'5px'}}>
                        <span style={{background:'#eee', padding:'4px 8px', borderRadius:'4px', fontSize:'0.75rem'}}>{scene.tag}</span>
                        <span style={{background:'#e0f2fe', color:'#166534', padding:'4px 8px', borderRadius:'4px', fontSize:'0.75rem'}}>{scene.level}</span>
                      </div>
                    </div>
                    
                    {/* 더보기 메뉴 */}
                    <div style={{position:'relative'}}>
                      <button 
                        style={{background:'none', border:'none', cursor:'pointer', padding:'5px'}} 
                        onClick={(e) => { e.stopPropagation(); setMenuOpenScene(scene.id); }}
                      >
                        <MoreVertical size={18} color="#666" />
                      </button>
                      {menuOpenScene === scene.id && (
                        <div className="animate-fade-in" style={{position:'absolute', right:0, top:'30px', background:'#fff', border:'1px solid #eee', borderRadius:'8px', boxShadow:'0 4px 12px rgba(0,0,0,0.1)', zIndex:10, minWidth:'150px', overflow:'hidden'}}>
                          {consultScenes.includes(scene.id) ? (
                            <div style={{padding:'12px', fontSize:'0.85rem', cursor:'pointer', borderBottom:'1px solid #f0f0f0'}} onClick={(e) => { e.stopPropagation(); toggleConsult(scene.id); setMenuOpenScene(null); }}>
                              상담 참고용 해제
                            </div>
                          ) : (
                            <div style={{padding:'12px', fontSize:'0.85rem', cursor:'pointer', borderBottom:'1px solid #f0f0f0'}} onClick={(e) => { e.stopPropagation(); toggleConsult(scene.id); setMenuOpenScene(null); }}>
                              상담 참고용으로 표시
                            </div>
                          )}
                          <div style={{padding:'12px', fontSize:'0.85rem', color:'#ef4444', cursor:'pointer'}} onClick={(e) => { e.stopPropagation(); hideScene(scene.id); setMenuOpenScene(null); }}>
                            이 장면 숨기기
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <p style={{margin:'0 0 15px 0', fontSize:'0.95rem', color:'#333', lineHeight:'1.5'}}>{scene.sentence}</p>

                  {/* 보호자 메모 영역 */}
                  {sceneMemos[scene.id] ? (
                    <div style={{background:'#fefced', padding:'15px', borderRadius:'8px', position:'relative'}}>
                      <div style={{display:'flex', alignItems:'center', gap:'5px', marginBottom:'5px'}}>
                        <MessageCircle size={14} color="#ca8a04" />
                        <span style={{fontSize:'0.8rem', fontWeight:'bold', color:'#ca8a04'}}>보호자 메모</span>
                      </div>
                      <p style={{margin:0, fontSize:'0.85rem', color:'#854d0e', lineHeight:'1.5'}}>{sceneMemos[scene.id]}</p>
                      <div style={{position:'absolute', top:'10px', right:'10px', display:'flex', gap:'5px'}}>
                        <button style={{background:'none', border:'none', cursor:'pointer'}} onClick={() => { setMemoText(sceneMemos[scene.id]); setEditingMemo(scene.id); }}><Edit3 size={14} color="#ca8a04"/></button>
                        <button style={{background:'none', border:'none', cursor:'pointer'}} onClick={() => deleteMemo(scene.id)}><Trash2 size={14} color="#ef4444"/></button>
                      </div>
                    </div>
                  ) : editingMemo === scene.id ? (
                    <div style={{marginTop:'10px'}}>
                      <textarea 
                        className="clay-input" 
                        placeholder="이 장면에 대한 메모를 남겨주세요 (최대 300자)"
                        style={{height:'80px', resize:'none', fontSize:'0.85rem'}}
                        value={memoText}
                        onChange={(e) => setMemoText(e.target.value)}
                        maxLength={300}
                      />
                      <div style={{display:'flex', gap:'10px'}}>
                        <button className="clay-btn secondary" style={{flex:1, padding:'6px'}} onClick={() => { setEditingMemo(null); setMemoText(''); }}>취소</button>
                        <button className="clay-btn accent" style={{flex:1, padding:'6px'}} onClick={() => saveMemo(scene.id)}>저장</button>
                      </div>
                    </div>
                  ) : (
                    <button 
                      className="clay-btn secondary" 
                      style={{width:'100%', padding:'10px', fontSize:'0.85rem', display:'flex', alignItems:'center', justifyContent:'center', gap:'5px', background:'#f8f9fa', border:'1px dashed #ccc'}}
                      onClick={() => { setEditingMemo(scene.id); setMemoText(''); }}
                    >
                      <MessageCircle size={16}/> 메모 추가하기
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* 4. 숨긴 장면 보기 */}
        {hiddenScenesData.length > 0 && (
          <div className="clay-card" style={{padding: '15px 20px', marginBottom: '20px', background:'#f8f9fa'}}>
            <div 
              style={{display:'flex', justifyContent:'space-between', alignItems:'center', cursor:'pointer'}}
              onClick={() => setExpandedMetrics(prev => ({...prev, hiddenScenes: !prev.hiddenScenes}))}
            >
              <span style={{fontSize:'0.95rem', color:'#666', display:'flex', alignItems:'center', gap:'5px'}}>
                <EyeOff size={16}/> 숨긴 장면 {hiddenScenesData.length}개 보기
              </span>
              {expandedMetrics.hiddenScenes ? <ChevronUp size={16} color="#666"/> : <ChevronDown size={16} color="#666"/>}
            </div>

            {expandedMetrics.hiddenScenes && (
              <div className="animate-fade-in" style={{marginTop:'15px', display:'flex', flexDirection:'column', gap:'10px'}}>
                {hiddenScenesData.map(scene => (
                  <div key={scene.id} style={{background:'#fff', border:'1px solid #eee', borderRadius:'8px', padding:'15px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                    <div>
                      <span style={{fontSize:'0.8rem', color:'#999'}}>{scene.time}</span>
                      <p style={{margin:'5px 0 0 0', fontSize:'0.85rem', color:'#666'}}>{scene.sentence}</p>
                    </div>
                    <button className="clay-btn secondary" style={{padding:'6px 12px', fontSize:'0.8rem', whiteSpace:'nowrap'}} onClick={() => showScene(scene.id)}>
                      다시 표시
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 5. 오늘 관찰된 놀이/교육 반응 */}
        <div className="clay-card" style={{padding: '20px', marginBottom: '20px'}}>
          <h3 style={{margin: '0 0 10px 0', fontSize: '1.1rem'}}>오늘 관찰된 놀이·교육 반응</h3>
          <p style={{margin: 0, fontSize: '0.95rem', color: '#444', lineHeight: '1.6'}}>
            {todayReaction}
          </p>
        </div>

        {/* 6. 오늘의 추천 코칭 요약 */}
        <div className="clay-card" style={{padding: '20px', marginBottom: '30px', border: '2px solid #f3e8ff'}}>
          <h3 style={{margin: '0 0 15px 0', fontSize: '1.1rem', color: 'var(--primary)', display:'flex', alignItems:'center', gap:'8px'}}>
            <Bookmark size={20} fill="var(--primary)" /> 오늘의 추천 코칭 요약
          </h3>
          <p style={{margin: '0 0 15px 0', fontSize: '0.95rem', color: '#333', lineHeight: '1.6'}}>
            {coaching.summary}
          </p>
          
          {coachingExpanded ? (
            <div className="animate-fade-in" style={{background:'#fdfcff', borderRadius:'12px', padding:'20px', border:'1px solid #f3e8ff', position:'relative'}}>
              <div style={{position:'absolute', top:'-10px', left:'30px', width:'20px', height:'20px', background:'#fdfcff', borderTop:'1px solid #f3e8ff', borderLeft:'1px solid #f3e8ff', transform:'rotate(45deg)'}}></div>
              
              <div style={{display:'flex', flexDirection:'column', gap:'20px', position:'relative', zIndex:1}}>
                {coaching.details.map((item, idx) => (
                  <div key={idx}>
                    <span style={{fontSize:'0.85rem', color:'var(--primary)', fontWeight:'bold', display:'block', marginBottom:'5px'}}>{item.q}</span>
                    <p style={{margin:0, fontSize:'0.9rem', color:'#444', lineHeight:'1.5'}}>{item.a}</p>
                  </div>
                ))}
              </div>

              <button className="clay-btn secondary" style={{width:'100%', marginTop:'20px', padding:'10px'}} onClick={() => setCoachingExpanded(false)}>
                코칭 상세 접기 <ChevronUp size={16} style={{verticalAlign:'middle'}}/>
              </button>
            </div>
          ) : (
            <button className="clay-btn secondary" style={{width:'100%', padding:'12px'}} onClick={() => setCoachingExpanded(true)}>
              코칭 상세 말풍선 펼쳐보기 <ChevronDown size={16} style={{verticalAlign:'middle'}}/>
            </button>
          )}
        </div>

        {/* 7. 하단 실행 버튼 영역 */}
        <div style={{display:'flex', flexDirection:'column', gap:'10px'}}>
          <button className="clay-btn accent" style={{padding:'16px', fontSize:'1rem', display:'flex', alignItems:'center', justifyContent:'center', gap:'5px'}} onClick={() => navigate('/write-record')}>
            <Edit3 size={18} /> 오늘의 아이마음기록 작성하기
          </button>
          <button className="clay-btn secondary" style={{padding:'14px', fontSize:'0.95rem'}} onClick={() => navigate('/dashboard')}>
            i-minder 대시보드에서 보기
          </button>
          <button style={{background:'none', border:'none', color:'#ef4444', textDecoration:'underline', padding:'10px', marginTop:'10px', cursor:'pointer'}} onClick={() => alert('분석결과 삭제 기능(휴지통 이동) 실행')}>
            분석결과 삭제
          </button>
        </div>

      </div>
    </AppShell>
  );
};
