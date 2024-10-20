"use client"

import {useMemo} from "react";
import {ClientContext, getClientContext} from "./wrapper";
import {Session} from "next-auth";

export function useClientContext(session: Session | null): ClientContext {
  return useMemo(() => {
    return getClientContext(session)
  }, [session])
}