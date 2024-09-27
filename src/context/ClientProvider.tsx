'use client'
import React, { ReactNode, useState } from 'react'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'

// const client = new QueryClient({});

type Props = {
  children : ReactNode
  pageProps : any
}

export default function ClientProvider({children, pageProps : {dehydrateState}} : Props) {
  
  const [client] = useState(
    () => new QueryClient({
      defaultOptions : {
        queries : {
          staleTime : 60*1000,
        }
      }
    })
    
  )
  return (
    <QueryClientProvider client={client}>
      <Hydrate state={dehydrateState}>       
        {children}
      </Hydrate>
    </QueryClientProvider>
  )
}
