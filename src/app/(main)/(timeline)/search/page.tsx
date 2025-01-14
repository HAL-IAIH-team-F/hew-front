import SearchLayout from "@/(main)/search/searchLayout";
import {TCanvas} from "@/(main)/search/TCanvas";

export default function Page(
  {}: {}
) {


  return <div>
    <SearchLayout>
      <div style={{widows: "100vh", height: "100vh"}}>
        <TCanvas/>
      </div>
    </SearchLayout>
  </div>
}