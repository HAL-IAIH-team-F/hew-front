import { CSSProperties } from 'react';

export const styles: { [key: string]: CSSProperties } = {
  sidebar: {
    backgroundColor: 'rgba(142, 142, 147, 0.35)', // 背景色
    backdropFilter: 'blur(12px)', // 背景ブラー効果
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4), inset 0 0 15px rgba(0, 0, 0, 0.3)', // ドラマチックで深みのある影
    border: '1px solid rgba(128, 128, 128, 0.2)', // シンプルな枠線
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '110px',
    height: 'calc(100vh - 30px)',
    margin: '15px 0',
    padding: '20px 10px',
    gap: '24px',
    position: 'fixed',
    left: '10px',
    top: '0',
    borderRadius: '30px',
    zIndex: 1000,
    transition: 'left 0.3s ease, height 0.3s ease',
    
  },
  collapsedSidebar: {
    backgroundColor: 'rgba(142, 142, 147, 0.35)',
    backdropFilter: 'blur(12px)',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4), inset 0 0 15px rgba(0, 0, 0, 0.3)',
    border: '1px solid rgba(128, 128, 128, 0.2)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '110px',
    height: 'calc(100vh - 30px)',
    margin: '15px 0',
    padding: '20px 10px',
    gap: '24px',
    position: 'fixed',
    left: '-100px',
    top: '0',
    borderRadius: '30px',
    zIndex: 1000,
    transition: 'left 0.3s ease, height 0.3s ease',
  },
  toggleButton: {
    position: 'absolute',
    backgroundColor: 'rgba(142, 142, 147, 0.35)',
    top: '45px',
    right: '-25px',
    width: '25px',
    height: '80px',
    borderRadius: '0 10px 10px 0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    zIndex: 1000,
    borderRight: '1px solid rgba(255, 255, 255, 0.2)',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
    color: 'white',
    backdropFilter: 'blur(12px)',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4), inset 0 0 15px rgba(0, 0, 0, 0.3)',
    border: '3px solid rgba(128, 128, 128, 0.25)',
  },
  spinner: {
    fontSize: '24px',
    color: '#888',
    animation: 'spin 3s linear infinite',
  },
  icon: {
    fontSize: '27px',
    color: '#fff',
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    top: '50%',
    left: '50%',
  },
  profileIcon: {
    backgroundColor: 'rgba(70, 107, 143, 0.8)',
    color: '#FFFFFF',
    borderRadius: '50%',
    width: '40px',
    height: '40px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userIcon: {
    borderRadius: '50%',
    width: '43px',
    height: '43px',
    objectFit: 'cover',
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    border: '2px solid rgba(0, 0, 0, 0.8)',
    top: '50%',
    left: '50%',
  },
  iconLabel: {
    fontSize: '16px',
    color: '#000',
    fontWeight: '500',
    userSelect: 'none',
    position: 'absolute',
    top: '23px',
    left: '70px',
  },
  // ↓ ｗ
  inAppPageWindowinAppWindowStyle:{
    backgroundColor: 'rgba(142, 142, 147, 0.35)',
    backdropFilter: 'blur(12px)',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4), inset 0 0 15px rgba(0, 0, 0, 0.3)',
    border: '1px solid rgba(128, 128, 128, 0.2)',
    width: "calc(100% - 300px)", // 左右5pxずつの余白を考慮
    height: "calc(100% - 170px)", // 左右5pxずつの余白を考慮
    position: 'fixed',
    borderRadius: '28px',
    zIndex: 999,
  }

};

export const iconContainerStyle = (isOpen: boolean): CSSProperties => ({
  width: '80px',
  height: '80px',
  backgroundColor: 'rgba(220, 220, 220, 0.2)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  borderRadius: '17px',
  transition: 'width 0.3s ease, box-shadow 0.3s ease',
  overflow: 'hidden',
  borderTopRightRadius: '24px',
  borderTopLeftRadius: '24px',
  borderBottomRightRadius: '24px',
  borderBottomLeftRadius: '24px',
  pointerEvents: 'auto',
  background: "linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(0, 0, 0, 0.2))",
  backdropFilter: "blur(15px)",
  boxShadow: `${2}px ${4 }px ${6 }px rgba(0, 0, 0, 0.5), inset 0 0 ${10}px rgba(255, 255, 255, 0.3)`,
  border: `${2}px solid rgba(255, 255, 255, 0.2)`,
});

export const pageWindowStyle = (isOpen: boolean, isAnimating: boolean): CSSProperties => ({
  backgroundColor: 'rgba(142, 142, 147, 0.35)',
  backdropFilter: 'blur(12px)',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4), inset 0 0 15px rgba(0, 0, 0, 0.3)',
  border: '1px solid rgba(128, 128, 128, 0.2)',
  width: isOpen ? 'calc(90% - 110px )' : '90%',
  height: '90%',
  position: 'fixed',
  left: isOpen ? 'calc(50% + 55px)' : '50%',
  top: '50%',
  transform: 'translate(-50%, -50%)',
  borderRadius: '28px',
  opacity: isAnimating ? 1 : 0,
  transition: 'opacity 0.2s ease, width 0.3s ease, left 0.3s ease',
  zIndex: 999,
});

export const inAppPageStyle = (isAnimating: boolean): CSSProperties => ({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'calc(100% - 13px)',
  height: 'calc(100% - 13px)',
  overflow: 'hidden',
  borderRadius: '30px',
  opacity: isAnimating ? 1 : 0,
  transition: 'opacity 0.2s ease, width 0.3s ease, left 0.3s ease',
  border: 'none', // 実際のボーダーは非表示
  boxShadow: `
    0 0 15px 5px rgba(255, 255, 255, 0.4),
    inset 0 0 10px 3px rgba(255, 255, 255, 0.4) 
  `,
});


