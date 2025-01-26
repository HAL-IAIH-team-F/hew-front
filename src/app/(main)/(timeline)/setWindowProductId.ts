import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";

export default function setWindowProductId(
  params: URLSearchParams, router: AppRouterInstance,
  prevId: string | undefined, productId: string | undefined,
) {
  if (productId == prevId) return;
  if (productId == undefined) {
    router.push(deleteProductIdUrl(params));
    return;
  }
  if (prevId == undefined) {
    router.push(appendedProductIdUrl(params, productId));
    return;
  }
  router.replace(deleteProductIdUrl(params));
  setTimeout(() => {
    router.push(appendedProductIdUrl(params, productId));
  }, 300);
}

function appendedProductIdUrl(params: URLSearchParams, productId: string) {
  const newParams = new URLSearchParams(params);
  newParams.set("productId", productId);
  return `?${newParams.toString()}`;
}

function deleteProductIdUrl(params: URLSearchParams) {
  const newParams = new URLSearchParams(params);
  newParams.delete("productId");
  return `?${newParams.toString()}`;
}