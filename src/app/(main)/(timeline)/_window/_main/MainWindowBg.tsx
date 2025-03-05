import {inAppPageStyle} from "@/(main)/(timeline)/_window/_sidebar/Styles";
import {X} from "lucide-react";
import React, {ReactNode} from "react";
import useRoutes from "~/route/useRoutes";

export default function MainWindowBg(
    {
        children,
    }: {
      children?: ReactNode
    },
) {
  const routes = useRoutes()


  return (
      <div style={inAppPageStyle(children != undefined)} className="relative">
        <button
            onClick={() => {
              routes.timeline().transition()
            }}
            className="group absolute top-3 right-3 p-2 rounded-full
                                bg-zinc-900/40 backdrop-blur-sm
                                border border-zinc-300/50
                                transition-all duration-300 ease-in-out
                                hover:scale-110 hover:bg-zinc-800/60
                                hover:border-zinc-600 z-[9999]"
        >
          <X className="w-5 h-5 text-zinc-300 transition-colors duration-300
                                  group-hover:text-white"/>
        </button>
        <div style={{display: "block"}} className={"h-full"}>
          {children}
        </div>
      </div>
  )
}
