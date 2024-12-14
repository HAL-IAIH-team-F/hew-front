"use client";

import {useUserData} from "~/api/context/useUserData";
import Backcanvas from "./backcanvas";

const accountCard: React.FC = () => {
  const {user} = useUserData();
  return (
    <div>
      <Backcanvas user={user}/>

    </div>
    // return (
    //   <div
    //     style={{
    //       display: "flex",
    //       flexDirection: "column",
    //       width: "100%",
    //       height: "100%",
    //       fontFamily: "'Roboto', 'Arial', sans-serif",
    //       color: "#fff", // テキストの色を白に
    //       overflow: "hidden",
    //     }}
    //   >
    //       {/* Header */}
    //       <div
    //         style={{
    //           fontWeight: "bold",
    //           alignItems: "center",
    //           display: "flex",
    //           flexDirection: "column",
    //         }}
    //       >
    //           <Header user={user} />

    //         <div
    //         style={{
    //             display: "flex",
    //             flexDirection: "column",
    //             alignItems: "center",
    //             padding: "20px",
    //             flex: 1,
    //         }}
    //         >
    //           {/* ユーザー情報を横並びに */}
    //           <div
    //               style={{
    //               display: "flex",
    //               alignItems: "center",
    //               justifyContent: "center",
    //               width: "100%",
    //               gap: "20px",
    //               marginBottom: "20px",
    //               }}
    //           >
    //               {/* プロフィールアイコン */}
    //               <UserIconcard user={user} />

    //               {/* ユーザー情報 */}
    //               <div
    //               style={{
    //                   textAlign: "left",
    //                   flex: 1,
    //               }}
    //               >
    //                 <h1 style={{ fontSize: "1.8rem", margin: "10px 0", fontWeight: "bold" }}>{user?.name}</h1>
    //                 <p style={{ fontSize: "1rem", color: "#d1e1ff" }}>@{user?.id}</p>
    //               </div>
    //           </div>

    //           <div
    //               style={{
    //               display: "flex",
    //               justifyContent: "center",
    //               gap: "10px",
    //               }}
    //           >
    //           <button
    //             style={{
    //                 padding: "10px 20px",
    //                 background: "#114692",
    //                 color: "#fff",
    //                 border: "none",
    //                 borderRadius: "20px",
    //                 fontSize: "1rem",
    //                 cursor: "pointer",
    //                 boxShadow: "0 4px 15px rgba(30, 60, 114, 0.6)",
    //                 transition: "background 0.3s, transform 0.2s",
    //             }}
    //             onMouseOver={(e) => {
    //                 e.currentTarget.style.background = "rgba(35, 65, 119, 0.9)";
    //                 e.currentTarget.style.transform = "scale(1.1)";
    //             }}
    //             onMouseOut={(e) => {
    //                 e.currentTarget.style.background = "rgba(30, 60, 114, 0.9)";
    //                 e.currentTarget.style.transform = "scale(1)";
    //             }}
    //             >
    //             Follow
    //           </button>
    //           <button
    //             style={{
    //                 padding: "10px 20px",
    //                 background: "rgba(255, 255, 255, 0.2)",
    //                 color: "rgba(30, 60, 114, 0.9)",
    //                 border: "1px solid rgba(30, 60, 114, 0.9)",
    //                 borderRadius: "20px",
    //                 fontSize: "1rem",
    //                 boxShadow: "0 4px 15px rgba(30, 60, 114, 0.6)",
    //                 cursor: "pointer",
    //                 transition: "background 0.3s, transform 0.2s",
    //             }}
    //             onMouseOver={(e) => {
    //                 e.currentTarget.style.background = "rgba(240, 248, 255, 0.5)";
    //                 e.currentTarget.style.transform = "scale(1.1)";
    //             }}
    //             onMouseOut={(e) => {
    //                 e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)";
    //                 e.currentTarget.style.transform = "scale(1)";
    //             }}
    //             >
    //             Message
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //  </div>
  );
};

export default accountCard;
