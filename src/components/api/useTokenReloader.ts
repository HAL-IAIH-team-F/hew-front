"use client"
import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import {TokenBundle} from "~/auth/TokenBundle";
import {refreshToken} from "~/api/refresh";
import {add} from "date-fns";

export default function useTokenReloader() {
  const session = useSession()
  const [current, setCurrent] = useState<TokenBundle>({access: undefined, refresh: undefined})

  useEffect(() => {
    if (session.status != "authenticated") return
    const next = current.access
      ? add(new Date(current.access.expire), {minutes: -1}).getTime() - Date.now() : 0

    const timeout = setTimeout(() => {
      refreshToken(current, session.data).then(value => {

        if (value.value) {
          setCurrent(value.value)
          session.update({accessToken: value.value.access, loaded: true,...session.data}).catch(reason => console.error(reason))
          return
        }
        session.update({accessToken: undefined, loaded: true,...session.data}).catch(reason => console.error(reason))
        console.error(value.error)
      })
    }, next)
    return () => {
      clearTimeout(timeout)
    }
  }, [session, current]);
}

