import {DetailedHTMLProps, ImgHTMLAttributes} from "react";
import {sx} from "./util";

export default function Image(
  {
    className,
    alt,
    ...props
  }: ImageProps,
) {
  return (
    <figure className={sx("aspect-video flex justify-center items-center" , className)}>
      <img alt={alt} {...props} className={sx("max-h-full max-w-full block")}/>
    </figure>
  )
}

export interface ImageProps extends DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> {
  alt: string | undefined;
}
