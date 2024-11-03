import Main from "~/Main";
import UIContainer from "./UIContainer";

import "../../../public/fonts/font.css"
import Filter from "./Filter";
import Sea from "./sea";

export default function Page(
  {}: {}
) {
  return <Main>
    <Sea />
    <Filter />
  </Main>
}