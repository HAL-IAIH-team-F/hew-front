"use client"
import {useState} from "react";
import {useClientState} from "~/api/context/ClientContextProvider";
import {StyledForm} from "../../../../../../util/form/element/StyledForm";
import {StyledInput} from "../../../../../../util/form/element/StyledInput";
import {StyledButton} from "../../../../../../util/form/element/StyledButton";
import {Api} from "~/api/context/Api";

export default function ColabRegisterForm(
    {
        ...props
    }: ColabRegisterFormProps,
) {
    const clientContext = useClientState()
    const [title, setTitle] = useState("");
    const [showPlaceholder, setShowPlaceholder] = useState(false);
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    {/* フォーカス時 */
    }
    const [isTitleFocused, setIsTitleFocused] = useState(false);
    const [isDescriptionFocused, setIsDescriptionFocused] = useState(false);
    // ボタンの有効/無料を判定
    const isButtonDisabled = !title.trim() || !description.trim();
    const [successMessage, setSuccessMessage] = useState<string>("");

    // // AuthBodyResponse の型定義
    // type AuthBodyResponse = {
    //     success?: {
    //         creator_id: string; // number から string に変更
    //         description: string;
    //         recruit_id: string; // number から string に変更
    //         title: string;
    //     };
    //     error?: {
    //         message: string;
    //     };
    // };

    return (
        <StyledForm
            {...props}
            action={async formData => {
                console.log("フォーム送信開始");
                const title = formData.get("title")?.toString().trim() || "";
                const description = formData.get("description")?.toString().trim() || "";
                console.log("取得したタイトル:", title);
                console.log("取得した要項:", description);

                if (!title || !description) {
                    setErrors({
                        title: title ? "" : "募集タイトルを入力してください",
                        description: description ? "" : "募集要項を入力してください",
                    });
                    return;
                }

                if (!clientContext || clientContext.state != "registered") {
                    alert("ログインしてください");
                    return;
                }

                const result = await clientContext.client.authBody(
                    Api.app.pr_api_recruit_post,
                    {},
                    {title, description},
                    {}
                );

                if (result.error) {
                    const errorMessage = result?.error?.message || "予期しないエラーが発生しました。";
                    setErrors((preveErrors) => ({
                        ...preveErrors,
                        submit: errorMessage,
                    }));
                    console.error(`エラー: ${errorMessage}`);
                    return
                }
                // 成功時の処理
                setSuccessMessage("募集投稿しました");
                console.log("APIリクエストが成功しました:", result.success);
                setTitle("");
                setDescription("");
                setErrors({});
            }}
        >

            {/* h1＆募集＆ボタン */}
            <div className="w-full relative "
                 style={{
                     display: "flex",
                     flexDirection: "column",
                     // width: "100%",
                     // height: "100%",
                 }}
            >
                {/* h1 */}
                <div className="mt-11 mb-11 "
                     style={{}}
                >
                    <h1 className="text-left text-6xl text-white"
                        style={{
                            textShadow: "0 0 5px #fff, 0 0 8px #fff",
                        }}
                    >
                        <div
                            style={{}}
                        >
                            <div>
                                コラボ
                            </div>
                            <div
                                style={{
                                    marginTop: "15px",
                                    marginLeft: "50px"
                                }}
                            >
                                募集
                            </div>
                        </div>
                    </h1>
                </div>
                {/* 終了 h1 */}

                {/* 募集フォーム＆ボタン */}
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    padding: "30px 25px 10px 25px",
                    boxSizing: "border-box",
                    borderRadius: "8px",
                    backgroundColor: "rgba(142, 142, 147, 0.35)",
                    boxShadow: "rgba(0, 0, 0, 0.4) 0px 10px 30px, rgba(0, 0, 0, 0.3) 0px 0px 15px inset",
                    border: "1px solid rgba(128, 128, 128, 0.2)",
                }}>
                    <div
                        style={{}}
                    >
                        {/* 募集タイトル＆募集要項 */}
                        <div
                            style={{
                                // marginTop: "15px",
                                // marginLeft
                                // marginBottom: "15px",
                                // position: "relative",
                                // display: "flex",
                                flexDirection: "column",
                                // justifyContent: "flex-start",
                                // minWidth: "600px",
                                // border: "1px solid #ccc", // 外枠
                                // borderRadius: "8px",
                                // padding: "15px",
                                boxSizing: "border-box",
                                color: "white",
                                width: "99%",
                            }}
                        >
                            {/* 募集タイトル */}
                            <div style={{
                                position: "relative",
                                // display: "flex",
                                flexDirection: "column",
                                // justifyContent: "flex-start",
                                alignItems: "center",
                                width: "100%",
                            }}
                                 className=""
                            >
                                {/* 入力フォーム&カウント(募集タイトル) */}
                                <div style={{}}
                                >
                                    {/*　入力フォーム(募集タイトル) */}
                                    <div style={{
                                        margin: "0 auto",
                                    }}
                                    >
                                        <StyledInput
                                            as="input"
                                            name="title"
                                            value={title}
                                            maxLength={20}
                                            placeholder="募集タイトル(必須)"
                                            className="mb-0"
                                            onFocus={() => setIsTitleFocused(true)} // フォーカス時
                                            onBlur={() => setIsTitleFocused(false)} // フォーカス解除時
                                            onChange={(e) => {
                                                setTitle(e.target.value);
                                                if (successMessage) setSuccessMessage(""); // フォーム変更時にリセット
                                                if (errors.title) setErrors((prev) => ({...prev, title: ""}));
                                            }}
                                            style={{
                                                height: "40px",
                                                width: "100%",
                                                borderBottom: "1px dashed #ccc",
                                                borderRadius: "8px 8px 0 0",
                                                padding: "10px",
                                                boxSizing: "border-box",
                                                outline: isTitleFocused ? "none" : "none",
                                                boxShadow: isTitleFocused ? "-5px -5px rgba(255, 255, 255, 0.5)"
                                                    : "none",
                                            }}
                                        />
                                    </div>
                                    {/*　終了 入力フォーム(募集タイトル) */}


                                    {/*　カウンター(募集タイトル) */}
                                    <div
                                        style={{
                                            marginTop: "10px",
                                            marginBottom: "15px",
                                            display: "flex",
                                            justifyContent: "flex-end",
                                            alignItems: "start",
                                            width: "100%",
                                            height: "5px",
                                        }}
                                    >
                                        <span className="
                                            textSize: text-sm
                                            "
                                              style={{
                                                  // textAlign: "right",
                                                  // position: "absolute",
                                                  // top: "70%", // 縦位置を中央に調整
                                                  // right: 430,
                                                  // transform: "translateY(-50%)", // 縦位置調整
                                                  color: "#999", // カウンターの色
                                              }}
                                        >
                                            {title.length}/20
                                        </span>
                                    </div>

                                </div>
                                {/* 終了 入力フォーム&カウント(募集タイトル) */}


                                {/*　エラー(募集タイトル) */}
                                <div style={{
                                    display: "flex",
                                    // alignItems: "left",
                                    justifyContent: "center",
                                    width: "100%",
                                    height: "50px",
                                }}
                                >
                                    <p className="text-red-500"
                                       style={{
                                           marginTop: "0px",
                                           width: "100%",
                                           textAlign: "right",
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
                            >
                                {/* 募集要項&カウント */}
                                <div style={{
                                    position: "relative",
                                    width: "100%",
                                    // minWidth: "600px"
                                }}
                                >
                                    {/* 募集要項 */}
                                    <div
                                        style={{}}
                                    >
                                        <StyledInput
                                            as="textarea"
                                            name="description"
                                            // label=""
                                            value={description}
                                            onChange={(e) => {
                                                setDescription(e.target.value);
                                                if (successMessage) setSuccessMessage(""); // フォーム変更時にリセット
                                                if (errors.description) setErrors((prev) => ({
                                                    ...prev,
                                                    description: ""
                                                }));
                                            }}
                                            onFocus={() => {
                                                setIsDescriptionFocused(true)
                                                setShowPlaceholder(true)
                                            }}
                                            onBlur={() => {
                                                setIsDescriptionFocused(false)
                                                setShowPlaceholder(false)
                                            }}
                                            placeholder={"募集要項(必須)"}
                                            maxLength={200}
                                            className=""
                                            // onMouseOver={(e) => (e.target.style.borderColor = "#328dce")}
                                            style={{
                                                height: "155px",
                                                width: "100%",
                                                textAlign: "left",
                                                verticalAlign: "top",
                                                resize: "none", // ユーザーによるサイズ変更無効
                                                overflow: "auto",
                                                whiteSpace: "pre-wrap", //　改行有効
                                                wordWrap: "break-word", // 長い単語折り返し
                                                borderRadius: "0 0 8px 8px",
                                                padding: "10px",
                                                boxSizing: "border-box",
                                                // border: "1px dashed #ccc",
                                                borderTop: "none", // 上部の線を隠す
                                                outlineOffset: "-3px",
                                                outline: isDescriptionFocused ? "none" : "none",
                                                boxShadow: isDescriptionFocused ? "5px 5px rgba(255, 255, 255, 0.5)"
                                                    : "none",
                                            }}
                                        />
                                    </div>
                                    {/* 終了 (募集要項) */}

                                    {/* カウント (募集要項) */}
                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent: "flex-end",
                                            alignItems: "center",
                                            width: "100%",
                                            height: "30px",
                                        }}
                                    >
                                        <p className="text-gray-500 text-sm"
                                           style={{
                                               color: "#000",
                                           }}
                                        >
                                            {description.length}/200
                                        </p>
                                    </div>
                                    {/* 終了 カウント */}
                                </div>
                                {/* 終了 募集要項&カウント */}

                                <div
                                    style={{
                                        height: "40px",
                                        width: "100%",
                                    }}
                                >
                                    {errors.description &&
                                      <p className="text-red-500"
                                         style={{
                                             textAlign: "right",
                                         }}
                                      >
                                          {errors.description}
                                      </p>
                                    }
                                </div>
                            </div>
                        </div>
                        {/*　終了 募集タイトル＆募集要項 */}
                    </div>

                    <div className=""
                         style={{
                             width: "100%",
                             display: "flex",
                             justifyContent: "space-between",
                             // alignItems: "center",
                         }}
                    >

                        <div style={{
                            marginLeft: "50px",
                            justifyContent: "flexStart", // flex-startかも
                            position: "relative",
                            top: "-10px",
                        }}>
                            {successMessage && (
                                <div style={{}}
                                >
                                    <p className=""
                                       style={{
                                           fontSize: "1.5rem",
                                           color: "white",
                                       }}
                                    >
                                        {successMessage}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* 募集ボタン */}
                        <div
                            style={{
                                // display: "flex",
                                justifyContent: "flex-end",
                            }}
                        >
                            <StyledButton className="disabled:opacity-50 disabled:cursor-not-allowed"
                                          style={{
                                              backgroundColor: "transparent",
                                              transition: "background-color 0.1s ease ",
                                              borderRadius: "8px",
                                              padding: "15px 33px",
                                              color: "white",
                                          }}
                                          onMouseOver={(e) => (e.target.style.backgroundColor = "#32a1ce")}
                                          onMouseOut={(e) => (e.target.style.backgroundColor = "transparent")}
                                          disabled={isButtonDisabled}
                                // onClick={handleSubmit}
                            >
                                募集
                            </StyledButton>
                        </div>
                    </div>
                </div>
                {/* 終了 募集フォーム＆ボタン */}
            </div>
            {/* 終了 h1＆募集＆ボタン */}
        </StyledForm>
    );
}

export interface ColabRegisterFormProps {
}
