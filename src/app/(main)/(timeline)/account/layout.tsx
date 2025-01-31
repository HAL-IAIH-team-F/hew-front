import React, {ReactNode} from "react";
import ProfilePage from "@/(main)/(timeline)/account/profile/ProfilePage";

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
