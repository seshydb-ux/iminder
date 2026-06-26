import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Upload, Info, CheckCircle, PlayCircle } from 'lucide-react';
import { AppShell } from '../../components/layout/AppShell';

export const ActionFlow = () => {
  const navigate = useNavigate();
  const [showGuideModal, setShowGuideModal] = useState(false);
  
  const [video, setVideo] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setVideo(file.name);
    }
  };

  const startUpload = () => {
    setUploading(true);
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 15;
      if (currentProgress >= 100) {
        clearInterval(interval);
        setProgress(100);
        setTimeout(() => {
          navigate('/analysis-result');
        }, 1000);
      } else {
        setProgress(currentProgress);
      }
    }, 500);
  };

  return (
    <AppShell hideBottomTab={true}>
      <div className="page-wrapper animate-fade-in" style={{padding: '20px', minHeight: '100vh', background: 'var(--bg-color)'}}>
        
        {/* 헤더 */}
        <div style={{display:'flex', alignItems:'center', marginBottom:'30px'}}>
          <button className="clay-btn secondary" style={{padding:'8px', marginRight:'15px'}} onClick={() => navigate(-1)} disabled={uploading}>
            <ChevronLeft size={20} />
          </button>
          <h2 style={{margin:0, fontSize:'1.4rem'}}>행동 분석하기</h2>
        </div>

        {uploading ? (
          <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', marginTop:'100px'}}>
            <div style={{width:'80px', height:'80px', borderRadius:'50%', border:'8px solid #f3e8ff', borderTopColor:'var(--primary)', animation:'spin 1s linear infinite', marginBottom:'20px'}}></div>
            <h3 style={{marginBottom:'10px'}}>AI 분석을 위해 영상을 전송 중입니다</h3>
            <p style={{color:'#666', marginBottom:'20px'}}>{progress}% 완료</p>
            <div style={{width:'100%', maxWidth:'300px', height:'10px', background:'#eee', borderRadius:'5px', overflow:'hidden'}}>
              <div style={{width:`${progress}%`, height:'100%', background:'var(--primary)', transition:'width 0.3s ease'}}></div>
            </div>
            <p style={{fontSize:'0.85rem', color:'#999', marginTop:'20px', textAlign:'center', lineHeight:'1.5'}}>
              영상의 길이에 따라 수 분이 소요될 수 있습니다.<br/>잠시만 기다려주세요.
            </p>
          </div>
        ) : (
          <div className="animate-fade-in">
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-end', marginBottom:'20px'}}>
              <div>
                <h3 style={{margin:'5px 0 0 0', fontSize:'1.3rem'}}>분석할 영상을 올려주세요</h3>
              </div>
              <button className="clay-btn secondary" style={{padding:'6px 10px', fontSize:'0.8rem', display:'flex', alignItems:'center', gap:'4px'}} onClick={() => setShowGuideModal(true)}>
                <Info size={14} /> 가이드 보기
              </button>
            </div>
            <p style={{fontSize:'0.9rem', color:'#666', lineHeight:'1.5', marginBottom:'30px'}}>
              아이의 평소 행동이나 분석하고 싶은 특정한 상황이 가장 잘 담긴 영상을 선택해주세요. (최대 3분)
            </p>

            <label className="clay-card" style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'40px 20px', cursor:'pointer', border: video ? '2px solid var(--primary)' : '2px dashed #ccc', background: video ? '#f0fdf4' : '#fff'}}>
              <input type="file" style={{display:'none'}} accept="video/mp4,video/mov" onChange={handleFileUpload} />
              {video ? (
                <>
                  <CheckCircle size={48} color="#166534" style={{marginBottom:'15px'}} />
                  <span style={{fontWeight:'bold', color:'#166534'}}>{video}</span>
                  <span style={{fontSize:'0.85rem', color:'#666', marginTop:'10px'}}>클릭하여 다른 영상 선택</span>
                </>
              ) : (
                <>
                  <Upload size={48} color="#999" style={{marginBottom:'15px'}} />
                  <span style={{fontWeight:'bold', color:'#333', marginBottom:'5px'}}>영상 파일 선택하기</span>
                  <span style={{fontSize:'0.85rem', color:'#999'}}>MP4, MOV 포맷 지원</span>
                </>
              )}
            </label>

            <button className="clay-btn accent" style={{width:'100%', marginTop:'30px', opacity: video ? 1 : 0.5}} disabled={!video} onClick={startUpload}>
              분석 시작하기
            </button>
          </div>
        )}

        {/* 가이드 모달 */}
        {showGuideModal && (
          <div style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.6)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:1000, padding:'20px'}}>
            <div className="clay-card animate-fade-in" style={{width:'100%', maxWidth:'360px', padding:'25px'}}>
              <h3 style={{marginTop:0, marginBottom:'15px', color:'var(--primary)'}}>
                영상 촬영 가이드
              </h3>
              
              <div style={{padding: '20px', background: '#f5f5f5', borderRadius: '8px', textAlign: 'center', color: '#666'}}>
                [가이드 내용 입력 예정]
              </div>

              <button className="clay-btn" style={{width:'100%', marginTop:'20px'}} onClick={() => setShowGuideModal(false)}>
                확인했습니다
              </button>
            </div>
          </div>
        )}

        <style dangerouslySetInnerHTML={{__html: `
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}} />
      </div>
    </AppShell>
  );
};
