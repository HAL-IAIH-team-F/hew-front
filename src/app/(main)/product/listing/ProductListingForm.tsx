"use client";

import ThumbnailUpload from "../listing/ThumbnailUpload";
import ImageUpload from "../listing/ImageUpload";
import {useClientState} from "~/api/context/ClientContextProvider";
import {useRouter} from "next/navigation";
import {StyledInput} from "../../../../util/form/element/StyledInput";
import {StyledTextarea} from "../../../../util/form/element/StyledTextarea";
import {StyledButton} from "../../../../util/form/element/StyledButton";

import {StyledForm} from "../../../../util/form/element/StyledForm";
import {StyledFormData} from "../../../../util/form/StyledFormData";
import {Api} from "~/api/context/Api";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import CreatorsSelector from "@/(main)/(timeline)/colab/register/CreatorsSelector";
import {useState} from "react";
import {Routes} from "~/route/Routes";
import {ClientState} from "~/api/context/ClientState";
import useRoutes from "~/route/useRoutes";

import {Image, LoaderIcon, Send, Users} from 'lucide-react';
import {Dialog} from "@headlessui/react";
import {CreatorRes} from "~/res/reses";
import LoginNeed from "~/UI/loginNeed";

async function action(
    formData: StyledFormData, clientContext: ClientState, router: AppRouterInstance, creators: CreatorRes[], routes: Routes
) {
  const price = Number(formData.getStr("price"));
  const productTitle = formData.getStr("product_name");
  const productDescription = formData.getStr("description");
  const thumbnail = formData.getFile("thumbnail");
  const productImages = formData.getFileList("product_images");
  if (clientContext.state != "registered") {
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
  routes.timeline().transition()
  return undefined;
}

export default function ProductListingForm() {
  const clientContext = useClientState();
  const router = useRouter();
  const [creators, setCreators] = useState<CreatorRes[]>([]);
  const routes = useRoutes();
  const [isSubmitting, setIsSubmitting] = useState(false); // 出品中の状態を管理

  async function handleSubmit(formData: StyledFormData) {
    setIsSubmitting(true); // 出品処理開始
    await action(formData, clientContext, router, creators, routes);
    setIsSubmitting(false); // 出品処理完了後に解除
  }
  if (clientContext.state !== "registered") {
      return (
          <div>
            <LoginNeed/>
          </div>
      )
  }
  return (
      <div className="flex-1 flex-grow overflow-y-auto transition-all duration-300 ease-out bg-gray-900 h-full">
        <div className="min-h-screen bg-gray-900 h-full">
          <StyledForm
              action={handleSubmit}
              className="h-full"
          >
            <div className="max-w-6xl mx-auto px-4 py-6">
              <h1 className="text-3xl font-bold mb-8 text-gray-100 flex items-center gap-2">
                <Image className="w-8 h-8"/>
                商品を出品
              </h1>

              <div className="space-y-8 overflow-y-auto" style={{
                height: "calc(100vh - 210px)",
                maxHeight: "calc(100vh)",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}>
                <div className="bg-gray-800 rounded-lg shadow-lg p-6">
                  {/* 商品名 & サムネイル */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div className="space-y-4">
                      <label className="block text-lg font-medium text-gray-100">
                        サムネイル
                      </label>
                      <div className="bg-gray-700/50 rounded-lg p-4 bg-gray-900">
                        <ThumbnailUpload label="サムネイルを選択" name="thumbnail"/>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <StyledInput
                          name="product_name"
                          type="text"
                          label="商品名 (40文字まで)"
                          className="bg-gray-700/50 border-gray-600 text-gray-100"
                      />
                      <div className="bg-gray-700/50 rounded-lg p-4 bg-gray-900">
                        <label className="block text-lg font-medium text-gray-100 mb-4">
                          商品画像を追加 (最大8枚)
                        </label>
                        <ImageUpload label="+" name="product_images"/>
                      </div>
                    </div>
                  </div>

                  {/* カテゴリー & 価格 */}
                  <div className="flex gap-6 flex-wrap">
                    <StyledInput
                        name="category"
                        type="text"
                        label="カテゴリー"
                        className="bg-gray-700/50 border-gray-600 text-gray-100 flex-1 min-w-52"
                    />
                    <StyledInput
                        name="price"
                        type="text"
                        label="価格(現在商品を販売することはできません。)"
                        className="bg-gray-700/50 border-gray-600 text-gray-100 flex-1 min-w-52"
                        value="0"
                    />
                  </div>

                  {/* 説明 */}
                  <StyledTextarea
                      name="description"
                      label="説明"
                      className="bg-gray-700/50 border-gray-600 text-gray-100 min-h-[150px]"
                  />

                  {/* コラボ相手 */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-gray-400"/>
                      <p className="text-lg font-medium text-gray-100">コラボ相手</p>
                    </div>
                    <div className="bg-gray-700/50 rounded-lg p-4">
                      <CreatorsSelector creators={creators} setCreators={setCreators}/>
                    </div>
                  </div>
                </div>

                {/* 出品ボタン */}
                <div className="flex justify-end pb-8">
                  <StyledButton
                      className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-3 px-6 rounded-lg flex items-center gap-2"
                      disabled={isSubmitting} // 出品中はボタンを無効化
                  >
                    <Send className="w-5 h-5"/>
                    出品する
                  </StyledButton>
                </div>
              </div>
            </div>
          </StyledForm>

          {/* 出品中モーダル */}
          <Dialog open={isSubmitting} onClose={() => {
          }} className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md z-[9999]">
            <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg flex flex-col items-center">
              <div className="flex items-center gap-2">
                <LoaderIcon className="w-6 h-6 animate-spin"/>
                <p className="text-lg font-medium">出品中…</p>
              </div>
            </div>
          </Dialog>

        </div>
      </div>
  );
}
