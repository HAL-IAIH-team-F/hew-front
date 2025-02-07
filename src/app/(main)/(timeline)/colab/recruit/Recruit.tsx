import { useState, useEffect } from "react";
import { RecruitRes } from "./RecruitRes";
import { useClientState } from "~/api/context/ClientContextProvider";
import { Api } from "~/api/context/Api";
import { ErrorData } from "../../../../../util/err/err";
import { ErrorMessage } from "../../../../../util/err/ErrorMessage";
import { CreatorData } from "~/products/ProfileProductsView";
import Button from "./Button";

export default function Recruit({ recruit }: { recruit: RecruitRes }) {
    const clientContext = useClientState();
    const [err, setErr] = useState<ErrorData>();
    const [backgroundImage, setBackgroundImage] = useState<string>("none");
    const [backgroundSize, setBackgroundSize] = useState<string>("cover");
    const [padding, setPadding] = useState("1px 15px 3px 10px");
    const [hoverSize, setHoverSize] = useState<string>("cover");

    const [style, setStyle] = useState({
        width: "100%",
        minHeight: "100px",
        backgroundSize: "cover",
    });

    useEffect(() => {
        if (!backgroundImage || backgroundImage === "none") {
            setBackgroundImage("../../../../../../public/2020-01-01_09.26.42.png");
        }

        const updateStyles = () => {
            const width = window.innerWidth;

            if (width > 768 && width < 1024) {
                setHoverSize("750%")
            }
            else if (width < 768) {
                setHoverSize("350%")
            } else {
                setHoverSize("250%")
            }


            //  `padding-right` の設定を 1850px ～ 1400px の範囲で変更
            if (width >= 1850) {
                setPadding("10px 20px 8px 10px"); // 1850px以上はデフォルト
            } else if (width >= 1260) {
                setPadding("10px 45px 8px 10px"); // 1400px ～ 1650px は `右 45px`
            } else if (width >= 768) {
                setPadding("10px 45px 8px 10px")
            } else {
                setPadding("10px 20px 8px 10px"); // 1400px 未満はデフォルト
            }

            const newStyle = {
                width: width >= 1400 ? "18%" :
                    width >= 1024 ? "20%" :
                        width >= 768  ? "40%" :
                            width >= 640  ? "70%" : "90%",
                minHeight: width >= 1400 ? "200px" :
                    width >= 1024 ? "180px" :
                        width >= 768  ? "90%" :
                            width >= 640  ? "90%" : "100px",
                backgroundSize: backgroundSize,
            };

            setStyle((prevStyle) =>
                JSON.stringify(prevStyle) === JSON.stringify(newStyle)
                    ? prevStyle
                    : { ...newStyle }
            );
        };

        updateStyles(); // 初回実行
        window.addEventListener("resize", updateStyles);
        return () => window.removeEventListener("resize", updateStyles);
    }, [backgroundImage]);

    const handleMouseEnter = () => {
        setBackgroundSize(hoverSize);
    };

    const handleMouseLeave = () => {
        setBackgroundSize("cover");
    };

    const handleClick = () => {
        setErr(undefined);
        if (clientContext.state !== "registered") {
            throw new Error("クリエイター登録が必要です");
        }
        clientContext.client
            .authBody(Api.app.pcr_api_colab_request_post, {}, { recruit_id: recruit.recruit_id }, {})
            .then((value) => {
                if (!value.error) return;
                setErr(value.error);
            });
    };

    return (
        <div
            key={recruit.recruit_id}
            className="border-2 group flex flex-col rounded-lg shadow-lg bg-white bg-opacity-50 backdrop-blur-md
                       hover:shadow-xl transition-shadow"
            style={{
                ...style,
                backgroundImage: backgroundImage && backgroundImage !== "none" ? `url(${backgroundImage})` : "none",
                backgroundSize: backgroundSize,
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                boxSizing: "border-box",
                overflow: "hidden",
                transition: "background-size 0.75s ease-in-out",
                borderColor: "transparent",
                borderStyle: "none",
                justifyContent: "end",
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
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
            <div className="flex flex-col">
                <div style={{ width: "100%" }}></div>

                <div
                    style={{
                        display: "flex",
                        width: "100%",
                        backgroundColor: "rgba(166, 166, 166, 0.2)",
                        backdropFilter: "blur(5px) brightness(0.7)",
                        borderRadius: "0 0 8px 8px",
                        padding: padding, // ✅ `padding` を `style` から分離
                    }}
                >
                    <div style={{
                        color: "white",
                        width: "85%",
                    }}>
                        <h1 className="group-hover:text-[#cbe8f7] font-bold text-sm sm:text-base md:text-lg">
                            {recruit.title}
                        </h1>
                        <p className="group-hover:text-[#cbe8f7] text-xs sm:text-sm md:text-base">
                            {recruit.description}
                        </p>
                    </div>

                    <div style={{
                        color: "white",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        width: "30%",
                    }}>
                        <Button onClick={handleClick} disabled={clientContext.state !== "registered"}>
                            Hi!
                        </Button>
                    </div>
                </div>

                <ErrorMessage error={err} />
            </div>
        </div>
    );
};

