import Main from "~/Main";

import "../../../public/fonts/font.css"
import Sea from "../_top/sea";
import Filter from "../_top/Filter";


export default function Page(
  {}: {}
) {
  return <Main>
    <Sea />
    <Filter />
  </Main>
}