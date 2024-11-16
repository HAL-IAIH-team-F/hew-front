"use client"
import { useEffect, useRef, useState } from "react";
import { useSmoothScroll } from "../_hook/useSmoothScroll"
import SearchLayout from "./searchLayout";

import "./style.css"
import { TCanvas } from "./TCanvas";

// interface Project {
//   id: number;
//   title: string;
//   img: string;
// }

// const projects: Project[] = [
//   { id: 1, title: 'Nkosi Johnson', img: '/109671135_p7_master1200.webp' },
//   { id: 2, title: 'Dawn Clothing', img: '/109671135_p7_master1200.webp' },
//   { id: 3, title: 'MoMA Vinland', img: '/109671135_p7_master1200.webp' },
//   { id: 4, title: 'FIDR Digital Reality', img: '/109671135_p7_master1200.webp' },
//   { id: 5, title: 'Marco Polo Photography', img: '/109671135_p7_master1200.webp' },
//   { id: 6, title: '3D Experience', img: '/109671135_p7_master1200.webp' },
//   { id: 7, title: 'Nkosi Johnson', img: '/109671135_p7_master1200.webp' },
//   { id: 8, title: 'Dawn Clothing', img: '/109671135_p7_master1200.webp' },
//   { id: 9, title: 'MoMA Vinland', img: '/109671135_p7_master1200.webp' },
//   { id: 10, title: 'FIDR Digital Reality', img: '/109671135_p7_master1200.webp' },
//   { id: 11, title: 'Marco Polo Photography', img: '/109671135_p7_master1200.webp' },
//   { id: 12, title: '3D Experience', img: '/109671135_p7_master1200.webp' },
//   { id: 13, title: 'Nkosi Johnson', img: '/109671135_p7_master1200.webp' },
//   { id: 14, title: 'Dawn Clothing', img: '/109671135_p7_master1200.webp' },
//   { id: 15, title: 'MoMA Vinland', img: '/109671135_p7_master1200.webp' },
//   { id: 16, title: 'FIDR Digital Reality', img: '/109671135_p7_master1200.webp' },
// ];


const Page: React.FC = () => {
  return (
    <div>
      <SearchLayout>
        <div style={{height: "100vh", position: "relative" }}>
              <TCanvas/>
        </div>
      </SearchLayout>
    </div>
  );
};

export default Page;