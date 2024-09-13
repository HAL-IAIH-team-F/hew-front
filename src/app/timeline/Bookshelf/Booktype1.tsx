import React from 'react';

export default function Booktype1() {
  const imageUrls = [
    "/109671135_p7_master1200.webp",
    "/109671135_p6_master1200.webp",
    "/109671135_p8_master1200.webp",
    "/109671135_p11_master1200.webp",
    "/109671135_p9_master1200.webp",
    "/109671135_p2_master1200.webp",
  ];

  const totalImages = 9;
  const repeatedImageUrls = Array.from({ length: totalImages }, (_, i) => imageUrls[i % imageUrls.length]);

  return (
    
    <div className="relative">
      

      <div className="grid grid-cols-3 gap-4 relative" style={{ zIndex: 1 }}>
        {repeatedImageUrls.map((url, index) => (
          <div
            key={index}
            className={`h-[140px] w-[120px] border border-gray-300 overflow-hidden transform skew-x-12 rounded-lg ${
              index < 3 ? 'translate-x-[-33px]' : index >= 6 ? 'translate-x-[33px]' : ''
            }`}
            style={{ position: 'relative' }}
          >
            <img
              src={url}
              alt={`Image ${index + 1}`}
              className="object-cover h-full w-full transform rounded-lg"
              style={{
                transform: 'scale(1.2)',
                transformOrigin: 'center', 
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
