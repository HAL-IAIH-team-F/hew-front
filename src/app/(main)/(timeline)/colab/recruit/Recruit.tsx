import {RecruitRes} from "./RecruitRes";
import {useClientState} from "~/api/context/ClientContextProvider";
import {useState} from "react";
import {Api} from "~/api/context/Api";
import {ErrorData} from "../../../../../util/err/err";
import {ErrorMessage} from "../../../../../util/err/ErrorMessage";

export default function Recruit({ recruit }: { recruit: RecruitRes }) {
  const clientContext = useClientState();
  const [err, setErr] = useState<ErrorData>();

  return (
    <div
      key={recruit.recruit_id}
      className="border-2 border-gray-300 p-4 m-4"
    >
      {/* タイトル */}
      <h1>{recruit.title}</h1>

      {/* ここから表示部分のラベルを日本語に */}
      <p>ID: {recruit.recruit_id}</p>
      <p>説明: {recruit.description}</p>
      <p>作成者: {recruit.creator_id}</p>

      {/* ボタンのラベルを変更 */}
      <button
        onClick={() => {
          setErr(undefined);
          if (clientContext.state !== "registered") {
            throw new Error("not authenticated");
          }
          clientContext.client
            .authBody(
              Api.app.pcr_api_colab_request_post,
              {},
              { recruit_id: recruit.recruit_id },
              {}
            )
            .then((value) => {
              if (!value.error) return;
              setErr(value.error);
            });
        }}
        className="border-2 border-gray-300 p-1 hover:bg-gray-200"
      >
        リクエスト
      </button>
      <ErrorMessage error={err} />
    </div>
  );
}
