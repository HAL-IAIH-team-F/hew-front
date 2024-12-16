import {DetailedHTMLProps, HTMLAttributes} from "react";
import FlexBox from "../../../../../util/FlexBox";
import {LabeledText} from "../../../../../util/label/LabeledText";
import {StyledButton} from "../../../../../util/form/StyledButton";

export default function ProductDetailSentence(
  {
    ...props
  }: ProductDetailSentenceProps,
) {
  return (
    <div className={"flex-auto"} {...props}>
      <FlexBox className={"mb-4"}>
        <div className={"flex-auto mr-4"}>
          <LabeledText label={"カテゴリ"} text={"sample category"}/>
          <LabeledText label={"価格"} text={"1円"}/>
        </div>
        <div>
          <StyledButton className={"w-20"}>購入</StyledButton>
        </div>
      </FlexBox>
      <LabeledText label={"説明"} text={"sample description"} multiline={true}/>
    </div>
  )
}

export interface ProductDetailSentenceProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
}
