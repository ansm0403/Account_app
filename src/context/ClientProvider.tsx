'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { ReactNode } from 'react'

type Props = {
  children : ReactNode
}

export default function ClientProvider({children} : Props) {

  const client = new QueryClient()
    
  return (
    <QueryClientProvider client={client}>
        {children}
    </QueryClientProvider>
  )
}
