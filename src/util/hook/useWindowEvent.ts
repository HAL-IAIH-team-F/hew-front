import {useMemo} from "react";

export default function useWindowEvent<K extends keyof WindowEventMap>(
    event: K, handler: (this: Window, ev: WindowEventMap[K]) => void, deps: any[]
) {
    useMemo(() => {
        window.addEventListener(event, handler)
        return () => {
            window.removeEventListener(event, handler)
        }
    }, deps)
}