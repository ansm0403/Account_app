'use client'

import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { ReactNode } from 'react'

type Props = {
  children : ReactNode
}

export default function ClientProvider({children} : Props) {

  const client = new QueryClient({
    queryCache : new QueryCache({
      onError : (error) => 
        console.log("에러 : ", error.message)
    })
  })
    
  return (
    <QueryClientProvider client={client}>
        {children}
    </QueryClientProvider>
  )
}
