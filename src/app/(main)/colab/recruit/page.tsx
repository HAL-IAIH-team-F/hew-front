"use client"
import {useEffect, useState} from "react";
import {useClientState} from "~/api/context/ClientContextProvider";
import {ErrorData} from "../../../../util/err/err";
import {ErrorMessage} from "../../../../util/err/ErrorMessage";
import {RecruitRes} from "@/(main)/colab/recruit/RecruitRes";
import Recruit from "@/(main)/colab/recruit/Recruit";
import {Api} from "~/api/context/Api";

const RequestRecruit: React.FC = () => {
  const [recruits, setRecruits] = useState<RecruitRes[]>()
  const [err, setErr] = useState<ErrorData>()
  const client = useClientState()

  useEffect(() => {
    client.client.unAuth(Api.app.grs_api_recruit_get,{}, {}).then(value => {
      if (value.error) return setErr(value.error)
      setRecruits(value.success)
    })
  }, []);

  return(
    <>
      <div style={{
        display: "flex",
        margin: "10px 0px -10px 20px"
      }}>
        <ErrorMessage error={err}/>
        {recruits && recruits.map(recruit =>
          <Recruit recruit={recruit} key={recruit.recruit_id}/>
        )}
      </div>
    </>
  )
};

export default RequestRecruit;