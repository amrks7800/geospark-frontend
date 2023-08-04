import { ChakraTable } from "@/components"
import { getUserResultById } from "@/utils"
import { useQuery } from "@tanstack/react-query"
import { toast } from "react-toastify"

type PageProps = {
  params: {
    userId: string
  }
}

const page = ({ params: { userId } }: PageProps) => {
  const {
    data: results,
    error,
    isLoading,
  } = useQuery({
    queryFn: () => getUserResultById(userId),
    queryKey: ["results"],
  })

  if (error) {
    toast("حاول مرة اخري", { type: "error" })
    return "😢"
  }

  if (results) {
    return (
      <div className="p-4 flex-1 cut-viewport-height overflow-y-scroll">
        <ChakraTable
          headers={["الامتحان", "النتيجة"]}
          type="results"
          bodyItem={results}
        />
      </div>
    )
  }
}
export default page
