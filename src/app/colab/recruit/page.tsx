"use client"
import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import {useClientContext} from "~/api/useClientContext";
import {apiClient} from "~/api/wrapper";
import {ErrorData} from "../../../util/err/err";
import {ErrorMessage} from "../../../util/err/ErrorMessage";

export default function Page(
  {}: {}
) {
  const [recruits, setRecruits] = useState<{
    recruit_id: string;
    creator_id: string;
    title: string;
    description: string;
  }[]>()
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
      <div key={recruit.recruit_id} className={"border-2 border-gray-300 p-4 m-4"}>
        <h1>{recruit.title}</h1>
        <p>id: {recruit.recruit_id}</p>
        <p>desc: {recruit.description}</p>
        <p>creator: {recruit.creator_id}</p>
      </div>
    )}
  </div>
}