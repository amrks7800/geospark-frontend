"use client"

import React from "react"
import {
  ChakraProvider,
  extendTheme,
} from "@chakra-ui/react"
import { CacheProvider } from "@chakra-ui/next-js"
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import SubscriptionContext from "@/contexts/SubscriptionContext"

const colors = {
  brand: {
    900: "#4E4FEB",
    800: "#068FFF",
    700: "#EEEEEE",
  },
}

const queryClient = new QueryClient()

export const theme = extendTheme({ colors })

const Providers = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <SubscriptionContext>
        <CacheProvider>
          <ChakraProvider theme={theme}>
            {children}
            <ToastContainer />
          </ChakraProvider>
        </CacheProvider>
      </SubscriptionContext>
    </QueryClientProvider>
  )
}
export default Providers
