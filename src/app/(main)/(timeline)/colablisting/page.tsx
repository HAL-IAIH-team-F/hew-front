"use client"

import React from "react";
import CollabRecruitPage from "@/(main)/(timeline)/colablisting/recruitsidebar";
import RequestRecruit from "@/(main)/(timeline)/colab/recruit/page";

import LoginNeed from "~/UI/loginNeed";
import { useClientState } from "~/api/context/ClientContextProvider";



export default function Page({}: {}) {
  const clientState = useClientState();

  if (clientState.state !== "registered") {
    return (
        <div>
          <LoginNeed/>
        </div>
    )
  }
  return (
    <>
        <div
          >
            <CollabRecruitPage/>
          </div>

    </>
  );
}