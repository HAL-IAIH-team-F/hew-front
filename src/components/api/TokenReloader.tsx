"use client"
import useTokenReloader from "~/api/useTokenReloader";

export default function TokenReloader(
  {}: {},
) {
  useTokenReloader()
  return undefined
}
