"use client"
import React, {ReactNode} from "react";

export default function Layout(
    {
        children,
    }: Readonly<{
        children: ReactNode;
    }>) {
    return (
        <>
            {children}
        </>
    )
}
