'use client'

import { useSession } from 'next-auth/react'
import React from 'react'

export default function AuthGuard({children} : {children : React.ReactNode}) {
    const {data, status} = useSession();
  

    if(status === 'loading'){
        return null
    }

    return ( <> {children} </> )
}
