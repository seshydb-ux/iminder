import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, LogOut, Trash2, ArrowLeft } from 'lucide-react';
import { AppShell } from '../../components/layout/AppShell';
import { AuthContext } from '../../contexts';

export const MyPage = () => {
  const navigate = useNavigate();
  const { authUser, setAuthUser } = useContext(AuthContext);
  
  const [viewTrash, setViewTrash] = useState(false);
  const [deletedProfiles, setDeletedProfiles] = useState([
    { id: 'del_1', name: '이하준', date: '2026-06-15' }
  ]);
  const [targetToDelete, setTargetToDelete] = useState(null);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('authUser');
    setAuthUser(null);
    navigate('/');
  };

  const handlePermanentDelete = () => {
    if (deleteConfirmText === '삭제하겠습니다.') {
      setDeletedProfiles(prev => prev.filter(p => p.id !== targetToDelete));
      setTargetToDelete(null);
      setDeleteConfirmText('');
      alert('영구 삭제되었습니다.');
    }
  };

  // 휴지통 화면 (Q100.1 ~ Q103.2 반영)
  if (viewTrash) {
    return (
      <div className="page-wrapper animate-fade-in" style={{padding: '20px', minHeight: '100vh', background: 'var(--bg-color)'}}>
        <div style={{display:'flex', alignItems:'center', marginBottom:'30px'}}>
          <button className="clay-btn secondary" style={{padding:'8px', marginRight:'15px'}} onClick={() => setViewTrash(false)}><ArrowLeft/></button>
          <h2 style={{margin:0, fontSize:'1.4rem'}}>휴지통</h2>
        </div>

        {deletedProfiles.length === 0 ? (
          <div style={{textAlign:'center', marginTop:'50px', color:'#999'}}>
            <Trash2 size={48} style={{opacity:0.3, marginBottom:'10px'}} />
            <p>휴지통이 비어있습니다.</p>
          </div>
        ) : (
          <div>
            <p style={{fontSize:'0.85rem', color:'#666', marginBottom:'20px'}}>
              * 삭제된 아이 프로필은 30일 후 자동 영구 삭제됩니다.
            </p>
            {deletedProfiles.map(p => (
              <div key={p.id} className="clay-card" style={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:'20px', marginBottom:'15px'}}>
                <div>
                  <h3 style={{margin:'0 0 5px 0', fontSize:'1.1rem'}}>{p.name}</h3>
                  <span style={{fontSize:'0.8rem', color:'#999'}}>삭제일: {p.date}</span>
                </div>
                <button className="clay-btn" style={{padding:'6px 12px', fontSize:'0.85rem', background:'#ef4444', color:'#fff'}} onClick={() => setTargetToDelete(p.id)}>
                  영구 삭제
                </button>
              </div>
            ))}
          </div>
        )}

        {/* 영구 삭제 더블 체크 모달 */}
        {targetToDelete && (
          <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.6)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000}}>
            <div className="clay-card animate-fade-in" style={{width:'90%', maxWidth:'320px', padding:'25px'}}>
              <h3 style={{marginTop:0, color:'#ef4444', textAlign:'center'}}>영구 삭제 경고</h3>
              <p style={{fontSize:'0.9rem', color:'#333', lineHeight:'1.5', textAlign:'center'}}>
                영구 삭제 시, 해당 아이의 <strong>모든 기록과 분석 데이터가 즉시 파기</strong>되며 절대 복구할 수 없습니다.
              </p>
              
              <div style={{background:'#f5f5f5', padding:'15px', borderRadius:'8px', margin:'20px 0'}}>
                <p style={{margin:'0 0 10px 0', fontSize:'0.85rem', color:'#666', textAlign:'center'}}>
                  확인을 위해 아래 문구를 정확히 입력해 주세요.<br/>
                  <strong style={{color:'#000', fontSize:'1rem'}}>'삭제하겠습니다.'</strong> (마침표 포함)
                </p>
                <input 
                  type="text" 
                  className="clay-input" 
                  style={{marginBottom:0, textAlign:'center', background:'#fff'}} 
                  placeholder="삭제하겠습니다."
                  value={deleteConfirmText}
                  onChange={(e) => setDeleteConfirmText(e.target.value)}
                />
              </div>

              <div style={{display:'flex', gap:'10px'}}>
                <button className="clay-btn secondary" style={{flex:1}} onClick={() => {setTargetToDelete(null); setDeleteConfirmText('');}}>취소</button>
                <button 
                  className="clay-btn" 
                  style={{flex:1, background: deleteConfirmText === '삭제하겠습니다.' ? '#ef4444' : '#fca5a5', color:'#fff', cursor: deleteConfirmText === '삭제하겠습니다.' ? 'pointer' : 'not-allowed'}}
                  onClick={handlePermanentDelete}
                  disabled={deleteConfirmText !== '삭제하겠습니다.'}
                >
                  영구 삭제
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <AppShell>
      <div className="page-wrapper animate-fade-in" style={{padding: '20px', minHeight: '100vh', background: 'var(--bg-color)'}}>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'30px'}}>
          <h2 style={{margin:0, fontSize:'1.5rem', fontWeight:'bold'}}>MY PAGE</h2>
        </div>

        {/* 내 정보 */}
        <div className="clay-card" style={{padding:'20px', marginBottom:'20px'}}>
          <h3 style={{margin:'0 0 15px 0', fontSize:'1.1rem'}}>내 계정</h3>
          <div style={{display:'flex', justifyContent:'space-between', marginBottom:'10px'}}>
            <span style={{color:'#666'}}>이메일</span>
            <span style={{fontWeight:'500'}}>{authUser?.email || 'parent@example.com'}</span>
          </div>
          <div style={{display:'flex', justifyContent:'space-between'}}>
            <span style={{color:'#666'}}>닉네임</span>
            <span style={{fontWeight:'500'}}>{authUser?.nickname || '지훈이 부모님'}</span>
          </div>
        </div>

        {/* 설정 메뉴 */}
        <div className="clay-card" style={{padding:'10px 20px', marginBottom:'30px'}}>
          <div style={{padding:'15px 0', borderBottom:'1px solid #f0f0f0', display:'flex', justifyContent:'space-between', alignItems:'center', cursor:'pointer'}} onClick={() => navigate('/mypage/phone')}>
            <span style={{fontWeight:'500'}}>전화번호 등록 / 수정</span>
            <ChevronRight size={18} color="#999" />
          </div>
          <div style={{padding:'15px 0', borderBottom:'1px solid #f0f0f0', display:'flex', justifyContent:'space-between', alignItems:'center', cursor:'pointer'}}>
            <span style={{fontWeight:'500'}}>비밀번호 변경</span>
            <ChevronRight size={18} color="#999" />
          </div>
          <div style={{padding:'15px 0', display:'flex', justifyContent:'space-between', alignItems:'center', cursor:'pointer'}} onClick={() => setViewTrash(true)}>
            <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
              <Trash2 size={18} color="#ef4444" />
              <span style={{fontWeight:'500', color:'#ef4444'}}>휴지통 관리</span>
            </div>
            <ChevronRight size={18} color="#999" />
          </div>
        </div>

        <button className="clay-btn secondary" style={{width:'100%', padding:'16px', display:'flex', justifyContent:'center', gap:'10px', color:'#666'}} onClick={handleLogout}>
          <LogOut size={20} />
          로그아웃
        </button>
      </div>
    </AppShell>
  );
};
