"use client"
import { useEffect, useRef, useState } from "react";
import { useSmoothScroll } from "../_hook/useSmoothScroll"
import SearchLayout from "./searchLayout";

import "./style.css"
import { TCanvas } from "./TCanvas";

const SearchPage: React.FC = () => {
  return (
    <div>
      <SearchLayout>
        <div style={{widows:"100vh",height: "100vh" }}>
              <TCanvas/>
        </div>
      </SearchLayout>
    </div>
  );
};

export default SearchPage;