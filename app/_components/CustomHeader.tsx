import React, { ReactNode } from 'react'

interface CustomHeaderProps {
    title: string
    children: ReactNode
}

const CustomHeader = ({ title, children }: CustomHeaderProps) => {
    return (
        <div>
            <h1>{title}</h1>
            <div className="text-center">{children}</div>
        </div>
    )
}

export default CustomHeader