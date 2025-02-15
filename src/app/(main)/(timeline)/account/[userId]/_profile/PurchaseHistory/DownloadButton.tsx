import { useEffect, useState } from "react";
import { Img } from "~/api/context/Api";
import { ErrorData } from "../../../../../../../util/err/err";
import { ErrorMessage } from "../../../../../../../util/err/ErrorMessage";
import { PurchaseInfo } from "@/(main)/search/sample/ProductRes";
import { Download } from "lucide-react";

const DownloadButton = ({
  purchaseInfo,
}: {
  purchaseInfo: PurchaseInfo;
}) => {
  const [url, setUrl] = useState<Img>();
  const [err, setErr] = useState<ErrorData>();

  useEffect(() => {
    setErr(undefined);
    Img.create(purchaseInfo.content_uuid, purchaseInfo.token.token).then(
      (value) => {
        if (value.error) return setErr(value.error);
        setUrl(value.success);
      }
    );
  }, [purchaseInfo]);

  return (
    <div className="inline-block">
      <a
        href={url?.strUrl(true)}
        target="_blank"
        className="relative block w-24 h-20 rounded-lg overflow-hidden group transition-colors duration-300 bg-purple-700 hover:bg-purple-600 before:absolute before:inset-0 before:bg-blue-600 before:content-['']"
        data-tooltip="Download"
        >
        {/* Text layer */}
        <div className="absolute inset-0 flex items-center justify-center text-white transition-all duration-500 transform group-hover:-translate-y-full">
          Download
        </div>

        {/* Icon layer */}
        <div className="absolute inset-0 flex items-center justify-center text-white transition-all duration-500 transform translate-y-full group-hover:translate-y-0">
          <Download size={20} />
        </div>
      </a>
      <ErrorMessage error={err} />
    </div>
  );
};

export default DownloadButton;