"use client"

import { useDisclosure } from "@chakra-ui/react"
import React, { createContext, useContext } from "react"

type context = {
  isOpen?: boolean
  onOpen?: () => void
  onClose?: () => void
}

const SubContext = createContext<context>({})

type SubscriptionProps = {
  children: React.ReactNode
}

const SubscriptionContext = ({
  children,
}: SubscriptionProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <SubContext.Provider
      value={{ isOpen, onClose, onOpen }}
    >
      {children}
    </SubContext.Provider>
  )
}
export default SubscriptionContext

export const useSubscription = () =>
  useContext<context>(SubContext)
