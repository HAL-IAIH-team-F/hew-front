import React, { useState, useEffect } from "react";

interface User {
  icon?: {
    strUrl: () => string;
  };
}

export const UserIconCard: React.FC<{ user: User | undefined }> = ({ user }) => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth < 480) {
        // スマホサイズ
        setScale(0.6);
      } else if (windowWidth < 768) {
        // タブレットサイズ
        setScale(0.8);
      } else {
        // PCサイズ
        setScale(1);
      }
    };

    window.addEventListener("resize", updateScale);
    updateScale(); // 初期スケール設定
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  const frameStyle: React.CSSProperties = {
    position: "absolute",
    width: `${260 * scale}px`, // 基本の幅を調整
    height: `${260 * scale}px`, // 縦長を強調
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    background: "linear-gradient(135deg, rgba(0, 255, 255, 0.2), rgba(255, 0, 150, 0.2))",
    border: `${1 * scale}px solid rgba(255, 255, 255, 0.3)`,
    borderRadius: `35px`,
    animation: "float 6s ease-in-out infinite",
    left: "25%",
    top: "240px",
    transform: `translate(-50%, -50%)`, // スケールを直接影響させない
};

  const iconStyle: React.CSSProperties = {
    backgroundImage: user?.icon ? `url(${user.icon.strUrl()})` : "./icon.png",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: `25px`,
    height: "90%",
    width: "90%",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    boxShadow: `0 ${8 * scale}px ${20 * scale}px rgba(0, 0, 0, 0.5), inset 0 0 ${10 * scale}px rgba(255, 255, 255, 0.3)`,
    cursor: "pointer",
  };

  return (
    <div style={frameStyle}>
      {user && user.icon ? (
        <div
          style={iconStyle}
          onMouseEnter={(e) => {
            const target = e.currentTarget as HTMLDivElement;
            target.style.transform = "scale(1.05)";
            target.style.boxShadow = "0 12px 35px rgba(255, 255, 255, 0.6)";
          }}
          onMouseLeave={(e) => {
            const target = e.currentTarget as HTMLDivElement;
            target.style.transform = "scale(1)";
            target.style.boxShadow =
              "0 8px 20px rgba(0, 0, 0, 0.5), inset 0 0 10px rgba(255, 255, 255, 0.3)";
          }}
        ></div>
      ) : null}
    </div>
  );
};

export default UserIconCard;
