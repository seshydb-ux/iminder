import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Plus, Camera, Lock, Play } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// 1단계: 진입 로그인 (통합 화면)
export const Login = () => {
  const navigate = useNavigate();
  return (
    <div className="page-wrapper animate-fade-in" style={{display:'flex', flexDirection:'column', justifyContent:'center'}}>
      <div style={{textAlign:'center', marginBottom:'40px'}}>
        <h1 style={{color:'var(--primary)', fontSize:'2.5rem', margin:'0 0 10px 0'}}>i-minder</h1>
        <p style={{color:'var(--text-light)', margin:0}}>아이의 일상을 읽다, 마음을 잇다</p>
      </div>

      {/* 개인 사용자 영역 */}
      <div className="clay-card" style={{marginBottom:'20px', textAlign:'center'}}>
        <h3 style={{marginTop:0, marginBottom:'20px'}}>개인 사용자로 시작하기</h3>
        <div style={{display:'flex', flexDirection:'column', gap:'12px'}}>
          <button className="clay-btn" style={{background:'#FEE500', color:'#000'}} onClick={() => navigate('/home?type=personal')}>카카오로 시작하기</button>
          <button className="clay-btn" style={{background:'#03C75A', color:'#fff'}} onClick={() => navigate('/home?type=personal')}>네이버로 시작하기</button>
          <button className="clay-btn" style={{background:'#fff', color:'#000', border:'1px solid #ddd'}} onClick={() => navigate('/home?type=personal')}>구글로 시작하기</button>
        </div>
      </div>

      {/* 기관/교사용 영역 */}
      <div className="clay-card">
        <h3 style={{marginTop:0, marginBottom:'20px'}}>기관 또는 교사용 계정</h3>
        <input className="clay-input" type="text" placeholder="아이디 (이메일)" />
        <input className="clay-input" type="password" placeholder="비밀번호" />
        <button className="clay-btn" style={{width:'100%', marginBottom:'15px'}} onClick={() => navigate('/home?type=org')}>기관 계정 로그인</button>
        
        <div style={{display:'flex', justifyContent:'space-between', fontSize:'0.9rem'}}>
          <span style={{color:'var(--primary)', cursor:'pointer', fontWeight:'bold'}} onClick={() => navigate('/signup-form')}>기관 계정 가입 신청</span>
          <span style={{color:'var(--text-light)', cursor:'pointer'}}>아이디/비밀번호 찾기</span>
        </div>
      </div>
    </div>
  );
};

// 기관 계정 가입 신청 화면
export const SignupForm = () => {
  const navigate = useNavigate();
  return (
    <div className="page-wrapper animate-fade-in">
      <div style={{display:'flex', alignItems:'center', marginBottom:'20px'}}>
        <button className="clay-btn secondary" style={{padding:'8px', marginRight:'15px'}} onClick={() => navigate(-1)}><ChevronLeft/></button>
        <h2 style={{margin:0}}>기관 계정 가입 신청</h2>
      </div>
      <div className="clay-card" style={{marginTop:'20px'}}>
        <input className="clay-input" placeholder="기관명" />
        <input className="clay-input" placeholder="기관 유형 (예: 유치원, 어린이집)" />
        <input className="clay-input" placeholder="담당자 이름" />
        <input className="clay-input" placeholder="담당자 연락처" />
        <input className="clay-input" placeholder="사용할 아이디 (이메일)" />
        <input className="clay-input" type="password" placeholder="비밀번호" />
        
        <div style={{background:'#f5f5f4', padding:'15px', borderRadius:'12px', marginBottom:'16px', display:'flex', alignItems:'center', gap:'10px'}}>
          <input type="checkbox" id="consent" style={{width:'20px', height:'20px'}}/>
          <label htmlFor="consent" style={{fontSize:'0.9rem'}}>보호자 동의 체계 확인 여부 (필수)</label>
        </div>

        <button className="clay-btn" style={{width:'100%', marginTop:'10px'}} onClick={() => navigate('/org-block')}>가입 신청 완료</button>
      </div>
    </div>
  );
};

// 기관 계정 승인 대기 화면 (Block Screen)
export const OrgBlockScreen = () => {
  const navigate = useNavigate();
  return (
    <div className="page-wrapper animate-fade-in" style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center', textAlign:'center', minHeight:'100vh'}}>
      <div style={{fontSize:'60px', marginBottom:'20px'}}>⏳</div>
      <h2 style={{marginBottom:'10px'}}>현재 기관 계정 승인 심사 중입니다.</h2>
      <p style={{color:'var(--text-light)', marginBottom:'40px', lineHeight:'1.5'}}>
        승인이 완료되면 i-minder 대시보드와<br/>행동분석 기능을 사용할 수 있습니다.
      </p>
      
      <div style={{display:'flex', flexDirection:'column', gap:'15px', width:'100%'}}>
        <button className="clay-btn accent">승인 상태 확인하기</button>
        <button className="clay-btn secondary">마이페이지로 이동</button>
        <button className="clay-btn secondary">고객지원 문의하기</button>
        <button className="clay-btn secondary" style={{marginTop:'20px', background:'transparent', boxShadow:'none'}} onClick={() => navigate('/login')}>로그인 화면으로 돌아가기</button>
      </div>
    </div>
  );
};

// 2단계: 메인 홈
export const MainHome = () => {
  const navigate = useNavigate();
  const type = new URLSearchParams(window.location.search).get('type') || 'personal';
  const [showModal, setShowModal] = useState(false);
  const [children, setChildren] = useState([
    { id: 1, name: '김지훈', char: '🐶', isLocked: true, status: '정식등록' },
    ...(type === 'org' ? [{ id: 2, name: '이지민 (햇님반)', char: '🐱', isLocked: true, status: '보호자 동의 요청 중 (D-3)' }] : [])
  ]);

  return (
    <div className="page-wrapper animate-fade-in">
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'30px'}}>
        <h2>안녕하세요, {type === 'org' ? '햇님어린이집' : '지훈이 부모님'}! 👋</h2>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'20px'}}>
        {children.map(c => (
          <div key={c.id} className="clay-card" style={{textAlign:'center', cursor: c.status.includes('요청 중') ? 'not-allowed' : 'pointer', opacity: c.status.includes('요청 중') ? 0.7 : 1}} 
               onClick={() => !c.status.includes('요청 중') && navigate('/dashboard')}>
            <div style={{width:'80px', height:'80px', background:'#f3e8ff', borderRadius:'50%', margin:'0 auto 10px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'40px', position:'relative'}}>
              {c.char}
            </div>
            <h3 style={{margin:0}}>{c.name}</h3>
            {c.status.includes('요청 중') && (
              <p style={{margin:'10px 0 0', color:'#ef4444', fontSize:'0.8rem', fontWeight:'bold'}}>{c.status}</p>
            )}
          </div>
        ))}
      </div>

      <div style={{position:'fixed', bottom:'40px', right:'calc(50% - 220px)', zIndex:10, display:'flex', flexDirection:'column', alignItems:'flex-end'}}>
        <div className="bubble" style={{marginBottom:'15px', marginRight:'20px'}}>우리 아이를 등록해볼까요?</div>
        <button className="clay-btn accent" style={{borderRadius:'50%', width:'60px', height:'60px', padding:0, marginRight:'20px'}} onClick={() => setShowModal(true)}>
          <Plus size={30} />
        </button>
      </div>

      {showModal && (
        <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:100}}>
          <div className="clay-card animate-fade-in" style={{width:'90%', maxWidth:'400px'}}>
            <h3>{type === 'org' ? '아이 임시 등록' : '새로운 아이 등록'}</h3>
            <input className="clay-input" placeholder={type === 'org' ? "아이 표시명 (예: 지훈)" : "아이 이름"} />
            
            {type === 'org' ? (
              <>
                <input className="clay-input" placeholder="반 또는 그룹명" />
                <input className="clay-input" placeholder="보호자 연락처 (동의 요청용)" />
                <p style={{fontSize:'0.8rem', color:'#ef4444'}}>* 임시등록 후 보호자 동의가 완료되어야 생년월일이 확정되고 영상 분석이 가능합니다.</p>
              </>
            ) : (
              <>
                <input className="clay-input" type="number" placeholder="만 나이 (숫자)" />
                <input className="clay-input" placeholder="성별 (남/여)" />
                <p style={{fontSize:'0.8rem', color:'#ef4444'}}>* 아이의 생년월일과 성별은 분석 기준에 사용되는 핵심정보입니다. 정확한 분석을 위해 최초 등록 후 바로 수정할 수 없습니다.</p>
              </>
            )}

            <div style={{display:'flex', gap:'10px', marginTop:'20px'}}>
              <button className="clay-btn secondary" style={{flex:1}} onClick={() => setShowModal(false)}>취소</button>
              <button className="clay-btn" style={{flex:1}} onClick={() => { 
                setShowModal(false); 
                setChildren([...children, {id:3, name:'새로운아이', char:'🐻', isLocked: type==='personal', status: type==='org' ? '보호자 동의 요청 중 (D-7)' : '정식등록'}]); 
              }}>{type === 'org' ? '임시 등록' : '정식 등록'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// 3단계: Action Flow (영상 분석 2-Step)
export const ActionFlow = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0); // 0: 대기, 1: 전송중, 2: 분석중

  if (step === 1) {
    return (
      <div className="page-wrapper animate-fade-in" style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
        <h3>영상을 안전하게 전송 중입니다.</h3>
        <p style={{color:'#ef4444', fontWeight:'bold'}}>화면을 끄거나 종료하지 마세요.</p>
        <div style={{width:'100%', height:'20px', background:'#eee', borderRadius:'10px', overflow:'hidden', margin:'30px 0'}}>
          <div style={{width:'45%', height:'100%', background:'var(--primary)', transition:'width 1s'}}></div>
        </div>
        <p style={{fontSize:'0.8rem', color:'#999'}}>영상은 별도 저장되지 않습니다.</p>
        <button className="clay-btn secondary" style={{marginTop:'30px'}} onClick={() => setStep(2)}>[테스트] 전송 완료</button>
      </div>
    );
  }

  if (step === 2) {
    return (
      <div className="page-wrapper animate-fade-in" style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
        <div style={{width:'120px', height:'120px', background:'#f3e8ff', borderRadius:'24px', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'60px', marginBottom:'20px'}}>🐶</div>
        <h3 style={{textAlign:'center', lineHeight:'1.4'}}>접수가 완료되었습니다!<br/>분석이 끝나면 알려드릴 테니 앱을 닫으셔도 좋습니다.</h3>
        <div className="spinner"></div>
        <p style={{fontSize:'0.8rem', color:'#999', marginTop:'10px'}}>영상은 별도 저장되지 않습니다.</p>
        
        <div className="clay-card" style={{marginTop:'40px', width:'100%', textAlign:'center', cursor:'pointer'}} onClick={() => window.open('https://google.com', '_blank')}>
          <p style={{margin:0, fontWeight:'bold', color:'var(--primary)', marginBottom:'10px'}}>💡 연령 맞춤 큐레이션</p>
          <div style={{background:'#fef9c3', padding:'15px', borderRadius:'12px'}}>
            🧩 창의력 쑥쑥 블록 놀이 세트 (새 탭으로 열기)
          </div>
        </div>
        <button className="clay-btn" style={{marginTop:'30px'}} onClick={() => navigate('/analysis-result')}>[테스트] 분석 결과 보기</button>
      </div>
    );
  }

  return (
    <div className="page-wrapper animate-fade-in">
      <div style={{display:'flex', alignItems:'center', marginBottom:'30px'}}>
        <button className="clay-btn secondary" style={{padding:'8px', marginRight:'15px'}} onClick={() => navigate(-1)}><ChevronLeft/></button>
        <h2 style={{margin:0}}>행동 분석하기</h2>
      </div>
      <div className="clay-card" style={{textAlign:'center', padding:'40px 20px', cursor:'pointer'}} onClick={() => setStep(1)}>
        <Camera size={48} color="var(--primary)" style={{marginBottom:'20px'}}/>
        <h3 style={{margin:0}}>클릭하여 영상 업로드</h3>
        <p style={{fontSize:'0.9rem', color:'var(--text-light)', marginTop:'10px'}}>최소 3분 ~ 권장 10분의 아이 일상 영상을 올려주세요.<br/>영상은 별도 저장되지 않습니다.</p>
      </div>
    </div>
  );
};

// 3-2단계: AI 영상 분석 결과 (평가 배제)
export const AnalysisResult = () => {
  const navigate = useNavigate();
  return (
    <div className="page-wrapper animate-fade-in">
      <div style={{display:'flex', alignItems:'center', marginBottom:'20px'}}>
        <button className="clay-btn secondary" style={{padding:'8px', marginRight:'15px'}} onClick={() => navigate(-1)}><ChevronLeft/></button>
        <h2 style={{margin:0}}>분석 결과</h2>
      </div>

      <div className="clay-card" style={{marginBottom:'20px'}}>
        <h3>오늘의 마음상태 요약</h3>
        <p>전반적으로 긍정적이며, 조립 놀이에 높은 몰입 반응을 보였습니다.</p>
        <p style={{fontSize:'0.8rem', color:'#999', marginTop:'10px'}}>* 원본 영상은 안전하게 영구 파기되었습니다.</p>
      </div>

      <div className="clay-card" style={{marginBottom:'20px'}}>
        <h3>핵심 관찰 지표: 몰입 반응</h3>
        <div className="flow-bar">
          <div className="flow-indicator" style={{left:'80%'}}></div>
        </div>
        <p style={{fontSize:'0.9rem', color:'var(--text-main)', fontWeight:'bold'}}>충분히 관찰됨</p>
        <p style={{fontSize:'0.9rem', color:'var(--text-light)'}}>조립 놀이에 집중한 시간이 길게 관찰되었습니다.</p>
      </div>

      <div className="clay-card" style={{marginBottom:'20px'}}>
        <h3 style={{marginBottom:'15px'}}>오늘의 주요 관찰 장면 (타임라인)</h3>
        <div style={{borderLeft:'2px solid var(--primary)', paddingLeft:'15px', marginLeft:'10px'}}>
          <div style={{marginBottom:'15px', position:'relative'}}>
            <div style={{width:'12px', height:'12px', background:'var(--primary)', borderRadius:'50%', position:'absolute', left:'-22px', top:'4px'}}></div>
            <p style={{margin:0, fontWeight:'bold', color:'var(--primary)'}}>14:20</p>
            <p style={{margin:'5px 0 0', fontSize:'0.9rem'}}>블록을 높이 쌓으며 몰입 반응 관찰됨</p>
          </div>
          <div style={{position:'relative'}}>
            <div style={{width:'12px', height:'12px', background:'#fca5a5', borderRadius:'50%', position:'absolute', left:'-22px', top:'4px'}}></div>
            <p style={{margin:0, fontWeight:'bold', color:'#ef4444'}}>14:45</p>
            <p style={{margin:'5px 0 0', fontSize:'0.9rem'}}>블록이 무너지자 언어·의사소통을 통한 도움 요청</p>
          </div>
        </div>
      </div>

      <div className="clay-card" style={{marginBottom:'20px'}}>
        <h3>오늘의 추천 코칭 요약</h3>
        <div className="bubble" style={{width:'100%', boxSizing:'border-box'}}>
          아이가 완성한 블록에 대해 구체적인 칭찬을 해주어 성취감을 높여주세요. "우와, 정말 높이 쌓았네!" 처럼 반응해볼 수 있습니다.
        </div>
      </div>

      <div style={{display:'flex', gap:'10px'}}>
        <button className="clay-btn secondary" style={{flex:1}}>임시 저장</button>
        <button className="clay-btn" style={{flex:1}} onClick={() => navigate('/dashboard')}>기록 작성 가기</button>
      </div>
    </div>
  );
};

// 4단계: 마음 기록 대시보드 (Hidden Score)
export const Dashboard = () => {
  const navigate = useNavigate();
  
  const chartData = {
    labels: ['월', '화', '수', '목', '금', '토', '일'],
    datasets: [
      { label: '사회성', data: [3,4,4,5,4,5,5], borderColor: '#c4b5fd', tension: 0.4 },
      { label: '집중도', data: [4,5,3,4,5,4,5], borderColor: '#d9f99d', tension: 0.4 },
      { label: '마음 안정 흐름', data: [3,3,4,4,3,4,4], borderColor: '#fef08a', tension: 0.4 },
      { label: '자기조절 반응', data: [4,4,5,4,5,5,4], borderColor: '#fca5a5', tension: 0.4 },
      { label: '부모와의 상호작용', data: [3,4,3,5,4,4,5], borderColor: '#93c5fd', tension: 0.4 },
    ]
  };

  const chartOptions = {
    responsive: true,
    scales: {
      y: {
        min: 1,
        max: 5,
        ticks: {
          callback: function(value) {
            if(value === 1) return '관찰 필요';
            if(value === 3) return '보통';
            if(value === 5) return '충분히 관찰됨';
            return '';
          }
        }
      }
    }
  };

  return (
    <div className="page-wrapper animate-fade-in">
      {/* 1. 상단 아이 정보 영역 */}
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px'}}>
        <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
          <div style={{fontSize:'30px', background:'#f3e8ff', borderRadius:'50%', width:'50px', height:'50px', display:'flex', alignItems:'center', justifyContent:'center'}}>🐶</div>
          <div>
            <h2 style={{margin:0, fontSize:'1.2rem'}}>김지훈 <span style={{fontSize:'0.9rem', color:'var(--text-light)', fontWeight:'normal'}}>만 5세</span></h2>
            <p style={{margin:0, fontSize:'0.8rem', color:'var(--text-light)'}}>최근 기록: 오늘 | 날씨: ☀️ 맑음</p>
          </div>
        </div>
        <button className="clay-btn accent" style={{padding:'8px 12px', fontSize:'0.85rem'}} onClick={() => navigate('/action')}>
          <Play size={14}/> 행동분석하기
        </button>
      </div>

      {/* 2. 마음 기록 달력 영역 (월간 달력 형태 Mockup) */}
      <div className="clay-card" style={{marginBottom:'20px'}}>
        <h3 style={{marginBottom:'15px', marginTop:0}}>6월 마음 기록 달력</h3>
        <div style={{display:'grid', gridTemplateColumns:'repeat(7, 1fr)', gap:'5px', textAlign:'center'}}>
          {['일','월','화','수','목','금','토'].map(d => <div key={d} style={{fontSize:'0.8rem', color:'#999'}}>{d}</div>)}
          {/* 달력 날짜 Mockup */}
          {[...Array(30)].map((_, i) => {
            const date = i + 1;
            const hasRecord = [5, 12, 18, 20, 24].includes(date);
            const isToday = date === 24;
            return (
              <div key={date} 
                   onClick={() => hasRecord ? navigate('/record-detail') : navigate('/write-record')}
                   style={{
                     padding:'10px 0', 
                     cursor:'pointer',
                     borderRadius:'8px',
                     background: isToday ? 'var(--primary)' : 'transparent',
                     color: isToday ? '#fff' : 'var(--text-main)',
                     fontWeight: isToday ? 'bold' : 'normal',
                     border: hasRecord && !isToday ? '1px solid #e5e7eb' : 'none'
                   }}>
                <div>{date}</div>
                {hasRecord && <div style={{fontSize:'12px', marginTop:'2px'}}>{date%2===0 ? '☀️' : '⛅'}</div>}
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. 기간 선택 및 4. 세부 지표 꺾은선 그래프 영역 */}
      <div className="clay-card" style={{marginBottom:'20px'}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'15px'}}>
          <h3 style={{margin:0}}>주간 누적 지표 흐름</h3>
          <select className="clay-input" style={{width:'100px', padding:'8px', margin:0}}>
            <option>주간</option>
            <option>월간</option>
            <option>지정구간</option>
          </select>
        </div>
        <Line data={chartData} options={chartOptions} />
      </div>

      {/* 5. AI 분석 결과 타임라인 (누적 카드 구조) */}
      <div className="clay-card" style={{marginBottom:'20px'}}>
        <h3 style={{marginBottom:'15px', marginTop:0}}>최근 AI 분석 결과</h3>
        
        <div style={{display:'flex', flexDirection:'column', gap:'10px'}}>
          {/* 분석 카드 1 */}
          <div style={{background:'#f5f5f4', padding:'15px', borderRadius:'12px'}}>
            <div style={{display:'flex', justifyContent:'space-between', marginBottom:'10px'}}>
              <span style={{fontWeight:'bold', fontSize:'0.9rem', color:'var(--primary)'}}>2026.06.24 (자유놀이)</span>
              <span style={{fontSize:'0.8rem', color:'#999'}}>오후 2:30</span>
            </div>
            <p style={{margin:'0 0 5px', fontSize:'0.9rem'}}><strong>마음상태:</strong> 긍정적, 조립 놀이에 몰입</p>
            <p style={{margin:'0 0 10px', fontSize:'0.85rem', color:'var(--text-light)'}}><strong>코칭:</strong> 성취감을 높여주는 구체적 칭찬 필요</p>
            <button className="clay-btn secondary" style={{width:'100%', padding:'6px', fontSize:'0.85rem'}} onClick={() => navigate('/analysis-result')}>상세보기</button>
          </div>
          
          {/* 분석 카드 2 */}
          <div style={{background:'#f5f5f4', padding:'15px', borderRadius:'12px'}}>
            <div style={{display:'flex', justifyContent:'space-between', marginBottom:'10px'}}>
              <span style={{fontWeight:'bold', fontSize:'0.9rem', color:'var(--primary)'}}>2026.06.20 (식사시간)</span>
              <span style={{fontSize:'0.8rem', color:'#999'}}>오후 6:00</span>
            </div>
            <p style={{margin:'0 0 5px', fontSize:'0.9rem'}}><strong>마음상태:</strong> 다소 산만함, 자기조절 필요</p>
            <p style={{margin:'0 0 10px', fontSize:'0.85rem', color:'var(--text-light)'}}><strong>코칭:</strong> 식사에 집중할 수 있는 환경 조성</p>
            <button className="clay-btn secondary" style={{width:'100%', padding:'6px', fontSize:'0.85rem'}} onClick={() => navigate('/analysis-result')}>상세보기</button>
          </div>
        </div>
      </div>

      {/* 6. 부모 작성 아이마음기록 영역 (요약 + 작성 버튼) */}
      <div className="clay-card" style={{marginBottom:'20px'}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'10px'}}>
          <h3 style={{margin:0}}>최근 아이마음 기록</h3>
          <button className="clay-btn" style={{padding:'6px 12px', fontSize:'0.85rem'}} onClick={() => navigate('/write-record')}>+ 새 기록 남기기</button>
        </div>
        <div style={{background:'#fff9c4', padding:'12px', borderRadius:'8px', fontSize:'0.9rem'}}>
          <p style={{margin:0, color:'#854d0e'}}><strong>6월 24일:</strong> 유치원 다녀와서 블록을 정말 높게 쌓았다. 칭찬해주니 활짝 웃었다.</p>
        </div>
      </div>

      {/* 7. 코칭 수행기록 영역 */}
      <div className="clay-card">
        <h3 style={{marginBottom:'10px', marginTop:0}}>최근 코칭 수행 내역</h3>
        <p style={{fontSize:'0.9rem', color:'var(--text-main)', margin:0}}>✅ 아이가 도움을 요청할 때 즉각 칭찬해주기 (6/24 완료)</p>
        <p style={{fontSize:'0.9rem', color:'var(--text-light)', margin:'5px 0 0'}}>이번 주 총 3개의 코칭을 실천하셨네요! 훌륭합니다.</p>
      </div>
    </div>
  );
};

// [새화면] 오늘의 아이마음기록 작성 화면
export const WriteRecord = () => {
  const navigate = useNavigate();
  return (
    <div className="page-wrapper animate-fade-in">
      <div style={{display:'flex', alignItems:'center', marginBottom:'20px'}}>
        <button className="clay-btn secondary" style={{padding:'8px', marginRight:'15px'}} onClick={() => navigate(-1)}><ChevronLeft/></button>
        <h2 style={{margin:0}}>아이마음 기록 남기기</h2>
      </div>

      <div className="clay-card" style={{marginBottom:'20px'}}>
        <h3 style={{marginTop:0}}>날짜 및 마음날씨 선택</h3>
        <input type="date" className="clay-input" defaultValue="2026-06-24" />
        <div style={{display:'flex', gap:'10px', marginTop:'10px'}}>
          <button className="clay-btn accent" style={{flex:1, fontSize:'24px', background:'var(--primary)'}}>☀️</button>
          <button className="clay-btn secondary" style={{flex:1, fontSize:'24px', background:'#f5f5f4'}}>⛅</button>
          <button className="clay-btn secondary" style={{flex:1, fontSize:'24px', background:'#f5f5f4'}}>☁️</button>
          <button className="clay-btn secondary" style={{flex:1, fontSize:'24px', background:'#f5f5f4'}}>🌧️</button>
        </div>
      </div>

      <div className="clay-card" style={{marginBottom:'20px'}}>
        <h3 style={{marginTop:0}}>오늘 하루는 어땠나요? (오늘의 일기)</h3>
        <textarea className="clay-input" rows="4" placeholder="아이의 기분이나 주요 행동을 일기처럼 자유롭게 적어보세요."></textarea>
      </div>

      <div className="clay-card" style={{marginBottom:'20px'}}>
        <h3 style={{marginTop:0}}>오늘 있었던 일 / 메모</h3>
        <textarea className="clay-input" rows="3" placeholder="기억하고 싶은 사건이나 코멘트 등..."></textarea>
      </div>

      <div className="clay-card" style={{marginBottom:'20px'}}>
        <h3 style={{marginTop:0}}>오늘의 코칭 수행 기록 점수 (선택)</h3>
        <select className="clay-input">
          <option>5점 (매우 잘 실천함)</option>
          <option>4점 (잘 실천함)</option>
          <option>3점 (보통)</option>
          <option>2점 (조금 부족함)</option>
          <option>1점 (실천하지 못함)</option>
        </select>
        <div style={{background:'#f5f5f4', padding:'15px', borderRadius:'12px', marginTop:'10px'}}>
          <p style={{margin:'0 0 10px', fontWeight:'bold', fontSize:'0.9rem'}}>오늘의 추천 코칭 복기</p>
          <div style={{display:'flex', alignItems:'center', gap:'10px', marginBottom:'5px'}}>
            <input type="checkbox" id="c1" style={{width:'18px', height:'18px'}}/>
            <label htmlFor="c1" style={{fontSize:'0.9rem'}}>아이가 먼저 도움을 요청할 때 즉각 칭찬해주었나요?</label>
          </div>
        </div>
      </div>

      <button className="clay-btn" style={{width:'100%'}} onClick={() => navigate('/dashboard')}>기록 저장하기</button>
    </div>
  );
};

// [새화면] 아이마음기록 상세화면 (기록 있는 날짜 클릭 시)
export const RecordDetail = () => {
  const navigate = useNavigate();
  return (
    <div className="page-wrapper animate-fade-in">
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'20px'}}>
        <div style={{display:'flex', alignItems:'center'}}>
          <button className="clay-btn secondary" style={{padding:'8px', marginRight:'15px'}} onClick={() => navigate(-1)}><ChevronLeft/></button>
          <h2 style={{margin:0}}>기록 상세</h2>
        </div>
        <div style={{fontSize:'0.9rem', color:'var(--text-light)', cursor:'pointer'}}>수정 | 삭제</div>
      </div>

      <div className="clay-card" style={{marginBottom:'20px', textAlign:'center'}}>
        <div style={{fontSize:'50px', marginBottom:'10px'}}>☀️</div>
        <h2 style={{margin:'0 0 5px'}}>2026년 6월 24일</h2>
        <p style={{margin:0, color:'var(--text-light)'}}>오늘의 마음날씨: 맑음</p>
      </div>

      <div className="clay-card" style={{marginBottom:'20px'}}>
        <h3 style={{marginTop:0, color:'var(--primary)'}}>오늘의 일기</h3>
        <p style={{lineHeight:'1.6', margin:0}}>
          유치원에 다녀와서 블록 놀이를 정말 열심히 했다. 
          혼자서 엄청 높게 쌓더니 무너지니까 조금 짜증을 냈는데,
          도와달라고 말할 때까지 기다렸다가 같이 쌓아주니 금세 다시 웃음을 찾았다.
        </p>
      </div>

      <div className="clay-card" style={{marginBottom:'20px'}}>
        <h3 style={{marginTop:0, color:'var(--primary)'}}>오늘 있었던 일 / 메모</h3>
        <p style={{lineHeight:'1.6', margin:0}}>
          오후 간식으로 준 고구마를 안 먹고 투정을 부렸다.
          간식 시간 규칙을 조금 더 명확히 해줘야겠다.
        </p>
      </div>

      <div className="clay-card">
        <h3 style={{marginTop:0}}>연결된 코칭 정보</h3>
        <div style={{background:'#fef9c3', padding:'15px', borderRadius:'12px'}}>
          <p style={{margin:'0 0 5px', fontWeight:'bold', color:'#854d0e'}}>수행 점수: 5점 (매우 잘 실천함)</p>
          <p style={{margin:0, fontSize:'0.9rem', color:'#854d0e'}}>
            ✅ 아이가 먼저 도움을 요청할 때 즉각 칭찬해주었나요?
          </p>
        </div>
      </div>
    </div>
  );
};
