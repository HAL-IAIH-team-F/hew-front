// ============================
// Author: injectxr
// Date: 2024-09-07
// Description: 商品出品フォームのコンポーネント
// ============================

"use client";

import {StyledInput} from "../../../util/form/StyledInput";
import {StyledButton} from "../../../util/form/StyledButton";
import FlexBox from "../../../util/FlexBox";
import ItemBackground from "~/ItemBackground";
import { StyledTextarea } from "../../../util/form/StyledTextarea";
import ThumbnailUpload from "../listing/ThumbnailUpload"
import ImageUpload from "../listing/ImageUpload"

export default function ProductListingForm() {
  return (
    <form className="flex flex-col space-y-4">
      <div>
        <ThumbnailUpload label="サムネイルを選択" name="thumbnail"/>
      </div>
      <div>
        <StyledInput name={"product_name"} type={"text"} label="商品名(40文字まで)"/>
        <StyledInput name={"category"} type={"text"} label="カテゴリー"/>
        <StyledTextarea name={"description"} label="説明"/>
        <StyledInput name={"price"} type={"text"} maxLength={160} label="価格"/>
        <StyledInput name={"collabo_partner"} type={"text"} label="コラボ相手"/>
      </div>
      <ItemBackground>
        <label className="block text-sm font-medium mb-2 px-4 mb-4 block text-xl">商品画像を追加 (最大8枚)</label>
        <ImageUpload label="+" name="product_images" maxImages={8} />
      </ItemBackground>
      <FlexBox className={"justify-end items-center justify-center pb-5"}>
        <StyledButton>出品</StyledButton>
      </FlexBox>
    </form>
  );
}
