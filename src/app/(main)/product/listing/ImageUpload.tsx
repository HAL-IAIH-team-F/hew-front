"use client";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { ErrorMessage } from "../../../../util/err/ErrorMessage";

export default function ImageUpload({ label, name }: { label: string, name: string }) {
  const [image, setImage] = useState<File | null>(null);
  const [err, setErr] = useState<string>();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setImage(file);
  };

  const removeImage = () => {
    setImage(null);
  };

  useEffect(() => {
    if (!inputRef.current) return;
    const dataTransfer = new DataTransfer();
    if (image) dataTransfer.items.add(image);
    inputRef.current.files = dataTransfer.files;
  }, [image, inputRef.current]);

  return (
    <div className="flex flex-col items-center bg-gray-800 p-4 rounded-lg bg-gray-900">
      <div className="grid grid-cols-1 gap-2">
        {image ? (
          <div className="relative w-24 h-24 border border-gray-700 rounded-md overflow-hidden bg-gray-800 hover:scale-105">
            <img src={URL.createObjectURL(image)} alt="アップロード画像" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-0 right-0 bg-red-500 text-white p-1 px-2 rounded-full text-xs hover:bg-gray-600"
            >
              ×
            </button>
          </div>
        ) : (
          <label className="cursor-pointer text-blue-400 text-center">
            <div className="relative w-24 h-24 border border-gray-700 rounded-md overflow-hidden bg-gray-700 flex items-center text-lg justify-center hover:bg-gray-600">
              {label}
              <input
                type="file"
                name={`${name}-in`}
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>
          </label>
        )}
      </div>
      <p className="text-sm text-gray-400 mt-2">{image ? "1/1 枚" : "0/1 枚"}</p>
      <input type="file" name={name} ref={inputRef} className="hidden" />
      <ErrorMessage error={err} className="text-red-400" />
    </div>
  );
}
