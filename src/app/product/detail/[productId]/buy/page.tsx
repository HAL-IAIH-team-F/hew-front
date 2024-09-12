import {LabeledText} from "../../../../../util/label/LabeledText";
import Main from "~/Main";

export default function Page(
  {}: {}
) {


  return <Main>
    <LabeledText text={""} label={"購入作品"}/>
    <LabeledText text={"10円"} label={"支払方法"}/>
    <LabeledText text={"10円"} label={"合計価格"}/>
    購入した商品はマイページよりダウンロードいただけます。
  </Main>
}