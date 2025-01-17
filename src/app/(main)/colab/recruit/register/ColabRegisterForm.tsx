"use client"
import { useState } from "react";
import {useClientContextState} from "~/api/context/ClientContextProvider";
import {StyledForm} from "../../../../../util/form/element/StyledForm";
import {StyledInput} from "../../../../../util/form/element/StyledInput";
import {StyledButton} from "../../../../../util/form/element/StyledButton";
import {Api} from "~/api/context/Api";

export default function ColabRegisterForm({...props}: ColabRegisterFormProps,) {
    const clientContext = useClientContextState()
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // ボタンの有効/無料を判定
    const isButtonDisabled =!title.trim() || !description.trim();
    console.log("isButtonDisabled:", isButtonDisabled);

    const handleSubmit = async () => {
        if (isButtonDisabled) {
            setErrors({
                title: title.trim() ? "": "募集タイトルを入力してください",
                description: description.trim() ? "": "募集要項を入力してください",
            });
            return;
        }

        if (!clientContext || clientContext.state !== "authenticated") {
            alert("ログインしてください");
            return;
        }

        try {
            const result = await clientContext.client.authBody(
                Api.app.pr_api_recruit_post,
                {},
                { title, description },
                {}
            );

            if (!result || result.error) {
                const errorMessage = result?.error?.message || "予期しないエラーが発生しました。";
                setErrors({ submit: errorMessage });
                alert(`エラー: ${errorMessage}`);
                return;
            }

            alert("募集投稿が成功しました！")
            setTitle("");
            setDescription("");
            setErrors({});
        } catch (error) {
            console.log("送信中にエラーが発生しました",error);
            setErrors({submit: "送信中にエラーが発生しました"});
            alert("送信中にエラーが発生しました");
        }
    };

    return (
        <StyledForm onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
            <div className="w-full h-screen bg-ocean-wave bg-[length:200%_200%] animate-wave relative">
                {/* 背景に複数の円を追加 */}
                {Array.from({ length: 100 }).map((_, index) => (
                    <div
                        key={index}
                        className="animate-rise bg-blue w-8 h-8 rounded-full absolute"
                        style={{
                            top: `${Math.random() * 100}%`, // ランダムな位置に配置
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`, // ランダムなアニメーションの遅延
                        }}
                    ></div>
                ))}

                <div>
                    <h1 className="pt-24 mb-44 text-center text-5xl text-white">コラボ募集</h1>
                </div>
                <div style={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                }}
                     className="mb-12 m-auto"
                >
                    <div style={{position: "relative",
                                width: "100%",
                                minWidth: "600px",
                                }}>
                        <StyledInput
                            name="title"
                            label="募集タイトル"
                            value={title}
                            onChange={(e) => {
                                setTitle(e.target.value)
                                if (errors.title) setErrors((prev) => ({...prev, title: ""}));
                            }}
                            maxLength={20}
                            placeholder="20文字以内で入力してください"
                            className=""
                            style={{height: "40px", width: "100%"}} // 入力フィールドを幅100%にする
                        />
                        <p className="text-gray-500 text-sm"
                           style={{
                               position: "absolute",
                               bottom: "10px",
                               right: "100px",
                           }}
                        >
                            {title.length}/20 文字
                        </p>
                        <p className="mt-2 text-red-500"
                           style={{
                               width: "240px",
                               position: "absolute",
                               bottom: "-20px",
                               left: "220px",
                           }}
                        >
                            {errors.title}
                        </p>
                    </div>
                </div>


                <div style={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                }}
                     className="mb-12 m-auto"
                >
                    <div style={{position: "relative", width: "100%", minWidth: "600px"}}>
                        <StyledInput
                            as="textarea"
                            name="description"
                            label="募集要項"
                            value={description}
                            onChange={(e) => {
                                setDescription(e.target.value);
                                if (errors.description) setErrors((prev) => ({...prev, description: ""}));
                            }}
                            maxLength={200}
                            placeholder="200文字以内で入力してください"
                            className=""
                            style={{
                                height: "200px",
                                width: "100%",
                                textAlign: "left",
                                verticalAlign: "top",
                                resize: "none", // ユーザーによるサイズ変更無効
                                overflow: "auto",
                                whiteSpace: "pre-wrap", //　改行有効
                                wordWrap: "break-word", // 長い単語折り返し
                            }}
                        />
                        <p className="text-gray-500 text-sm"
                           style={{
                               position: "absolute",
                               bottom: "10px",
                               right: "100px",
                           }}
                        >
                            {description.length}/200 文字
                        </p>
                        {errors.description &&
                            <p className="mt-2 text-red-500"
                               style={{
                                   width: "240px",
                                   position: "absolute",
                                   bottom: "-20px",
                                   left: "220px",
                               }}
                            >
                                {errors.description}
                            </p>
                        }
                    </div>
                </div>
                <StyledButton
                    className="mt-5 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isButtonDisabled}
                    onClick={handleSubmit}
                >
                    募集する
                </StyledButton>
                {errors.submit && <p className="text-red-500 mt-2">{errors.submit}</p>}
            </div>
        </StyledForm>
    );
}

export interface ColabRegisterFormProps {
}
