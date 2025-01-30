import {RecruitRes} from "./RecruitRes"
import {useClientState} from "~/api/context/ClientContextProvider";
import {useState} from "react";
import {Api} from "~/api/context/Api";
<<<<<<< HEAD:src/app/(main)/colab/recruit/Recruit.tsx
import {ErrorData} from "../../../../util/err/err";
import {ErrorMessage} from "../../../../util/err/ErrorMessage";
import styled from "styled-components";


// ✅ TSX 内でスタイルを定義
const Button = styled.button`
  display: block;
  text-align: center;
  vertical-align: middle;
  text-decoration: none;
  width: 70px; /* ✅ サイズ小さく */
  margin: auto;
  padding: 0.5rem 0rem; /* ✅ 余白を小さく */
  color: #fff;
  font-weight: bold;
  background-color: rgba(0, 0, 0, 0.5); /* ✅ 背景を半透明の黒に */
  position: relative;
  transition: 0.3s ease-in-out;
  border: none;
  cursor: pointer;
  overflow: hidden;
  border-radius: 20px; /* ✅ 角を丸くする */

  /* ホバー時の背景変更 */
  &:hover {
    background: #fff;
    color: rgba(0, 0, 0, 0.5);
  }

  /* ボーダーアニメーション */
  &::before,
  &::after {
    box-sizing: inherit;
    content: "";
    position: absolute;
    border: 2px solid transparent;
    width: 0;
    height: 0;
    border-radius: 20px; /* ✅ ボーダーも丸く */
  }

  &::before {
    top: 0;
    left: 0;
  }

  &::after {
    bottom: 0;
    right: 0;
  }

  &:hover::before,
  &:hover::after {
    width: 100%;
    height: 100%;
  }

  &:hover::before {
    border-top-color: #fff;
    border-right-color: #fff;
    transition: width 0.15s ease-out, height 0.15s ease-out 0.15s;
  }

  &:hover::after {
    border-bottom-color: #cbe8f7;
    border-left-color: #fff;
    transition: border-color 0s ease-out 0.2s, width 0.15s ease-out 0.2s, height 0.15s ease-out 0.3s;
  }
`;

=======
import {ErrorData} from "../../../../../util/err/err";
import {ErrorMessage} from "../../../../../util/err/ErrorMessage";
>>>>>>> develop:src/app/(main)/(timeline)/colab/recruit/Recruit.tsx

export default function Recruit(
  {
    recruit,
  }: {
    recruit: RecruitRes
  },
) {
  const clientContext = useClientState()
  const [err, setErr] = useState<ErrorData>()

  return (
    <div
      key={recruit.recruit_id}
      className="border-2 group flex flex-col rounded-lg shadow-lg bg-white bg-opacity-50 backdrop-blur-md hover:shadow-xl transition-shadow"
      style={{
        backgroundImage: "url('/109671135_p2_master1200.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        // padding: "35px 25px",
        width: "22%",
        height: "180px",
        margin: "3px",
        boxSizing: "border-box",
        overflow: "hidden",
        transition: "background-size 0.75s ease-in-out",
        borderColor: "transparent",
        borderStyle: "none",
      }}
      onMouseEnter={(e) => e.currentTarget.style.backgroundSize = "110%"} // ✅ ホバー時にズーム
      onMouseLeave={(e) => e.currentTarget.style.backgroundSize = "100%"} // ✅ 戻す
    >
      <div style={{
          display: "flex",
          flexDirection: "column",
      }}>

        <div
          style={{
            height: "120px",
            width: "100%",
          }}
        >
        </div>

        <div
          style={{
            display: "flex",
            width: "100%",
            backgroundColor: "rgba(166, 166, 166, 0.2)", // ✅ 半透明の黒背景
            backdropFilter: "blur(5px) brightness(0.7)", // ✅ 背景ぼかし + 薄暗くする
            borderRadius: "0 0 8px 8px", // ✅ 角丸でガラスっぽく
            padding: "5px 25px 11px 15px", // ✅ 内側に余白を追加
          }}
        >
          <div style={{
            // display: "flex",
            // width: "70%",
            // flexDirection: "column",
            color: "white",
            width: "85%",
          }}>

            <div
              style={{
                // marginLeft: "5px",
                // maxWidth: "100%", // ✅ 親要素をはみ出さない
                // backgroundColor: "rgba(0, 0, 0, 0.3)", // ✅ 半透明の黒背景
                // backdropFilter: "blur(5px) brightness(0.7)", // ✅ 背景ぼかし + 薄暗くする
                // borderRadius: "8px", // ✅ 角丸でガラスっぽく
                // padding: "5px 25px 5px 15px", // ✅ 内側に余白を追加
                // display: "inline-block", // ✅ 文字数に応じて幅を調整
              }}
            >
              <h1
                className="group-hover:text-[#cbe8f7] font-bold"
                style={{
                  width: "100%",
                  position: "relative",
                }}
              >
                {recruit.title}
              </h1>

              <div className="">
                <p className="group-hover:text-[#cbe8f7] text-sm">
                  {recruit.description}
                </p>
              </div>

              {/* <div className="">
                <p className="group-hover:text-red-500 text-xs">
                  Creator: {recruit.creator_id}
                </p>
              </div> */}
            </div>
          </div>

          <div
            style={{
              // marginTop: "50px",
              // marginRight: "15px",
              color: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              width: "30%",
            }}
          >
            <Button
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
              style={{
                // width: "70px",
                // backgroundColor: "rgba(0, 0, 0, 0.5)",
                // borderRadius: "20px",
                }}
              >
              話す
            </Button>
          </div>
        </div>

        <ErrorMessage error={err} />
      </div>
    </div>
  );
}

