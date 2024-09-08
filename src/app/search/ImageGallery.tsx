"use client";
import { useState } from 'react';

export default function ImageGallery() {
    const imageUrls = [
      //画像URL
  
    ];
  
    const totalImages = 200;
    const getRandomImageUrls = (imageUrls: string[], totalImages: number): string[] => {
      const urls: string[] = [];
      let lastUrl = '';  
      let secondLastUrl = '';  
    
      for (let i = 0; i < totalImages; i++) {
        let randomUrl = '';
    
        do {
          const randomIndex = Math.floor(Math.random() * imageUrls.length);
          randomUrl = imageUrls[randomIndex];
        } while (randomUrl === lastUrl || randomUrl === secondLastUrl); 
    
        urls.push(randomUrl);
        secondLastUrl = lastUrl;  
        lastUrl = randomUrl;  
      }
    
      return urls;
  };
  
  
    const repeatedImageUrls = getRandomImageUrls(imageUrls, totalImages);
    const heights: string[] = ['200px','230px','260px','290px','320px','360px'];
  
    let previousHeight1: string = "0";
    let previousHeight2: string = "0";
  
    const getRandomHeight = (p0: number): string => {
      let newHeight = '';
      do {
        newHeight = heights[Math.floor(Math.random() * heights.length)];
      } while (newHeight === previousHeight1 || newHeight === previousHeight2); 
  
      previousHeight2 = previousHeight1; 
      previousHeight1 = newHeight;       
  
      return newHeight;
    };
  
  
    return (
      <div className="container mx-auto p-4">
        <div className="columns-6">
          
        {repeatedImageUrls.map((url, index) => (
          
        <div
            key={index}
            className="mb-4 overflow-hidden rounded-lg bg-center"
            style={{
              height: getRandomHeight(index % 6), 
              width: '100%', 
              marginBottom: '10px', 
              marginRight: index % 6 !== 5 ? '10px' : '0', 
              backgroundPosition: "center", 
              backgroundSize: "cover", 
              backgroundImage: `url(${url})`,
            }}
            />
          ))}
          
        </div>
      </div>
    );
  }
