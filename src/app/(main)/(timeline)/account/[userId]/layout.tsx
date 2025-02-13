import React, {ReactNode} from "react";
import ProfilePage from "@/(main)/(timeline)/account/[userId]/profile/ProfilePage";

export default function Layout(
    {
        children,
    }: Readonly<{
        children: ReactNode;
    }>) {

    return (
        <>
            <ProfilePage/>
        </>
    )
}
