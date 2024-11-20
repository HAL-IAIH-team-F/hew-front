"use client";

import { useState } from "react";
import { StyledForm } from "../../util/form/StyledForm";
import { StyledSearchInput } from "../../util/form/StyledSearchInput";
import { StyledCategoryButton } from "../../util/form/StyledCategoryButton";
import ImageGallery from "./ImageGallery";
import { useClientContext } from "@/_api/clientWrapper";
import { useSession } from "next-auth/react";
import {apiClient} from "@/_api/wrapper";

export default function SearchForm() {
  const categories = ["カテゴリ1", "カテゴリ2", "カテゴリ3", "カテゴリ4"];
  const [selectedCategory, setSelectedCategory] = useState<string>(categories[0]);
  const [query, setQuery] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);

  // セッションとクライアントコンテキストの取得
  const session = useSession().data;
  const clientContext = useClientContext(session);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleSearch = async () => {
    try {
      // `clientContext.exec`を使用したAPI呼び出し
      const result = await clientContext.exec((opt) =>
        apiClient.read_products_products_get({
          queries: {
            name: query ? [query] : undefined,
            tag: selectedCategory ? [selectedCategory] : undefined,
          },
          ...opt, // 必要なオプションを含める
        })
      );

      if (result.error) {
        console.error("検索エラー:", result.error);
        return;
      }

      const imageUrls = Array.isArray(result.value) ? result.value.map((item: any) => item.image_url) : [];
      setImages(imageUrls || []);
    } catch (error) {
      console.error("検索エラー:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <StyledForm className="space-y-4">
        <StyledSearchInput
          name="search_query"
          placeholder="商品名やキーワードで検索"
          value={query}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
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
      <ImageGallery images={images} />
    </div>
  );
}
