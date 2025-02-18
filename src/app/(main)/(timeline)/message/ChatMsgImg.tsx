import {useEffect, useState} from "react";
import {Img} from "~/api/context/Api";
import {ErrorData} from "../../../../util/err/err";
import {ErrorMessage} from "../../../../util/err/ErrorMessage";

export default function ChatMsgImg(
    {
      img_uuid,
    }: {
      img_uuid: string
    },
) {
  const [url, setUrl] = useState<string>()
  const [err, setErr] = useState<ErrorData>()
  useEffect(() => {
    Img.create(img_uuid, undefined).then(value => {
      if (value.error) {
        setErr(value.error)
        return
      }
      setUrl(value.success.strUrl())
    })
  }, [img_uuid]);
  return (
      err ? <ErrorMessage error={err}/> : <img
          src={url}
          alt={`attachment-${img_uuid}`}
          className="h-20 w-20 rounded-md object-cover border border-gray-700"
      />
  )
}
