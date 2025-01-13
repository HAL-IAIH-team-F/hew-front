"use client";

import ItemBackground from "~/ItemBackground";
import ThumbnailUpload from "../listing/ThumbnailUpload";
import ImageUpload from "../listing/ImageUpload";
import {ClientContextState, useClientContextState} from "~/api/context/ClientContextProvider";
import {useRouter} from "next/navigation";
import {StyledInput} from "../../../../util/form/element/StyledInput";
import {StyledTextarea} from "../../../../util/form/element/StyledTextarea";
import {StyledButton} from "../../../../util/form/element/StyledButton";

import {StyledForm} from "../../../../util/form/element/StyledForm";
import {StyledFormData} from "../../../../util/form/StyledFormData";
import FlexBox from "../../../../util/FlexBox";
import {Api} from "~/api/context/Api";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import CreatorsSelector from "@/(main)/colab/register/CreatorsSelector";
import {useState} from "react";
import {CreatorRes} from "@/(main)/colab/register/CreatorRes";
import {TIMELINE_PATH} from "@/(main)/(timeline)/timeline";

async function action(
  formData: StyledFormData, clientContext: ClientContextState, router: AppRouterInstance, creators: CreatorRes[]
) {

  const price = Number(formData.getStr("price"));
  const productTitle = formData.getStr("product_name");
  const productDescription = formData.getStr("description");
  const thumbnail = formData.getFile("thumbnail");
  const productImages = formData.getFileList("product_images");
  if (clientContext.state != "authenticated") {
    formData.append("submit", "no login")
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

  const postProductResult = await clientContext.client.authBody(
    Api.app.pp_api_product_post, {},
    {
      product_title: productTitle,
      product_description: productDescription,
      price,
      product_thumbnail_uuid: productThumbnailUuid,
      product_contents_uuid: productContentsUuid,
      purchase_date: purchaseDate,
      collaborator_ids: creators.map(value => value.creator_id)
    },
    {}
  );

  if (postProductResult.error) {
    formData.append("submit", `{Error: ${postProductResult.error.message}}`);
    return;
  }

  // 成功した場合に timeline にリダイレクト
  console.log("Successfully posted product. Redirecting to /timeline...");
  router.push(TIMELINE_PATH);
  return undefined;
}

export default function ProductListingForm() {
  const clientContext = useClientContextState();
  const router = useRouter();
  const [creators, setCreators] = useState<CreatorRes[]>([])

  return (
    <StyledForm
      action={async (formData: StyledFormData) => {
        await action(formData, clientContext, router, creators)
      }}
      className={"h-full overflow-y-scroll p-5"}
    >
      <div className="flex flex-row flex-wrap gap-2.5">
        <div className="min-w-96 flex-1">
          <ThumbnailUpload label="サムネイルを選択" name="thumbnail"/>
        </div>
        <div className="min-w-96 flex-1">
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
        <p>コラボ相手</p>
        <CreatorsSelector creators={creators} setCreators={setCreators}/>
      </div>

      <FlexBox className="justify-end items-center pb-5">
        <StyledButton>出品</StyledButton>
      </FlexBox>
    </StyledForm>
  );
}
