"use client"
import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import {useClientContextState} from "~/api/context/ClientContextProvider";
import {apiClient} from "~/api/context/wrapper";
import {ErrorData} from "../../../../util/err/err";
import {ErrorMessage} from "../../../../util/err/ErrorMessage";
import {RecruitRes} from "@/(main)/colab/recruit/RecruitRes";
import Recruit from "@/(main)/colab/recruit/Recruit";

export default function Page(
  {}: {}
) {
  const [recruits, setRecruits] = useState<RecruitRes[]>()
  const [err, setErr] = useState<ErrorData>()
  const session = useSession()
  const client = useClientContextState(session)

  useEffect(() => {
    client.exec(apiClient.grs_api_recruit_get, {}).then(value => {
      if (value.error) return setErr(value.error)
      setRecruits(value.success)
    })
  }, []);

  return <div>
    <ErrorMessage error={err}/>
    {recruits && recruits.map(recruit =>
      <Recruit recruit={recruit}/>
    )}
  </div>
}