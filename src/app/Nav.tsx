import LoginButton from "~/LoginButton";
import LogoutButton from "~/LogoutButton";

export default function Nav(
  {
    ...props
  }: NavProps,
) {


  return (
    <div className={"fixed"}>
      <LoginButton className={"p-1"}/>
      <LogoutButton className={"p-1"}/>
    </div>
  )
}

export interface NavProps {
}
