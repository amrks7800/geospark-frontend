"use client"

import { Video } from "@/types"
import {
  Box,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
} from "@chakra-ui/react"
import { useEffect } from "react"

type StepProps = {
  steps: Video[]
  activeIdx: number
}

export function StepCounter({
  steps,
  activeIdx,
}: StepProps) {
  const { activeStep, setActiveStep } = useSteps({
    index: activeIdx,
    count: steps.length,
  })

  useEffect(() => {
    setActiveStep(activeIdx)
  }, [activeIdx])

  return (
    <Stepper index={activeStep}>
      {steps.map((step, index) => (
        <Step key={index}>
          <StepIndicator>
            <StepStatus
              complete={<StepIcon />}
              incomplete={<StepNumber />}
              active={<StepNumber />}
            />
          </StepIndicator>

          <Box flexShrink="0">
            <StepTitle>{step.title}</StepTitle>
          </Box>

          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  )
}
