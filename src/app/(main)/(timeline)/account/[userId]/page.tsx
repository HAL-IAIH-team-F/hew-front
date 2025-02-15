import AccountCard from "@/(main)/(timeline)/account/[userId]/_profile/AccountCard/accountCard";
import React from "react";

export default function Page(
    {
      params: {userId}
    }: {
      params: { userId: string }
    }
) {
  return <AccountCard userId={userId}/>
}