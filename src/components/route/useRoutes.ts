import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useMemo} from "react";
import {Routes} from "~/route/Routes";

export default function useRoutes() {
  const params = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  return useMemo(() => new Routes(params, pathname, router), [params, pathname, router])
}