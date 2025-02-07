"use client"
import React, {ReactNode} from "react";
import Sea from "@/(main)/lp/sea";
import Filter from "@/_top/Filter";
import DescriptionSwitcher from "@/(main)/lp/DescriptionSwitcher";
import UIContainer from "@/_top/UIContainer";
import {DescriptionSwitchAnimationProvider} from "@/(main)/lp/DescriptionSwitchAnimation";

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
                <DescriptionSwitcher/>
                <UIContainer/>
                {/*<DescriptionButton/>*/}
            </DescriptionSwitchAnimationProvider>
        </>
    )
}