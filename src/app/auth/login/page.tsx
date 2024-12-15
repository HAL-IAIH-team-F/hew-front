"use client"
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {signInAtServerCurrentPage} from "~/auth/nextauth/server";
import {ErrorMessage} from "../../../util/err/ErrorMessage";
import {useClientContextState} from "~/api/context/ClientContextProvider";

export default function Page(
  {}: {}
) {
  const [err, setErr] = useState<string>()
  const router = useRouter()
  const clientContext = useClientContextState()

  useEffect(() => {
    if (clientContext.state == "loading") return;
    if (clientContext.state == "authenticated") {
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
  }, [clientContext]);

  return <ErrorMessage error={err}/>
}