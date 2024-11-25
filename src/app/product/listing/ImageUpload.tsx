// ============================
// Author: injectxr
// Date: 2024-09-07
// Description: ユーザーが画像をアップロードし、プレビューを表示するコンポーネント
// ============================

"use client";
import { relative } from 'path';
import { useState } from 'react';

export default function ImageUpload({ label, name, maxImages = 8 }: { label: string, name: string, maxImages?: number }) {
    const [images, setImages] = useState<string[]>([]);
  
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files && images.length < maxImages) {
        const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
        setImages((prevImages) => [...prevImages, ...newImages].slice(0, maxImages));
      }
    };
  
    const removeImage = (index: number) => {
      setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    };
  
    return (
          <div className="flex flex-col items-center">
            <div className="grid grid-cols-4 gap-2">
              {images.map((imgUrl, index) => (
                <div key={index} className="relative w-24 h-24 border rounded-md overflow-hidden bg-gray-100 hover:scale-105">
                  <img src={imgUrl} alt={`商品画像 ${index + 1}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white p-0.9 px-1 rounded-full text-xs hover:bg-slate-400"
                  >×</button>
                </div>
              ))}
              {images.length < maxImages && (
                <label className="cursor-pointer text-blue-500 text-center">
                  <div className="relative w-24 h-24 border rounded-md overflow-hidden bg-gray-100 flex items-center text-lg justify-center hover:bg-gray-200">
                      {label}
                      <input
                        type="file"
                        name={name}
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageChange}
                        multiple
                      />
                  </div>
                </label>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-2">{images.length}/{maxImages} 枚</p>
          </div>
    );
}