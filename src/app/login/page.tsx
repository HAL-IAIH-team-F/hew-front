"use client"
import {useEffect, useState} from "react";
import {signInAtServer} from "~/_auth/serverAuth";
import {ErrorMessage} from "../../util/err/ErrorMessage";
import {useSession} from "next-auth/react";

export default function Page(
  {}: {}
) {
  const [err, setErr] = useState<string>()
  const session = useSession().data
  useEffect(() => {
    if (session) {
      const win = window.open('', '_self');
      if (win) {
        win.close()
      }
      return
    }
    signInAtServer(location.href, "keycloak").catch(reason => {
      console.error(reason)
      setErr(reason.toString())
    })
  }, [session]);

  return <ErrorMessage error={err}/>
}