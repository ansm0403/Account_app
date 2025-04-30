'use client'
import { useSession } from 'next-auth/react';
import React from 'react'

export default function ClientHome() {
    const {data} = useSession();

    return (
        <div>
            
        </div>
    )
}
