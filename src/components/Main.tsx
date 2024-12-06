import { DetailedHTMLProps, HTMLAttributes } from "react";
import { sx } from "../util/util";

export default function Main({
  children,
  className,
  ...props
}: MainProps) {
  return (
    <main
      {...props}
      className={sx(className)}
      style={{ backgroundColor: "black" }} // 背景色を黒に設定
    >
      {children}
    </main>
  );
}

export interface MainProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> {}
