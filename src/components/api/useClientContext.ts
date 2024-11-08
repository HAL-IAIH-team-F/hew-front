"use client"

import {useMemo} from "react";
import {Session} from "next-auth";
import {ClientContext, ClientContextUtil} from "~/api/ClientContext";

export function useClientContext(session: Session | null): ClientContext {
  return useMemo(() => {
    return ClientContextUtil.getClientContext(session)
  }, [session])
}