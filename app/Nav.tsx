import LoginButton from "@/app/_component/LoginButton";
import LogoutButton from "@/app/_component/LogoutButton";

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
