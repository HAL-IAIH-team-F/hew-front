import {LabeledItem, LabeledItemProps} from "./LabeledItem";

export interface LabeledTextProps extends LabeledItemProps {
  text: string | undefined
}

export function LabeledText(
  {
    text,
    ...props
  }: LabeledTextProps,
) {


  return (
    <LabeledItem{...props}>
      <span>{text}</span>
    </LabeledItem>
  );
}