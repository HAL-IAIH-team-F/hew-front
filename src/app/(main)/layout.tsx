import {ReactNode} from "react";
import {ClientContextProvider} from "~/api/context/ClientContextProvider";

export default function Layout(
    {
      children,
    }: Readonly<{
      children: ReactNode;
    }>) {


  return (
      <div className={"bg-backcolor"}>
        <ClientContextProvider>
          {children}
        </ClientContextProvider>
      </div>
  )
}
