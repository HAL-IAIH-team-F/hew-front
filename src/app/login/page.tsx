"use client"
import {useEffect, useState} from "react";
import {ErrorMessage} from "../../util/err/ErrorMessage";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {signInAtServerCurrentPage} from "~/auth/serverAuth";

export default function Page(
  {}: {}
) {
  const [err, setErr] = useState<string>()
  const session = useSession()
  const router = useRouter()
  useEffect(() => {
    if (session.status == "loading") return;
    if (session.status == "authenticated") {
      const win = window.open('', '_self');
      if (win) {
        win.close()
        return
      }
      router.push("/timeline")
      return;
    }
    if (err != undefined) return;
    signInAtServerCurrentPage("keycloak").catch(reason => {
      console.error(reason)
      setErr(reason.toString())
    })
  }, [session]);

  return <ErrorMessage error={err}/>
}