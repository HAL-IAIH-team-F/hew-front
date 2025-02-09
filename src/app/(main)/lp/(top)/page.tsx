"use client"
import "../../../../../public/fonts/font.css"
import React from "react";
import OpenDescriptionButton from "@/(main)/lp/(top)/_top/OpenDescriptionButton";
import LpTopUi from "@/(main)/lp/(top)/_top/LpTopUi";


export default function Page(
    {}: {}
) {
    return <>
        <LpTopUi/>
        <OpenDescriptionButton/>
    </>
}