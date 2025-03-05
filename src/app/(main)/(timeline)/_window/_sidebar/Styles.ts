import { CSSProperties } from 'react';
import {Theme} from "@/Theme";
const color = Theme.bg
export const styles = (width: number, height: number): Record<string, CSSProperties> => ({
  sidebar: {
    backgroundColor: color,
    backdropFilter: 'blur(0px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between', // アイテムを均等に配置
    height: `${Math.max(100, height - 30)}px`,

    maxWidth: '80px',
    margin: '15px 0',
    padding: '30px 0', // 上下の余白を調整
    position: 'fixed',
    left: '30px',
    top: '0',
    borderRadius: '60px',
    zIndex: 30,
    transition: 'left 0.3s ease, height 0.3s ease, backdrop-filter 0.3s ease',
  },
  
  collapsedSidebar: {
    backgroundColor: color,
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)', // 繊細な枠線
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '80px', // 固定幅
    height: `${Math.max(100, height - 30)}px`, // 高さは動的
    margin: '15px 0',
    padding: '20px 10px',
    gap: '50px',
    position: 'fixed',
    left: '-170px',
    top: '0',
    borderRadius: '60px', // より丸みを帯びたデザイン
    zIndex: 3000,
    transition: 'left 0.3s ease, height 0.3s ease',
  },
  toggleButton: {
    position: 'absolute',
    backgroundColor: color,
    top: '45px',
    right: '-25px',
    width: '25px',
    height: '80px',
    borderRadius: '0 12px 12px 0', // 角の丸みを調整
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    zIndex: 3000,
    borderRight: '1px solid rgba(255, 255, 255, 0.2)',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
    color: 'white',
    backdropFilter: 'blur(20px)', // ぼかしを強調
    border: '1px solid rgba(255, 255, 255, 0.1)', // 繊細な枠線
  },
  inAppPageWindowStyle: {
    backgroundColor: color,
    border: '1px solid rgba(128, 128, 128, 0.2)',
    position: "absolute", // fixedからrelativeに変更
    borderRadius: '28px',
    zIndex: 1,
    padding: "2px",
    margin: "0 auto", // 自動中央揃え
    widows: "100%",
    height: "100%",
    boxSizing: "border-box",
    transition: 'opacity 0.2s ease, width 0.3s ease, left 0.3s ease',
  },
  ProductWindowStyle:{
    backgroundColor: color,
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

});

export const iconstyles: { [key: string]: CSSProperties } = {
  spinner: {
    fontSize: '24px',
    color: '#fff',
    animation: 'spin 3s linear infinite !important'
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
    border: '2px solid rgba(255, 255, 255, 0.2)',
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
}







export const pageWindowStyle = (
  isOpen: boolean,
  ProductisOpen: boolean,
  isAnimating: boolean,
  width: number,
  height: number,
): CSSProperties => {
  const windowWidth = width
  const windowHeight = height

  const calculatedWidth = isOpen
    ? ProductisOpen
      ? windowWidth - 750 // ProductisOpen が true の場合の幅
      : windowWidth - 170 // ProductisOpen が false の場合の幅
    : ProductisOpen
    ? windowWidth - 630 // isOpen が false かつ ProductisOpen が true の場合の幅
    : windowWidth - 70; // isOpen が false かつ ProductisOpen が false の場合の幅

  const calculatedLeft = isOpen
    ? ProductisOpen
      ? (windowWidth / 2) - 240 // ProductisOpen が true の場合の位置
      : (windowWidth / 2) + 40 // ProductisOpen が false の場合の位置
    : ProductisOpen
    ? (windowWidth / 2) - 300 // isOpen が false かつ ProductisOpen が true の場合の位置
    : windowWidth / 2; // isOpen が false かつ ProductisOpen が false の場合の位置

  return {
    backgroundColor: color,
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    width: `${calculatedWidth}px`,
    height: `${windowHeight * 0.9}px`,
    position: 'fixed',
    left: `${calculatedLeft}px`,
    marginLeft: "30px",
    top: `${windowHeight / 2}px`,
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
    zIndex: 9,
    display: "flex",
    minWidth: ProductisOpen ? '550px' : '0',
    };
};

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
  backgroundColor: color,
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  width: ProductisOpen ? 'calc(27%)' : '0',
  height: ProductisOpen ? '90%' : '0',
  display: "flex",
  position: 'fixed',
  right: '0',
  marginRight: "25px",
  top: '50%',
  transformOrigin: 'right center',
  transform: ProductisOpen
    ? 'translateX(0%) translateY(-50%) scale(1)'
    : 'translateX(100%) translateY(-50%) scale(0.15)',
  borderRadius: '28px',
  opacity: ProductisOpen ? 1 : 0,
  transition: `
    opacity 0.3s ease-in-out,
    width 0.3s ease,
    height 0.3s ease,
    transform 0.3s`,
  zIndex: 9,
  minWidth: ProductisOpen ? '530px' : '0',
  maxWidth: ProductisOpen ? '750px' : '0',
});