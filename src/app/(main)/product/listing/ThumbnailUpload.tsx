"use client";
import { useState } from "react";

export default function ThumbnailUpload({ label, name }: { label: string; name: string }) {
  const [thumbnail, setThumbnail] = useState<string | null>(null);

  const handleThumbnailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setThumbnail(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* クリック可能エリアを広げ、ホバー時に視覚的変化を追加 */}
      <label className="relative max-h-full aspect-video w-full max-w-full border border-gray-700 rounded-md bg-gray-800 p-2 cursor-pointer hover:border-blue-400 hover:bg-gray-700 transition">
        {thumbnail ? (
          <img src={thumbnail} alt={label} className="max-h-full max-w-full mx-auto object-cover" />
        ) : (
          <div className="flex items-center justify-center h-full">
            <span className="text-gray-400 transition hover:text-blue-300">サムネイルを選択</span>
          </div>
        )}
        {/* 透明な input */}
        <input
          type="file"
          name={name}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          accept="image/*"
          onChange={handleThumbnailChange}
        />
      </label>
    </div>
  );
}
