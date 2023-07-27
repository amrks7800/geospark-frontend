"use client"

import { Question } from "@/types"
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react"
import { BiTrash } from "react-icons/bi"

type CustomAccordionProps = {
  questions: Pick<
    Question,
    "question" | "option1" | "option2" | "option3" | "id"
  >[]
}

const CustomAccordion = ({
  questions,
}: CustomAccordionProps) => {
  return (
    <Accordion className="mt-5">
      {questions.map((question, i) => (
        <AccordionItem key={question.id}>
          <h2>
            <AccordionButton>
              <Box
                as="span"
                flex="1"
                display={"flex"}
                alignItems={"center"}
                justifyContent={"space-between"}
                textAlign="right"
                textColor={"#2F2D51"}
                fontSize={"lg"}
                fontWeight={"semibold"}
              >
                {i + 1}-{" "}
                {question.question
                  .split(" ")
                  .slice(0, 15)
                  .join(" ")}{" "}
                <BiTrash size={20} color="#4E4FEB" />
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            <p className="my-2">a) {question.option1}</p>
            <p className="my-2">b) {question.option2}</p>
            <p className="my-2">c) {question.option3}</p>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
export default CustomAccordion
