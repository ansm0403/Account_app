'use client'
import { useSession } from 'next-auth/react';
import React from 'react'

export default function ClientHome() {
    const {data} = useSession();

    console.log("session : ", data);
  
    return (
        <div>
            
        </div>
    )
}
