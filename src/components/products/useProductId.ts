import {useSearchParams} from "next/navigation";

export default function useProductId() {
  const params = useSearchParams();
  return params.get("productId") || undefined
}