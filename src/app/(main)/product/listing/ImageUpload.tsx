// ============================
// Author: injectxr
// Date: 2024-09-07
// Description: ユーザーが画像をアップロードし、プレビューを表示するコンポーネント (ダークモード対応)
// ============================

"use client";
import {ChangeEvent, useEffect, useRef, useState} from "react";
import {ErrorMessage} from "../../../../util/err/ErrorMessage";

export default function ImageUpload({label, name, maxImages = 8}: { label: string, name: string, maxImages?: number }) {
  const [images, setImages] = useState<File[]>([]);
  const [err, setErr] = useState<string>();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files == null) return;
    const newFiles = [...files, ...images];
    if (newFiles.length > maxImages) {
      setErr(`最大ファイル数は${maxImages}枚までです。`);
      return;
    }
    setImages(newFiles);
  };

  const removeImage = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  useEffect(() => {
    if (!inputRef.current) return;
    const dataTransfer = new DataTransfer();
    images.forEach(value => dataTransfer.items.add(value));
    inputRef.current.files = dataTransfer.files;
  }, [images, inputRef.current]);

  return (
    <div className="flex flex-col items-center bg-gray-800 p-4 rounded-lg">
      <div className="grid grid-cols-4 gap-2">
        {images.map((file, index) => (
          <div key={index} className="relative w-24 h-24 border border-gray-700 rounded-md overflow-hidden bg-gray-800 hover:scale-105">
            <img src={URL.createObjectURL(file)} alt={`商品画像 ${index + 1}`} className="w-full h-full object-cover"/>
            <button
              type="button"
              onClick={() => removeImage(index)}
              className="absolute top-0 right-0 bg-red-500 text-white p-0.9 px-1 rounded-full text-xs hover:bg-gray-600"
            >
              ×
            </button>
          </div>
        ))}
        {images.length < maxImages && (
          <label className="cursor-pointer text-blue-400 text-center">
            <div className="relative w-24 h-24 border border-gray-700 rounded-md overflow-hidden bg-gray-700 flex items-center text-lg justify-center hover:bg-gray-600">
              {label}
              <input
                type="file"
                name={`${name}-in`}
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
                multiple
              />
            </div>
          </label>
        )}
      </div>
      <p className="text-sm text-gray-400 mt-2">{images.length}/{maxImages} 枚</p>
      <input type="file" multiple name={name} ref={inputRef} className="hidden"/>
      <ErrorMessage error={err} className="text-red-400"/>
    </div>
  );
}
