import { useState, useEffect } from "react";
import { motion } from "framer-motion"; // Framer Motion を追加
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
    const [backgroundImage, setBackgroundImage] = useState<string | undefined>("none");

    const [style, setStyle] = useState({
        width: "30%",
        minHeight: "100px",
        paddingRight: "20px",
    });

    useEffect(() => {
        if (!backgroundImage || backgroundImage === "none") {
            setBackgroundImage("../../../../../../public/2020-01-01_09.26.42.png");
        }

        const updateStyles = () => {
            const width = window.innerWidth;

            setStyle({
                width: width >= 1400 ? "18%" :
                    width >= 1024 ? "40%" :
                        // width >= 768  ? "80%" :
                            width >= 770  ? "70%" : "90%",
                minHeight: width >= 1400 ? "260px" :
                    width >= 1024 ? "280px" :
                        width >= 768  ? "90%" :
                            width >= 640  ? "90%" : "100px",
                paddingRight:
                    width >= 1850 ? "20px" :
                        width >= 1260 ? "45px" :
                            width >= 768 ? "45px" :
                                "20px",
            });
        };

        updateStyles();
        window.addEventListener("resize", updateStyles);

        return () => window.removeEventListener("resize", updateStyles);
    }, [backgroundImage]);

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
        <motion.div
            key={recruit.recruit_id}
            className="border-2 group flex flex-col rounded-lg shadow-lg bg-white bg-opacity-50 backdrop-blur-md
                       hover:shadow-xl transition-shadow"
            initial={{ scale: 1, zIndex: 1 }}
            whileHover={{
                scale: 1.1,
                zIndex: 10,
                translateY: "-5px",
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{
                width: style.width,
                minHeight: style.minHeight,
                background: backgroundImage && backgroundImage !== "none"
                    ? `url(${backgroundImage}) center/cover no-repeat`
                    : "none",
                boxSizing: "border-box",
                overflow: "hidden",
                borderColor: "transparent",
                borderStyle: "none",
                justifyContent: "end",
                position: "relative",
            }}
        >
            <CreatorData
                creator_id={recruit?.creator_id ?? ""}
                showView={false}
                onDataFetched={({ iconUrl }) => {
                    if (iconUrl) {
                        setBackgroundImage(iconUrl);
                    }
                }}
            />
            <div className="flex flex-col"
                style={{ width: "style.width"}}
            >
                <div style={{ }}></div>

                <div
                    style={{
                        display: "flex",
                        backgroundColor: "rgba(166, 166, 166, 0.2)",
                        backdropFilter: "blur(5px) brightness(0.)",
                        borderRadius: "0 0 8px 8px",
                        padding: `10px ${style.paddingRight} 8px 10px`,
                    }}
                >
                    <div style={{ color: "white", padding: "10px ${style.paddingRight} 8px 10px",width: "100%" }}>
                        <h1
                            className="group-hover:text-[#35b0f0] font-bold text-sm sm:text-base md:text-lg linee-clamp-2"
                            style={{
                                maxHeight: "30px",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {recruit.title.length > 7 ? recruit.title.substring(0, 7) + "..." : recruit.title}
                        </h1>
                        <p
                            className="group-hover:text-[#35b0f0] text-xs sm:text-sm md:text-base"
                            style={{
                                maxHeight: "30px",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {recruit.description.length > 8 ? recruit.description.substring(0, 8) + "..." : recruit.description}
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
        </motion.div>
    );
};
