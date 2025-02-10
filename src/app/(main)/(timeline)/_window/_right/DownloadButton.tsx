import {PurchaseInfo} from "~/res/ProductRes";
import {useEffect, useState} from "react";
import {Img} from "~/api/context/Api";
import {ErrorData} from "../../../../../util/err/err";
import {ErrorMessage} from "../../../../../util/err/ErrorMessage";

export default function DownloadButton(
    {
        purchaseInfo,
    }: {
        purchaseInfo: PurchaseInfo
    },
) {
    const [url, setUrl] = useState<Img>()
    const [err, setErr] = useState<ErrorData>()
    useEffect(() => {
        setErr(undefined)
        Img.create(purchaseInfo.content_uuid, purchaseInfo.token.token).then(value => {
            if (value.error) return setErr(value.error)
            setUrl(value.success)
        })
    }, [purchaseInfo]);
    return (
        <>
            <a href={url?.strUrl(true)} target={"_blank"}>
                download
            </a>
            <ErrorMessage error={err}/>
        </>
    )
}
