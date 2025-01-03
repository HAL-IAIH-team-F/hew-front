"use client";

import ItemBackground from "~/ItemBackground";
import ThumbnailUpload from "../listing/ThumbnailUpload";
import ImageUpload from "../listing/ImageUpload";
import {useClientContextState} from "~/api/context/ClientContextProvider";
import {useRouter} from "next/navigation";
import {StyledInput} from "../../../../util/form/element/StyledInput";
import {StyledTextarea} from "../../../../util/form/element/StyledTextarea";
import {StyledButton} from "../../../../util/form/element/StyledButton";

import {StyledForm} from "../../../../util/form/element/StyledForm";
import {StyledFormData} from "../../../../util/form/StyledFormData";
import FlexBox from "../../../../util/FlexBox";
import {Api} from "~/api/context/Api";

export default function ProductListingForm() {
  const clientContext = useClientContextState();
  const router = useRouter();

  return (
    <StyledForm
      action={async (formData: StyledFormData) => {

        const price = Number(formData.getStr("price"));
        const productTitle = formData.getStr("product_name");
        const productDescription = formData.getStr("description");
        const category = formData.getStr("category");
        const collaboPartner = formData.getStr("collabo_partner");
        const thumbnail = formData.getFile("thumbnail");
        const productImages = formData.getFileList("product_images");
        if (clientContext.state != "authenticated") {
          formData.append("submit", "no login")
          return
        }
        const userId = clientContext.loginSession.idToken.idToken.userId;
        if (!userId) {
          formData.append("submit", "ユーザーIDが見つかりません。")
          return
        }
        if (!productImages || !productTitle || !productDescription) return

        let productThumbnailUuid = "";
        if (thumbnail) {
          const thumbnailResult = await clientContext.client.uploadImg(thumbnail);
          if (thumbnailResult.error) {
            formData.append("thumbnail", `{${thumbnailResult.error.error_id}: ${thumbnailResult.error.message}}`);
            return
          }
          productThumbnailUuid = thumbnailResult.success.image_uuid;
        }

        let productContentsUuid = "";
        if (productImages.length > 0) {
          const firstImageResult = await clientContext.client.uploadImg(productImages[0]);
          if (firstImageResult.error) {
            formData.append("product_images", `{${firstImageResult.error.error_id}: ${firstImageResult.error.message}}`);
            return;
          }
          productContentsUuid = firstImageResult.success.image_uuid;
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

        const postProductResult = await clientContext.client.authBody(
          Api.app.pp_api_product_post,{},
          requestPayload,{}
        );

        if (postProductResult.error) {
          formData.append("submit", `{Error: ${postProductResult.error.message}}`);
          return;
        }

        // 成功した場合に timeline にリダイレクト
        console.log("Successfully posted product. Redirecting to /timeline...");
        router.push("/timeline");
        return undefined;
      }}
    >
      <div className="flex flex-col md:flex-row">
        <div className="w-1/12 md:w-10/12 flex-shrink-1">
          <ThumbnailUpload label="サムネイルを選択" name="thumbnail"/>
        </div>
        <div className="w-full md:w-2/3 flex-grow">
          <div className="flex flex-col space-y-4">
            <StyledInput name="product_name" type="text" label="商品名 (40文字まで)"/>
            <ItemBackground>
              <label className="block font-medium text-xl">
                商品画像を追加 (最大8枚)
              </label>
              <ImageUpload label="+" name="product_images" maxImages={8}/>
            </ItemBackground>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <StyledInput name="category" type="text" label="カテゴリー"/>
        <StyledTextarea name="description" label="説明"/>
        <StyledInput name="price" type="text" maxLength={160} label="価格"/>
        <StyledInput name="collabo_partner" type="text" label="コラボ相手"/>
      </div>

      <FlexBox className="justify-end items-center pb-5">
        <StyledButton>出品</StyledButton>
      </FlexBox>
    </StyledForm>
  );
}
