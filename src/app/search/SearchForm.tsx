// ============================
// Author: injectxr
// Date: 2024-09-09
// Description: カテゴリ選択ボタンと検索バーと画像ギャラリーを含むフォーム
// ============================
"use client";

import { useState } from "react";
import { StyledForm } from "../../util/form/StyledForm";
import { StyledSearchInput } from "../../util/form/StyledSearchInput";
import { StyledCategoryButton } from "../../util/form/StyledCategoryButton";
import FlexBox from "../../util/FlexBox";
import Image from "next/image";
import ImageGallery from "./ImageGallery";

export default function SearchForm() {
  const categories = ["推しの子0", "推しの子1", "推しの子2", "推しの子3", "推しの子4", "推しの子5", "推しの子6", "推しの子7"];
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSearch = () => {
    console.log("検索実行");
  };

  return (
    <div className="container mx-auto p-4">
      <StyledForm className="space-y-4">
        <StyledSearchInput
          name="search_query"
          placeholder="商品名やユーザー名で検索"
          onSearch={handleSearch}
        />

        <div className="flex justify-between my-4">
          {categories.map((category, index) => (
            <StyledCategoryButton
              key={index}
              label={category}
              isSelected={selectedCategory === category}
              onClick={() => handleCategorySelect(category)}
            />
          ))}
        </div>
        <hr />
      </StyledForm>

      <ImageGallery/>
    </div>
  );
}


