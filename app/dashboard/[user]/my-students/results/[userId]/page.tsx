type PageProps = {
  params: {
    userId: string
  }
}

const page = ({ params: { userId } }: PageProps) => {
  return <div>page: {userId}</div>
}
export default page
