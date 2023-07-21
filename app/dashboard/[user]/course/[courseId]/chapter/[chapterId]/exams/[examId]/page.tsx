type PageProps = {
  params: {
    examId: string
  }
}

const page = ({ params: { examId } }: PageProps) => {
  return <div>page: {examId}</div>
}
export default page
