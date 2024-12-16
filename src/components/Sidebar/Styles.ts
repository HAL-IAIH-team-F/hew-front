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
  inAppPageWindowStyle: {
    backgroundColor: 'rgba(142, 142, 147, 0.35)',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4), inset 0 0 15px rgba(0, 0, 0, 0.3)',
    border: '1px solid rgba(128, 128, 128, 0.2)',
    width: "99%", // 全体幅の80%に制限
    height: "calc(100% - 133px)", // 全体幅の80%に制限
    position: 'relative', // fixedからrelativeに変更
    borderRadius: '28px',
    zIndex: 1,
    padding: "2px",
    margin: "0 auto", // 自動中央揃え
    boxSizing: "border-box",
    transition: 'opacity 0.2s ease, width 0.3s ease, left 0.3s ease',
  },
  ProductWindowStyle:{
    backgroundColor: 'rgba(255, 0, 0, 1)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(128, 128, 128, 0.9)',
    width: 'calc(40% - 300px)',
    height: '90%',
    position: 'fixed',
    left: 'calc(100% - 300px)',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '28px',
    opacity: 1 ,
    transition: 'opacity 0.2s ease, width 0.3s ease, left 0.3s ease',
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

export const pageWindowStyle = (
  isOpen: boolean,
  ProductisOpen: boolean,
  isAnimating: boolean
): CSSProperties => ({
  backgroundColor: 'rgba(142, 142, 147, 0.35)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(128, 128, 128, 0.9)',
  width: isOpen
    ? ProductisOpen
      ? 'calc(90% - 600px)' // ProductisOpen が true の場合の幅
      : 'calc(90% - 110px)' // ProductisOpen が false の場合の幅
    : ProductisOpen
    ? 'calc(90% - 500px)' // isOpen が false かつ ProductisOpen が true の場合の幅
    : '92%', // isOpen が false かつ ProductisOpen が false の場合の幅
  height: '90%',
  position: 'fixed',
  left: isOpen
    ? ProductisOpen
      ? 'calc(50% - 220px)' // ProductisOpen が true の場合の位置
      : 'calc(50% + 25px)' // ProductisOpen が false の場合の位置
    : ProductisOpen
    ? 'calc(50% - 270px)' // isOpen が false かつ ProductisOpen が true の場合の位置
    : '50%', // isOpen が false かつ ProductisOpen が false の場合の位置
  top: '50%',
  transform: isAnimating
    ? 'translateX(-50%) translateY(-50%)'
    : 'translateX(-100%) translateY(-50%)', 
  borderRadius: '28px',
  opacity: isAnimating ? 1 : 0,
  transition: `
    opacity 0.3s ease-in-out, 
    transform 0.3s cubic-bezier(0.25, 1, 0.5, 1), 
    width 0.3s ease, 
    left 0.3s ease`,
  zIndex: 999,
  display: "flex",
  minWidth: ProductisOpen ? '550px' : '0', // 最小幅を指定
});

export const inAppPageStyle = (isAnimating: boolean): CSSProperties => ({
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: isAnimating ? 'translate(-50%, -50%) scale(1) ' : 'translate(-50%, -50%)',
  width: 'calc(100% - 13px)',
  height: 'calc(100% - 13px)',
  overflow: 'hidden',
  borderRadius: '30px',
  opacity: isAnimating ? 1 : 0,
  transition: 'opacity 0.2s ease, transform 0.3s ease, width 0.3s ease, left 0.3s ease',
});

export const ProductWindowStyle = (ProductisOpen: boolean): CSSProperties => ({
  backgroundColor: 'rgba(142, 142, 147, 0.35)',
  backdropFilter: 'blur(12px)',
  border: '1px solid rgba(128, 128, 128, 0.9)',
  width: ProductisOpen ? 'calc(27%)' : '0',
  height: ProductisOpen ? '90%' : '0',
  display: "flex",
  position: 'fixed',
  right: '0',
  marginRight: "25px",
  top: '50%',
  transformOrigin: 'right center', // 右支点を指定
  transform: ProductisOpen
    ? 'translateX(0%) translateY(-50%) scale(1)'
    : 'translateX(100%) translateY(-50%) scale(0.95)', // 閉じた状態では少し縮小
  borderRadius: '28px',
  opacity: ProductisOpen ? 1 : 0,
  transition: `
    opacity 0.3s ease-in-out,
    width 0.3s ease,
    height 0.3s ease,
    transform 0.3s cubic-bezier(0.22, 0.41, 0.36, 1)`, // transformにカスタムイージングを追加
  zIndex: 999,
  minWidth: ProductisOpen ? '550px' : '0', // 最小幅を指定
  maxWidth: ProductisOpen ? '750px' : '0', // 最小幅を指定
});