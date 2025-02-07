"use client"
import React, {ReactNode, useEffect, useState} from "react";
import Sea from "@/(main)/lp/sea";
import Filter from "@/_top/Filter";
import DescriptionSwitcher from "@/(main)/lp/DescriptionSwitcher";
import UIContainer from "@/_top/UIContainer";
import {DescriptionButton} from "@/_top/Description";
import useRoutes from "~/route/useRoutes";

export default function Layout(
    {
        children,
    }: Readonly<{
        children: ReactNode;
    }>) {
    const routes = useRoutes()
    const [requestDescription, setRequestDescription] = useState(routes.lpDescription().isCurrent())
    useEffect(() => {
        setRequestDescription(routes.lpDescription().isCurrent())
    }, [routes]);
    return (
        <>
            <Sea requestDescription={requestDescription}/>
            {children}
            <Filter/>
            <DescriptionSwitcher/>
            <UIContainer requestDescription={requestDescription}/>
            <DescriptionButton requestDown={() => {
                setRequestDescription(true)
            }} requestUp={() => {
                setRequestDescription(false)
            }}/>
        </>
    )
}