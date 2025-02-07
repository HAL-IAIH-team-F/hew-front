
"use client"
import React, {ReactNode, useEffect, useState} from "react";
import {DescriptionButton} from "@/_top/Description";
import UIContainer from "@/_top/UIContainer";
import {useClientState} from "~/api/context/ClientContextProvider";
import useRoutes from "~/route/useRoutes";

export default function Layout(
    {
        children,
    }: Readonly<{
        children: ReactNode;
    }>) {
    const [isVisible, setIsVisible] = useState(true); // フェードアウト用
    const [isAuthenticated, setIsAuthenticated] = useState(false); // 認証状態を管理
    const [isUnregistered, setUnregistered] = useState(false); // フェードアウト用
    const clientContext = useClientState();
    const routes = useRoutes()
    useEffect(() => {
        console.log(clientContext.state)
        if (clientContext.state !== "registered") return
        setIsAuthenticated(true);
        setTimeout(() => setIsVisible(false), 2000); // フェードアウト後に非表示
    }, [clientContext.state]);

    useEffect(() => {
        if (clientContext.state !== "unregistered") return
        setIsAuthenticated(true);
        setTimeout(() => setIsVisible(false), 2000); // フェードアウト後に非表示
        setTimeout(() => routes.lpRegister().transition(), 2000); // 遅延表示

    }, [clientContext.state]);
    return (
        <>
            {isVisible && (
                <UIContainer/>
            )}
            <DescriptionButton/>
        </>
    )
}
