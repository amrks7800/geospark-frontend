"use client"

import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react"
import { BiTrash } from "react-icons/bi"

const CustomAccordion = () => {
  return (
    <Accordion className="mt-5">
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box
              as="span"
              flex="1"
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
              textAlign="right"
            >
              Section 1 title{" "}
              <BiTrash size={20} color="#4E4FEB" />
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing
          elit, sed do eiusmod tempor incididunt ut labore
          et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box
              as="span"
              flex="1"
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-between"}
              textAlign="right"
            >
              Section 2 title{" "}
              <BiTrash size={20} color="#4E4FEB" />
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing
          elit, sed do eiusmod tempor incididunt ut labore
          et dolore magna aliqua. Ut enim ad minim veniam,
          quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  )
}
export default CustomAccordion
