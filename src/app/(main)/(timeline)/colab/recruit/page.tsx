"use client"
import React, {useEffect, useState} from "react";
import {useClientState} from "~/api/context/ClientContextProvider";
import {ErrorData} from "../../../../../util/err/err";
import {RecruitRes} from "@/(main)/(timeline)/colab/recruit/RecruitRes";
import Recruit from "@/(main)/(timeline)/colab/recruit/Recruit";
import {Api} from "~/api/context/Api";
import LoginNeed from "~/UI/loginNeed";

const RequestRecruit: React.FC = () => {
    const [recruits, setRecruits] = useState<RecruitRes[]>()
    const [err, setErr] = useState<ErrorData>()
    const client = useClientState()

    useEffect(() => {
        client.client.unAuth(Api.app.grs_api_recruit_get, {}, {}).then(value => {
            if (value.error) return setErr(value.error)
            setRecruits(value.success)
        })
    }, []);
    const clientState = useClientState();
    if (clientState.state !== "registered") {
        return (
            <div>
                <LoginNeed/>
            </div>
        )
    }

    return (
        <>
            <div style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                height: "100%",
                width: "100%",
                borderRadius: "0 16px 16px 0", // 角を少し丸める
                background: "linear-gradient(135deg, rgba(135, 206, 235, 0.3), rgba(255, 255, 255, 0.1))", // 青空っぽいグラデーション
                backdropFilter: "blur(8px)", // 背景のぼかし効果を追加
                boxShadow: "0px 4px 30px rgba(0, 0, 0, 0.3)", // 軽い影
                border: "1px solid rgba(255, 255, 255, 0.3)", // 微妙な白い枠線
            }}
                    className="hide-scrollbar"
            >
                {/* <ErrorMessage error={err}/> */}
                {recruits && recruits.map(recruit =>
                    <Recruit recruit={recruit} key={recruit.recruit_id}/>
                )}
            </div>
            <style jsx>{`
              .hide-scrollbar {
                scrollbar-width: none; /* Firefox用 */
              }
              .hide-scrollbar::-webkit-scrollbar {
                display: none; /* Chrome, Safari, Edge用 */
              }
            `}</style>
        </>
    )
};

export default RequestRecruit;