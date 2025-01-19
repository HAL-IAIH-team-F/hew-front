"use client"
import { useState, useEffect } from "react";
import {useClientContextState} from "~/api/context/ClientContextProvider";
import {StyledForm} from "../../../../../util/form/element/StyledForm";
import {StyledInput} from "../../../../../util/form/element/StyledInput";
import {StyledButton} from "../../../../../util/form/element/StyledButton";
import {Api} from "~/api/context/Api";

export default function ColabRegisterForm({...props}: ColabRegisterFormProps,) {
    const clientContext = useClientContextState();
    const [title, setTitle] = useState("");
    const [showPlaceholder, setShowPlaceholder] = useState(false);
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 1669);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 480);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

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
            <div className="w-full relative "
                style={{
                    display: "flex",
                    flexDirection: "column",
                    // width: "100%",
                    // height: "100%",
                }}
            >
                <div className="mt-5 "
                    style={{ marginBottom: "70px" }}
                >
                    <h1 className="text-left text-6xl text-white"
                        style={{
                            textShadow: "0 0 5px #fff, 0 0 8px #fff",
                        }}
                    >
                        コラボ募集
                    </h1>
                </div>
                <div
                    style={{
                        // marginLeft: "auto",
                        position: "relative",
                        // display: "flex",
                        flexDirection: "column",
                        // justifyContent: "flex-start",
                        minWidth: "600px",
                        // border: "1px solid #ccc", // 外枠
                        // borderRadius: "8px",
                        padding: "0",
                        boxSizing: "border-box",
                        color: "white",
                        width: "auto",
                    }}
                >
                    {/* 募集タイトル */}
                    <div style={{
                        position: "relative",
                        // display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        width: "100%",
                    }}
                         className=""
                    >
                        {/* 入力フォーム(募集タイトル) */}
                        <div style={{
                            // position: "relative",

                        }}
                        >
                            <StyledInput
                                // name="title"
                                // label="募集タイトル"
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value)
                                    if (errors.title) setErrors((prev) => ({...prev, title: ""}));
                                }}
                                maxLength={20}
                                placeholder="募集タイトル(必須)"
                                className="mb-0"
                                style={{
                                    height: "40px",
                                    width: "100%",
                                    borderBottom: "1px dashed #ccc",
                                    borderRadius: "8px 8px 0 0",
                                    padding: "10px",
                                    boxSizing: "border-box",
                                }} // 入力フィールドを幅100%にする
                            />
                            {/*　カウンター(募集タイトル) */}
                            <span
                                style={{
                                    position: "absolute",
                                    top: "70%", // 縦位置を中央に調整
                                    right: isMobile ? "200px" : "450px",
                                    transform: "translateY(-50%)", // 縦位置調整
                                    fontSize: "12px", // カウンターの文字サイズ
                                    color: "#999", // カウンターの色
                                }}
                            >
                                {title.length}/20
                            </span>
                            {/*<style>*/}
                            {/*    {*/}
                            {/*        `*/}
                            {/*        @media (max-width: 480px) {*/}
                            {/*            .fix-title {*/}
                            {/*            right: 20px;*/}
                            {/*            }*/}
                            {/*        }            */}
                            {/*    `}*/}
                            {/*</style>*/}
                            {/*　エラー(募集タイトル) */}
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
                        // display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "stretch", // 横幅に揃えることができるが、いらないかも
                        width: "100%",
                    }}
                         className=""
                    >
                        <div style={{position: "relative", width: "100%", minWidth: "600px"}}>
                            <StyledInput
                                as="textarea"
                                // name="description"
                                label=""
                                value={description}
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                    if (errors.description) setErrors((prev) => ({...prev, description: ""}));
                                }}
                                onFocus={() => setShowPlaceholder(true)}
                                onBlur={() => setShowPlaceholder(false)}
                                // placeholder={showPlaceholder ? "募集要項" : ""}
                                placeholder={"募集要項(必須)"}
                                maxLength={200}
                                className=""
                                style={{
                                    height: "400px",
                                    width: "100%",
                                    textAlign: "left",
                                    verticalAlign: "top",
                                    resize: "none", // ユーザーによるサイズ変更無効
                                    overflow: "auto",
                                    whiteSpace: "pre-wrap", //　改行有効
                                    wordWrap: "break-word", // 長い単語折り返し
                                    borderTop: "none", // 上部の線を隠す
                                    borderRadius: "0 0 8px 8px", // 下部角丸
                                    padding: "10px",
                                    boxSizing: "border-box",
                                }}
                            />
                            <p className="text-gray-500 text-sm"
                               style={{
                                   position: "absolute",
                                   bottom: "10px",
                                   right: "425px",
                               }}
                            >
                                {description.length}/200
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
                </div>
                <div className=""
                    style={{

                    }}
                >
                    <StyledButton
                        className="mt-5 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isButtonDisabled}
                        onClick={handleSubmit}
                    >
                        募集
                    </StyledButton>
                </div>
                {/*{errors.submit && <p className="text-red-500 mt-2">{errors.submit}</p>}*/}
            </div>
        </StyledForm>
    );
}

export interface ColabRegisterFormProps {}
