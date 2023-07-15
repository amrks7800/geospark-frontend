const page = ({
  params,
}: {
  params: { chapterId: string }
}) => {
  return <div>chapter page:{params.chapterId}</div>
}
export default page
