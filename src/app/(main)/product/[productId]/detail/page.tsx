import Main from "~/Main";
import {LabeledItem} from "../../../../../util/label/LabeledItem";
import ProductDetailSentence from "@/(main)/product/[productId]/detail/ProductDetailSentence";
import Image from "../../../../../util/Image";
import ItemBackground from "~/ItemBackground";

export default function Page(
  {}: { params: { productId: string } }
) {
  return <Main className={"leading-8"}>
    <h1 className={"text-6xl mb-8"}>タイトル</h1>
    <ItemBackground className={"text-lg mb-8"}>
      <Image alt={"サムネイル"} className={"max-w-96 flex-1 mr-8"} src={"/sample/109671135_p0_master1200.jpg"}/>
      <ProductDetailSentence/>
    </ItemBackground>
    <ItemBackground>
      <LabeledItem className={"text-2xl"} label={"作者"} multiline={true}>
        <span>sample creator1</span>,
        <span>sample creator2</span>,
        <span>sample creator3</span>
      </LabeledItem>
    </ItemBackground>
  </Main>
}