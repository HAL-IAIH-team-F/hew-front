"use client"
import React, {ReactNode, Suspense} from "react";
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
            <Suspense>
                <DescriptionSwitchAnimationProvider>
                    <Sea/>
                    {children}
                    <Filter/>
                </DescriptionSwitchAnimationProvider>
            </Suspense>
        </>
    )
}