import React from 'react';

export default function Booktype2() {
  const imageUrls = [
    "/109671135_p7_master1200.webp",
    "/109671135_p6_master1200.webp",
    "/109671135_p8_master1200.webp",
    "/109671135_p11_master1200.webp",
    "/109671135_p9_master1200.webp",
    "/109671135_p2_master1200.webp",
    "/109671135_p9_master1200.webp",
    "/109671135_p2_master1200.webp",
    "/109671135_p9_master1200.webp",
    "/109671135_p2_master1200.webp",

  ];

  const totalImages = 36;
  const repeatedImageUrls = Array.from({ length: totalImages }, (_, i) => imageUrls[i % imageUrls.length]);

  return (
    <div
      className="grid"
      style={{ 
        gridTemplateColumns: 'repeat(6, 100px)', 
        gap: '10px',
        width: 'fit-content', 
        margin: '0 auto', 
      }}
    >
      {repeatedImageUrls.map((url, index) => (
        <div
          key={index}
          className="border border-gray-300 overflow-hidden rounded-lg"
          style={{
            height: '150px', 
            width: '100px',  
          }}
        >
          <img
            src={url}
            alt={`Image ${index + 1}`}
            className="object-cover h-full w-full rounded-lg"
            style={{
              objectFit: 'cover',
            }}
          />
        </div>
      ))}
    </div>
  );
}
