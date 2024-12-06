// ProfileCard.tsx
import React from "react";
import Image from "../../../util/Image"; // 必要に応じてパスを変更してください

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
    backgroundImage: user?.icon ? `url(${user.icon.strUrl()})` : "./icon.png",
    backgroundSize: "cover",
    backgroundPosition: "center",
    borderRadius: `25px`,
    height: "100%",
    width: "100%",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
  };
  
  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <h2 style={styles.name}>{user?.name || "Guest"}</h2>
        <p style={styles.id}>@{user?.id || "unknown"}</p>
      </div>
      <div style={styles.iconContainer}>
        <div style={iconStyle}></div>
      </div>
      <div style={styles.footer}>
        <p style={styles.bio}>{user?.bio || "No bio available"}</p>
      </div>
    </div>
  );
};

// スタイルをオブジェクトで定義
const styles: { [key: string]: React.CSSProperties } = {
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f9f9f9",
    borderRadius: "15px",
    border: "5px solid #ccc",
    boxShadow: "0 8px 12px rgba(0, 0, 0, 0.2)",
    padding: "20px",
    maxWidth: "1000px",
    margin: "20px auto",
    position: "relative",
    backgroundImage: "linear-gradient(to bottom right, #f5f7fa, #c3cfe2)",
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
  },
  header: {
    backgroundColor: "#eee",
    borderRadius: "10px",
    padding: "10px 15px",
    marginBottom: "10px",
    width: "90%",
    textAlign: "center",
  },
  iconContainer: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    overflow: "hidden",
    border: "3px solid #aaa",
    backgroundColor: "#fff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    margin: "15px 0",
  },
  footer: {
    backgroundColor: "#eee",
    borderRadius: "10px",
    padding: "10px 15px",
    marginTop: "10px",
    width: "90%",
  },
  name: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    margin: "0",
    color: "#333",
  },
  id: {
    fontSize: "0.9rem",
    color: "#777",
    margin: "5px 0",
  },
  bio: {
    fontSize: "0.9rem",
    color: "#555",
  },
};

export default ProfileCard;
