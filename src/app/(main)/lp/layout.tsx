"use client"
import React, {ReactNode} from "react";
import Sea from "@/(main)/lp/sea";
import Filter from "@/_top/Filter";
import {DescriptionSwitchAnimationProvider} from "@/(main)/lp/DescriptionSwitchState";

export default function Layout(
    {
        children,
    }: Readonly<{
        children: ReactNode;
    }>) {
    return (
        <>
            <DescriptionSwitchAnimationProvider>
                <Sea/>
                {children}
                <Filter/>
            </DescriptionSwitchAnimationProvider>
        </>
    )
}