import {RecruitRes} from "./RecruitRes"
import {useClientState} from "~/api/context/ClientContextProvider";
import {useState, useEffect} from "react";
import {Api} from "~/api/context/Api";
import {ErrorData} from "../../../../../util/err/err";
import {ErrorMessage} from "../../../../../util/err/ErrorMessage";
import {CreatorData} from "../../../../../components/products/ProfileProductsView";
import Button from "./Button";

export default function Recruit({ recruit }: { recruit: RecruitRes }) {

    const clientContext = useClientState()
    const [err, setErr] = useState<ErrorData>()
    const [backgroundImage, setBackgroundImage] = useState<string>("none");


    useEffect(() => {
        if (!backgroundImage || backgroundImage === "none") {
            setBackgroundImage("../../../../../../public/2020-01-01_09.26.42.png");
        }
    }, []);

    const handleClick = () => {
        setErr(undefined);
        if (clientContext.state !== "registered") {
            throw new Error("クリエイター登録が必要です");
        }
        clientContext.client
            .authBody(Api.app.pcr_api_colab_request_post, {}, {recruit_id: recruit.recruit_id}, {})
            .then((value) => {
                if (!value.error) return;
                setErr(value.error);
            });
        };

    return (
        <div
            key={recruit.recruit_id}
            className="border-2 group flex flex-col rounded-lg shadow-lg bg-white bg-opacity-50 backdrop-blur-md hover:shadow-xl transition-shadow"
            style={{
                backgroundImage: backgroundImage && backgroundImage !== "none" ? `url(${backgroundImage})` : "none",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                width: "22%",
                height: "180px",
                margin: "3px",
                boxSizing: "border-box",
                overflow: "hidden",
                transition: "background-size 0.75s ease-in-out",
                borderColor: "transparent",
                borderStyle: "none",
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundSize = "190%"} // ✅ ホバー時にズーム
            onMouseLeave={(e) => e.currentTarget.style.backgroundSize = "160%"} // ✅ 戻す
        >
            {/*  `onIconUrlChange` を渡して、CreatorData から背景画像を取得 */}
            <CreatorData
                creator_id={recruit?.creator_id ?? ""}
                showView={false}
                onDataFetched={({ iconUrl }) => {
                    if (iconUrl) {
                        setBackgroundImage(iconUrl);
                    }
                }}
            />
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
                        backgroundColor: "rgba(166, 166, 166, 0.2)", // 半透明の黒背景
                        backdropFilter: "blur(5px) brightness(0.7)", // 背景ぼかし + 薄暗くする
                        borderRadius: "0 0 8px 8px", // 角丸でガラスっぽく
                        padding: "5px 25px 11px 15px", // 内側に余白を追加
                    }}
                >
                    <div style={{
                        color: "white",
                        width: "85%",
                    }}>

                        <div
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
                        </div>
                    </div>

                    <div
                        style={{
                            color: "white",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-end",
                            width: "30%",
                        }}
                    >
                        <Button onClick={handleClick} disabled={clientContext.state !== "registered"}>
                            Hey
                        </Button>
                    </div>
                </div>

                <ErrorMessage error={err}/>
            </div>
        </div>
    );
};

