import {ReactNode} from "react";
import {useDescriptionSwitchAnimationState} from "@/(main)/lp/DescriptionSwitchState";
import LpContainer from "@/(main)/lp/(top)/LpContainer";
import {useClientState} from "~/api/context/ClientContextProvider";
import useRoutes from "~/route/useRoutes";

export default function LpTopContainer(
    {
        children,
    }: {
        children?: ReactNode,
    },
) {
    const descriptionState = useDescriptionSwitchAnimationState()
    const clientState = useClientState()
    const routes = useRoutes()
    return (
        <LpContainer
            isShow={
                descriptionState.state != "requestOpen" && clientState.state != "registered"
                && clientState.state != "unregistered"
            }
            onComplete={() => {
                if (descriptionState.state == "requestOpen") return routes.lpDescription().transition()
                if (clientState.state == "unregistered") return routes.lpRegister().transition()
            }}
        >
            {children}
        </LpContainer>
    )
}
