"use client";
import { useState } from 'react';

export default function ImageGallery() {
    const imageUrls = [
      "https://images6.alphacoders.com/132/1320319.png",
      "https://images6.alphacoders.com/135/1354956.png",
      "https://images2.alphacoders.com/135/1354979.jpeg",
      "https://images8.alphacoders.com/135/1354985.jpeg",
      "https://images5.alphacoders.com/136/1369570.png",
      "https://images2.alphacoders.com/134/1343087.jpeg",
      "https://pbs.twimg.com/media/GWYJIEZbQAA87Ho?format=jpg&name=360x360",
      "https://pbs.twimg.com/media/GUiT9_JbkAAwfgD?format=jpg&name=900x900",
      "https://pbs.twimg.com/media/GWE3csjaMAEbOIu?format=jpg&name=4096x4096",
      "https://pbs.twimg.com/media/GV2nwWiXkAAQa0b?format=jpg&name=4096x4096",
      "https://pbs.twimg.com/media/GUHmTAVaoAARfwJ?format=jpg&name=large",
      "https://pbs.twimg.com/media/GWPA0eiXoAA0brk?format=jpg&name=large",
      "https://pbs.twimg.com/media/GWRNaCcbQAYiqdl?format=jpg&name=small",
  
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