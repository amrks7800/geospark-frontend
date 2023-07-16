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

type StepProps = {
  steps: Video[]
  activeIdx: number
}

export function StepCounter({
  steps,
  activeIdx,
}: StepProps) {
  const { activeStep } = useSteps({
    index: activeIdx,
    count: steps.length,
  })

  return (
    <Stepper index={activeIdx}>
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
