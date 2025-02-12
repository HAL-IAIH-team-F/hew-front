"use client";
import { ChangeEvent, useState } from "react";
import { Dialog } from "@headlessui/react";
import { Api } from "~/api/context/Api";
import { useClientState } from "~/api/context/ClientContextProvider";
import { StyledForm } from "../../../../../util/form/element/StyledForm";
import { StyledInput } from "../../../../../util/form/element/StyledInput";
import { StyledButton } from "../../../../../util/form/element/StyledButton";
import { newRegisteredClientState } from "~/api/context/ClientState";
import { Camera, Upload, CheckCircle, Loader2 } from "lucide-react";

export default function UserRegisterForm({...props}: UserRegisterFormProps) {
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false); // 登録中フラグ
    const [isCompleted, setIsCompleted] = useState(false); // 完了フラグ
    const clientContext = useClientState();

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <StyledForm 
            {...props} 
            className="max-w-2xl mx-auto p-8 rounded-2xl bg-transparent"
            action={async formData => {
                setIsSubmitting(true);
                setIsCompleted(false);

                if (clientContext.state !== "unregistered") {
                    setIsSubmitting(false);
                    throw new Error("not authenticated");
                }

                const icon_file = formData.get("icon") as File | undefined;
                const user_name = formData.get("user_name");

                if (typeof user_name !== 'string' || !user_name) {
                    formData.append("user_name", "ユーザーネームを入力してください");
                    setIsSubmitting(false);
                    return;
                }

                let iconUuid: string | null = null;
                if (icon_file) {
                    const imgResult = await clientContext.client.uploadImg(icon_file);
                    if (imgResult.error) {
                        formData.append("icon", imgResult.error.error_id + ": " + imgResult.error.message);
                        setIsSubmitting(false);
                        return;
                    }
                    iconUuid = imgResult.success.image_uuid;
                }

                const postUserResult = await clientContext.client.authBody(
                    Api.app.post_user_api_user_post, {},
                    {user_name: user_name, user_icon_uuid: iconUuid}, {}
                );

                if (postUserResult.error) {
                    formData.append("submit", postUserResult.error.error_id + ": " + postUserResult.error.message);
                    setIsSubmitting(false);
                    return;
                }

                clientContext.set(newRegisteredClientState(
                    clientContext.oidcContext, clientContext.setIdToken, clientContext.signOut, clientContext.token,
                    clientContext.idToken, postUserResult.success, clientContext.set
                ));

                setIsSubmitting(false);
                setIsCompleted(true);
                setTimeout(() => setIsCompleted(false), 2000);
            }}
        >
            <h2 className="text-2xl font-bold text-center mb-8 text-gray-800">プロフィール作成</h2>
            
            <div className="flex flex-col items-center space-y-6">
                <div 
                    className={`relative group cursor-pointer w-40 h-40 rounded-full overflow-hidden transition-all duration-300 ${
                        isDragging ? 'ring-4 ring-blue-400 ring-opacity-50' : ''
                    }`}
                    onClick={() => document.getElementById("icon-upload")?.click()}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    {imagePreview ? (
                        <img
                            src={imagePreview}
                            alt="プレビュー"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                            <Camera className="w-12 h-12 text-gray-400" />
                        </div>
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                        <Upload className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    </div>
                </div>

                <input
                    id="icon-upload"
                    name="icon"
                    type="file"
                    onChange={handleImageChange}
                    accept="image/*"
                    className="hidden"
                />
            </div>

            <div className="mt-8 space-y-6">
                <StyledInput 
                    name="user_name" 
                    label="あなたの名前" 
                    type="text"
                    className="w-full p-3 rounded-lg border border-gray-200 bg-transparent text-transparent placeholder-gray-400 focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    placeholder="あなたの名前を入力"
                />

                <div className="flex justify-center">
                    <StyledButton className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
                        登録する
                    </StyledButton>
                </div>
            </div>

            {/* 登録中・完了モーダル */}
            <Dialog open={isSubmitting || isCompleted} onClose={() => {}} className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-[9999] transition-opacity duration-300">
                <div 
                    className={`bg-gray-800 text-white p-6 rounded-lg shadow-lg flex flex-col items-center 
                    transition-all duration-300 transform ${isSubmitting || isCompleted ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="w-6 h-6 animate-spin" />
                            <p className="text-lg font-medium mt-2">登録中…</p>
                        </>
                    ) : (
                        <>
                            <CheckCircle className="w-10 h-10 text-green-500" />
                            <p className="text-lg font-medium mt-2">完了！</p>
                        </>
                    )}
                </div>
            </Dialog>

        </StyledForm>
    );
}


export interface UserRegisterFormProps {}