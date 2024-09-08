import {Property} from "csstype";
import {DetailedHTMLProps, HTMLAttributes} from "react";
import {sx} from "../util";
import FlexBox from "../FlexBox";

export function LabeledItem(
  {
    children,
    label,
    multiline,
    labelProps,
    className,
    ...props
  }: LabeledItemProps,
) {
  const multilineUse = multiline == undefined ? false : multiline;

  return (
    <FlexBox
      {...props}
      className={sx(multilineUse ? "flex-col" : "flex-row", className)}
    >
      <FlexBox>
        <span
          className={sx("w-24")}
          {...labelProps}
        >{label}</span>
        {(!multilineUse) && <p className={sx("mx-3 block")}>{":"}</p>}
      </FlexBox>
      <div className={sx(multilineUse ? "mx-3" : "m-0")}>
        {children}
      </div>
    </FlexBox>
  );
}

export interface LabeledItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  label: string;
  labelProps?: {
    fontSize?: Property.FontSize | undefined
    width?: Property.Width | undefined
    margin?: Property.Margin | undefined
  } | undefined;
  multiline?: boolean | undefined;
}
