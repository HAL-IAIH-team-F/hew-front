"use client"
import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import {useClientContext} from "~/api/useClientContext";
import {apiClient} from "~/api/wrapper";
import {ErrorData} from "../../../util/err/err";
import {ErrorMessage} from "../../../util/err/ErrorMessage";
import {RecruitRes} from "@/colab/recruit/RecruitRes";
import Recruit from "@/colab/recruit/Recruit";

export default function Page(
  {}: {}
) {
  const [recruits, setRecruits] = useState<RecruitRes[]>()
  const [err, setErr] = useState<ErrorData>()
  const session = useSession()
  const client = useClientContext(session)

  useEffect(() => {
    client.exec(apiClient.grs_api_recruit_get, {}).then(value => {
      if (value.error) return setErr(value.error)
      setRecruits(value.value)
    })
  }, []);

  return <div>
    <ErrorMessage error={err}/>
    {recruits && recruits.map(recruit =>
      <Recruit recruit={recruit}/>
    )}
  </div>
}