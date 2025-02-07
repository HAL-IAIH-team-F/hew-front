
"use client"
import React, {ReactNode, useEffect, useState} from "react";
import {DescriptionButton} from "@/_top/Description";
import UIContainer from "@/_top/UIContainer";
import {useClientState} from "~/api/context/ClientContextProvider";
import useRoutes from "~/route/useRoutes";

export default function Layout(
    {
        children,
    }: Readonly<{
        children: ReactNode;
    }>) {
    return (
        <>
        </>
    )
}
