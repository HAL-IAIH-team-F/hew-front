"use client"

import {useMemo} from "react";
import {ClientContext, ClientContextUtil} from "~/api/ClientContext";
import {SessionContextValue} from "next-auth/react";

export function useClientContext(session: SessionContextValue): ClientContext {
  return useMemo(() => {
    return ClientContextUtil.getClientContext(session)
  }, [session])
}