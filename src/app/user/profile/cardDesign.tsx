// ProfileCard.tsx
import React from "react";

interface User {
  icon?: {
    strUrl: () => string;
  };
  name: string;
  id: string;
  bio?: string; // ユーザーの自己紹介
}

const ProfileCard: React.FC<{ user: User | undefined }> = ({ user }) => {
  const iconStyle: React.CSSProperties = {
    backgroundImage: user?.icon ? `url(${user.icon.strUrl()})` : "url('./icon.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: `10px`,
    height: "100%",
    width: "100%",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
  };

  return (
    <div style={styles.card}>
      {/* アイコン部分 */}
      <div style={styles.iconContainer}>
        <div style={iconStyle}></div>
      </div>
      {/* ユーザー情報部分 */}
      <div style={styles.infoContainer}>
        <div style={styles.header}>
          <h2 style={styles.name}>{user?.name || "Guest"}</h2>
          <p style={styles.id}>@{user?.id || "unknown"}</p>
        </div>
        <div style={styles.footer}>
          <p style={styles.bio}>{user?.bio || "No bio available"}</p>
        </div>
      </div>
    </div>
  );
};

// スタイルをオブジェクトで定義
const styles: { [key: string]: React.CSSProperties } = {
  card: {
    display: "flex", // 横並び
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: "15px",
    border: "5px solid #ccc",
    boxShadow: "0 8px 12px rgba(0, 0, 0, 0.2)",
    padding: "40px", // 倍に拡大
    maxWidth: "1200px", // 元が600pxなので2倍
    margin: "40px auto", // 上下左右の余白も調整
    position: "relative",
    backgroundImage: "linear-gradient(to bottom right, #f5f7fa, #c3cfe2)",
    fontFamily: "Arial, sans-serif",
    textAlign: "left",
  },
  iconContainer: {
    width: "200px", // 倍に拡大
    height: "200px", // 倍に拡大
    borderRadius: "10px",
    overflow: "hidden",
    border: "5px solid #aaa", // 境界線も太く
    backgroundColor: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)", // シャドウも調整
    marginRight: "40px", // アイコンとテキストの間の余白
  },
  infoContainer: {
    flex: 1, // アイコンの横にテキストを広げる
  },
  header: {
    marginBottom: "20px", // 元の倍
  },
  name: {
    fontSize: "3rem", // 元が1.5remなので2倍
    fontWeight: "bold",
    margin: "0",
    color: "#333",
  },
  id: {
    fontSize: "1.8rem", // 元が0.9remなので2倍
    color: "#777",
    margin: "10px 0", // 元の倍
  },
  footer: {
    marginTop: "20px", // 元の倍
  },
  bio: {
    fontSize: "1.8rem", // 元が0.9remなので2倍
    color: "#555",
  },
};

export default ProfileCard;
