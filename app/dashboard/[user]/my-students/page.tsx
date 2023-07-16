"use client"

import { Table } from "@/components"
import { useQuery } from "@tanstack/react-query"
import { getAllUsers } from "@/utils"
import { Spinner } from "@chakra-ui/react"

export default function Page() {
  const { data, error, isLoading } = useQuery({
    queryFn: getAllUsers,
    queryKey: ["user"],
  })

  if (data) {
    return (
      <div className="p-4 flex-1 h-[88vh] overflow-y-scroll">
        <div className="max-sm:overflow-x-scroll max-sm:w-[85vw] max-sm:mx-auto">
          <div className="w-fit">
            <Table
              headers={[
                "الاسم",
                "البريد الالكتروني",
                "الحالة",
              ]}
              items={data?.users}
              type="users"
            />
          </div>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <Spinner
        thickness="4px"
        speed="1.5s"
        emptyColor="gray.200"
        color="blue.500"
        size="xl"
      />
    )
  }
}
