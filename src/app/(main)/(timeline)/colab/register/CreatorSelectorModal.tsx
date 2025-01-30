import ModalHeader from "@/(main)/(timeline)/colab/register/ModalHeader";
import {useEffect, useState} from "react";
import {useClientState} from "~/api/context/ClientContextProvider";
import {Api} from "~/api/context/Api";
import {ErrorData} from "../../../../../util/err/err";
import {ErrorMessage} from "../../../../../util/err/ErrorMessage";
import {CreatorRes} from "@/(main)/(timeline)/colab/register/CreatorRes";
import CreatorSelectorItem from "@/(main)/(timeline)/colab/register/CreatorSelectorItem";

export default function CreatorSelectorModal(
  {
    onCloseRequest, oneSelect,
  }: {
    onCloseRequest: () => void,
    oneSelect: (creator: CreatorRes) => void,
  },
) {
  const [creators, setCreators] = useState<CreatorRes[]>([])
  const clientContext = useClientState()
  const [err, setErr] = useState<ErrorData>()
  useEffect(() => {
    if (clientContext.state == "loading") return
    clientContext.client.unAuthOrAuth(
      Api.app.gcs_api_creator_get, {}, {}
    ).then(value => {
      if (value.error) return setErr(value.error)

      setCreators(value.success)
    })
  }, [clientContext.state]);

  return (
    <>
      <div className={"fixed flex top-0 left-0 w-full h-full bg-[#0003] justify-center items-center"}
           onClick={onCloseRequest}>
        <div
          className={"w-[500px] h-96 bg-white opacity-100 overflow-y-scroll"} onClick={(e) => e.stopPropagation()}
        >
          <ModalHeader onCloseRequest={onCloseRequest}/>
          <ErrorMessage error={err}/>
          {creators.map(creator => <CreatorSelectorItem
            key={creator.creator_id} creator={creator} oneSelect={() => oneSelect(creator)}
          />)}
        </div>
      </div>
    </>
  )
}
