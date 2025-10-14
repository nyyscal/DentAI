'use client'
import { isServer, QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// import { getQueryClient } from '@/app/get-query-client'
import type * as React from 'react'

function makeQueryClient(){
  return new QueryClient({
    defaultOptions:{
      queries:{
        staleTime: 60*1000,
      }
    }
  })
}

let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient(){
  if(isServer){
    return makeQueryClient()
  }else{
    if(!browserQueryClient) browserQueryClient = makeQueryClient()
      return browserQueryClient
  }
}

export default function TanStackProviders({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}