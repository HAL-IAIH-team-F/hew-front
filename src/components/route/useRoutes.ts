"use client"
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useMemo} from "react";
import {Routes} from "~/route/Routes";
import {useClientState} from "~/api/context/ClientContextProvider";

export default function useRoutes() {
  const params = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const clientState = useClientState()
  return useMemo(
      () => new Routes(params, pathname, router, clientState.state == "registered" ? clientState.user : undefined),
      [params, pathname, router, clientState.state == "registered" && clientState.user]
  )
}