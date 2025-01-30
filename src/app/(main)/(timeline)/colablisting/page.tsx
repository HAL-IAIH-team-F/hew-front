import React from "react";
import RequestRecruit from "@/(main)/colab/recruit/page";
import CollabRecruitPage from "./RecruitSideBar";


export default function Page({}: {}) {
  return (
    <>
      <div
        style={{
          margin: "30px 0 0 0",
          display: "flex",
        }}
      >
        <div
            style={{
              
            }}
          >
            <CollabRecruitPage/>
          </div>
        <div
          style={{
            // display: "flex",
            // justifyContent: "center",
            width: "80%",
            height: "750px",
          }}
        >
          <RequestRecruit/>
        </div>
      </div>
    </>
  );
}