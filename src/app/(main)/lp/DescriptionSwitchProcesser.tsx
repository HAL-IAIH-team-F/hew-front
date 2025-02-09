import {useEffect} from "react";
import useRoutes from "~/route/useRoutes";
import {useDescriptionSwitchAnimationState} from "@/(main)/lp/DescriptionSwitchState";

export default function DescriptionSwitchProcesser(
    {}: {},
) {
    const routes = useRoutes()
    const descriptionState = useDescriptionSwitchAnimationState()

    useEffect(() => {
        if (descriptionState.state != "requestClose") return
        routes.lp().transition()
    }, [descriptionState.state]);

    return (
        <>
        </>
    )
}
