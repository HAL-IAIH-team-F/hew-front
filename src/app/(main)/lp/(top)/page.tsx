"use client"
import "../../../../../public/fonts/font.css"
import React, {useEffect, useState} from "react";
import {useClientState} from "~/api/context/ClientContextProvider";
import useRoutes from "~/route/useRoutes";
import UIContainer from "@/_top/UIContainer";


export default function Page(
    {}: {}
) {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // 認証状態を管理
    const clientContext = useClientState();
    const routes = useRoutes()
    useEffect(() => {
        console.log(clientContext.state)
        if (clientContext.state !== "registered") return
        setIsAuthenticated(true);
        // setTimeout(() => routes.lpDescription().transition(), 2000);
    }, [clientContext.state]);

    useEffect(() => {
        if (clientContext.state !== "unregistered") return
        setIsAuthenticated(true);
        setTimeout(() => routes.lpRegister().transition(), 2000); // 遅延表示

    }, [clientContext.state]);

    return <>
        {/*<UIContainer/>*/}
    </>
}