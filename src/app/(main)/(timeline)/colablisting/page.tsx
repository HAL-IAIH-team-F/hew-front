import React from "react";
import CollabRecruitPage from "@/(main)/(timeline)/colablisting/recruitsidebar";
import RequestRecruit from "@/(main)/(timeline)/colab/recruit/page";



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