import UserRegisterForm from "@/(main)/user/register/UserRegisterForm";
import Main from "~/Main";
import {Suspense} from "react";

export default function Page(
  {}: {}
) {
  return <Main>
    <Suspense>
      <UserRegisterForm/>
    </Suspense>
  </Main>
}