import {useClientState} from "~/api/context/ClientContextProvider";
import useRoutes from "~/route/useRoutes";
import {useEffect} from "react";

export default function UnregisteredUserRedirect(
    {}: {},
) {
    const clientState = useClientState()
    const routes = useRoutes()
    useEffect(() => {
        if (clientState.state != "unregistered") return
        if (routes.lp().isCurrent()) return
        if (routes.lpRegister().isCurrent()) return
        if (routes.lpDescription().isCurrent()) return
        routes.lpRegister().transition()
    }, [routes, clientState.state]);
    return undefined
}
