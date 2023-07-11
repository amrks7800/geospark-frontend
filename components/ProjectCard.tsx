"use client"

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Text,
} from "@chakra-ui/react"

const ProjectCard = () => {
  return (
    <Card>
      <CardHeader>
        <Heading size="md" color={"#4E4FEB"}>
          اساسيات الجيولوجيا
        </Heading>
      </CardHeader>
      <CardBody>
        <Text>كورس تأسيسي في مادة الجيولوجيا</Text>
      </CardBody>
      <CardFooter>
        <Button variant={"outline"} color="#4E4FEB">
          عرض
        </Button>
      </CardFooter>
    </Card>
  )
}
export default ProjectCard
