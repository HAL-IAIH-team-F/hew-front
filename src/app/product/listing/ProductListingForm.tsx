"use client";

import { StyledInput } from "../../../util/form/StyledInput";
import { StyledButton } from "../../../util/form/StyledButton";
import FlexBox from "../../../util/FlexBox";
import ItemBackground from "~/ItemBackground";
import { StyledTextarea } from "../../../util/form/StyledTextarea";
import ThumbnailUpload from "../listing/ThumbnailUpload";
import ImageUpload from "../listing/ImageUpload";
import { StyledForm, FormError } from "../../../util/form/StyledForm";
import { apiClient } from "~/api/wrapper";
import { useClientContext } from "~/api/useClientContext";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {StyledFormData} from "../../../util/form/StyledFormData";

export default function ProductListingForm() {
  const session = useSession();
  const clientContext = useClientContext(session);
  const router = useRouter();

  const validateForm = (formData: StyledFormData): FormError => {
    const errors: FormError = {};
    const productName = formData.get("product_name") as string | null;
    const price = Number(formData.get("price"));

    if (!productName) {
      errors.product_name = "商品名を入力してください";
    }
    if (isNaN(price) || price <= 0) {
      errors.price = "有効な価格を入力してください";
    }

    return errors;
  };

  return (
    <StyledForm
      action={async (formData: StyledFormData) => {
        const errors = validateForm(formData);
        if (Object.keys(errors).length > 0) {
          return errors;
        }

        const price = Number(formData.get("price"));
        const productTitle = formData.get("product_name") as string;
        const productDescription = formData.get("description") as string;
        const category = formData.get("category") as string;
        const collaboPartner = formData.get("collabo_partner") as string;
        const thumbnail = formData.get("thumbnail") as File | null;
        const productImages = formData.getAll("product_images") as File[];

        const userId = session?.data?.user?.id;
        if (!userId) {
          return { submit: "ユーザーIDが見つかりません。" };
        }

        let productThumbnailUuid = "";
        if (thumbnail) {
          const thumbnailResult = await clientContext.uploadImg(thumbnail);
          if (thumbnailResult.error) {
            return {
              thumbnail: `${thumbnailResult.error.error_id}: ${thumbnailResult.error.message}`,
            };
          }
          productThumbnailUuid = thumbnailResult.value.image_uuid;
        }

        let productContentsUuid = "";
        if (productImages.length > 0) {
          const firstImageResult = await clientContext.uploadImg(productImages[0]);
          if (firstImageResult.error) {
            return {
              product_images: `${firstImageResult.error.error_id}: ${firstImageResult.error.message}`,
            };
          }
          productContentsUuid = firstImageResult.value.image_uuid;
        }

        const purchaseDate = new Date().toISOString();

        const requestPayload = {
          user_id: userId,
          product_title: productTitle,
          product_description: productDescription,
          category,
          price,
          collabo_partner: collaboPartner,
          product_thumbnail_uuid: productThumbnailUuid,
          product_contents_uuid: productContentsUuid,
          purchase_date: purchaseDate,
        };

        const postProductResult = await clientContext.execBody(
          apiClient.pp_api_product_post,
          requestPayload
        );

        if (postProductResult.error) {
          return {
            submit: `エラー: ${postProductResult.error.message}`,
          };
        }

        // 成功した場合に timeline にリダイレクト
        console.log("Successfully posted product. Redirecting to /timeline...");
        router.push("/timeline");
        return undefined;
      }}
    >
      <div className="flex flex-col md:flex-row">
        <div className="w-1/12 md:w-10/12 flex-shrink-1">
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

      <div className="space-y-4">
        <StyledInput name="category" type="text" label="カテゴリー" />
        <StyledTextarea name="description" label="説明" />
        <StyledInput name="price" type="text" maxLength={160} label="価格" />
        <StyledInput name="collabo_partner" type="text" label="コラボ相手" />
      </div>

      <FlexBox className="justify-end items-center pb-5">
        <StyledButton>出品</StyledButton>
      </FlexBox>
    </StyledForm>
  );
}
