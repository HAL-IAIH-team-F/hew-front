// ============================
// Author: injectxr
// Date: 2024-09-07
// Description: サムネイル画像をアップロードし、プレビューを表示するコンポーネント
// ============================

"use client";
import {useState} from 'react';

export default function ThumbnailUpload({label, name}: { label: string, name: string }) {
  const [thumbnail, setThumbnail] = useState<string | null>(null);

  const handleThumbnailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setThumbnail(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative max-h-full aspect-video w-full max-w-full border rounded-md bg-gray-50 p-2">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={label}
            className="max-h-full  max-w-full mx-auto object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
              <span className="text-gray-400">
                サムネイルを選択
              </span>
          </div>
        )}
      </div>
      <label className="mt-2 cursor-pointer text-blue-500 hover:underline">
        {label}
        <input
          type="file"
          name={name}
          className="hidden"
          accept="image/*"
          onChange={handleThumbnailChange}
        />
      </label>
    </div>
  );
}
