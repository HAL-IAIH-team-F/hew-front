import LpContainer from "@/(main)/lp/(top)/LpContainer";
import {ReactNode} from "react";
import {useClientState} from "~/api/context/ClientContextProvider";
import useRoutes from "~/route/useRoutes";

export default function LpRegisterContainer(
    {
        children,
    }: { children?: ReactNode },
) {
    const clientState = useClientState()
    const routes = useRoutes()
    return (
        <LpContainer
            isShow={clientState.state != "registered" && clientState.state != "unauthenticated"}
            onComplete={() => {
                if (clientState.state != "unregistered") return routes.lp().transition()
            }}
        >
            {children}
        </LpContainer>
    )
}
