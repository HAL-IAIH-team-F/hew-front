import {ReactNode} from "react";
import {useDescriptionSwitchAnimationState} from "@/(main)/lp/DescriptionSwitchState";
import LpContainer from "@/(main)/lp/(top)/LpContainer";

export default function LpTopContainer(
    {
        children,
    }: {
        children?: ReactNode,
    },
) {
    const descriptionState = useDescriptionSwitchAnimationState()

    return (
        <LpContainer isShow={descriptionState.state != "requestOpen"}>
            {children}
        </LpContainer>
    )
}
