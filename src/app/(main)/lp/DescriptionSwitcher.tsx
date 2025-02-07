"use client"
import React, {useEffect} from "react";
import {useClientState} from "~/api/context/ClientContextProvider";
import useRoutes from "~/route/useRoutes";

export default function DescriptionSwitcher(
    {}: {},
) {
    const clientContext = useClientState();
    const routes = useRoutes()
    useEffect(() => {
        console.log(clientContext.state)
        if (clientContext.state !== "registered") return
    }, [clientContext.state]);

    useEffect(() => {
        if (clientContext.state !== "unregistered") return
        setTimeout(() => routes.lpRegister().transition(), 2000); // 遅延表示

    }, [clientContext.state]);


    return (
        <>
            {/*{isVisible && ()}*/}
        </>
    )
}
