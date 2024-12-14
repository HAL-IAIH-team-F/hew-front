import {RecruitRes} from "./RecruitRes"
import {useSession} from "next-auth/react";
import {useClientContext} from "~/api/context/useClientContext";
import {apiClient} from "~/api/context/wrapper";
import {useState} from "react";
import {ErrorData} from "../../../../util/err/err";
import {ErrorMessage} from "../../../../util/err/ErrorMessage";

export default function Recruit(
  {
    recruit,
  }: {
    recruit: RecruitRes
  },
) {
  const session = useSession()
  const clientContext = useClientContext(session)
  const [err, setErr] = useState<ErrorData>()

  return (
    <div key={recruit.recruit_id} className={"border-2 border-gray-300 p-4 m-4"}>
      <h1>{recruit.title}</h1>
      <p>id: {recruit.recruit_id}</p>
      <p>desc: {recruit.description}</p>
      <p>creator: {recruit.creator_id}</p>
      <button onClick={() => {
        setErr(undefined)
        clientContext.execBody(apiClient.pcr_api_colab_request_post, {recruit_id: recruit.recruit_id})
          .then(value => {
            if (!value.error) return
            setErr(value.error)
          })
      }}
              className={"border-2 border-gray-300 p-1 hover:bg-gray-200"}
      >request
      </button>
      <ErrorMessage error={err}/>
    </div>
  )
}
