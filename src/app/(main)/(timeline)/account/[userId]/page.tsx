import {AccountCard} from "@/(main)/(timeline)/account/[userId]/AccountCard";
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