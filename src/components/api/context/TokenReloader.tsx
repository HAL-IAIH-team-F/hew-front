"use client"
import useTokenReloader from "~/api/context/useTokenReloader";

export default function TokenReloader(
  {}: {},
) {
  useTokenReloader()
  return undefined
}
