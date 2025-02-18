import React, {ReactNode} from "react";
import CollabRecruitPage from "@/(main)/(timeline)/colab/recruitsidebar";

export default function Layout(
    {
      children,
    }: Readonly<{
      children: ReactNode;
    }>) {

  return (
      <>
        <CollabRecruitPage>
          {children}
        </CollabRecruitPage>
      </>
  )
}
