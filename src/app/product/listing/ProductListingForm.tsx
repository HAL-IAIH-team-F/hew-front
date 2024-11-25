"use client";

import { StyledInput } from "../../../util/form/StyledInput";
import { StyledButton } from "../../../util/form/StyledButton";
import FlexBox from "../../../util/FlexBox";
import ItemBackground from "~/ItemBackground";
import { StyledTextarea } from "../../../util/form/StyledTextarea";
import ThumbnailUpload from "../listing/ThumbnailUpload";
import ImageUpload from "../listing/ImageUpload";

export default function ProductListingForm() {
  return (
    <div className="m-20">
      <form className="flex flex-col">
        {/* サムネイルと商品画像のセクション */}
        
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/3 flex-shrink-0">
            <ThumbnailUpload label="サムネイルを選択" name="thumbnail" />
          </div>
          <div className="w-full md:w-2/3 flex-grow">
            <div className="flex flex-col space-y-4">
              <StyledInput name="product_name" type="text" label="商品名 (40文字まで)" />
              <ItemBackground>
                <label className="block text-sm font-medium text-xl">
                  商品画像を追加 (最大8枚)
                </label>
                <ImageUpload label="+" name="product_images" maxImages={8} />
              </ItemBackground>
            </div>
          </div>
        </div>

        {/* 商品情報入力欄 */}
        <div className="space-y-4">
          <StyledInput name="category" type="text" label="カテゴリー" />
          <StyledTextarea name="description" label="説明" />
          <StyledInput name="price" type="text" maxLength={160} label="価格" />
          <StyledInput name="collabo_partner" type="text" label="コラボ相手" />
        </div>

        {/* 出品ボタン */}
        <FlexBox className="justify-end items-center pb-5">
          <StyledButton>出品</StyledButton>
        </FlexBox>
      </form>
    </div>
  );
}
