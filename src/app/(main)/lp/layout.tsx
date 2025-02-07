import React, {ReactNode} from "react";
import Sea from "@/_top/sea";
import Filter from "@/_top/Filter";

export default function Layout(
    {
        children,
    }: Readonly<{
        children: ReactNode;
    }>) {
    return (
        <>
            <Sea>{children}</Sea>
            <Filter/>
        </>
    )
}