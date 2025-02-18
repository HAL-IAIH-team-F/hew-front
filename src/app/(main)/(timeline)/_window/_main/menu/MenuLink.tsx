import React from "react";
import {RouteUrl} from "~/route/RouteUrl";
import Link from "next/link";

export default function MenuLink(
    {
      routeUrl, label,
    }: {
      routeUrl: RouteUrl,
      label: string,
    },
) {


  return (
      <li>
        <Link
            onClick={(event) => {
              routeUrl.transition(event).catch(console.error)
            }}
            className={`flex items-center px-4 py-2 text-sm rounded-lg transition-colors duration-150 group ${
                routeUrl.isCurrent()
                    ? "bg-gray-700 text-white"
                    : "text-gray-300 hover:bg-gray-700/50"
            }`}
            href={routeUrl.toString()}
        >
          {label}
        </Link>
      </li>
  )
}
