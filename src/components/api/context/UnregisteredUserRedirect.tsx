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
        if (routes.userRegister().isCurrent()) return
        routes.userRegister().transition()
    }, [routes, clientState.state]);
    return undefined
}
