import React, { ReactNode } from 'react'

interface CardContentProps {
    children: ReactNode;
    classes?: string
}

export default function CardContent({children, classes = "space-y-2"}: CardContentProps) {
    return (
        <div className={classes}>
            {children}
        </div>
    )
}