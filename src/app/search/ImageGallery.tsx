"use client";

type ImageGalleryProps = {
  images: any[]; // APIからの検索結果データ
};

export default function ImageGallery({ images }: ImageGalleryProps) {
  const heights = ['200px', '230px', '260px', '290px', '320px'];

  const getRandomHeight = () => {
    return heights[Math.floor(Math.random() * heights.length)];
  };

  return (
    <div className="container mx-auto p-4">
      <div className="columns-6">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative mb-4 overflow-hidden rounded-lg bg-center"
            style={{
              height: getRandomHeight(),
              width: '100%',
              marginBottom: '10px',
              marginRight: index % 6 !== 5 ? '10px' : '0',
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundImage: `url(${image.image_url || "/placeholder.png"})`, // 画像URLを使用
            }}
          >
            <div className="absolute inset-0 bg-black opacity-0 hover:opacity-50 transition-opacity duration-300"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
