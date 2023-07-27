import { Video } from "@/types"

const VideoPlayer = ({ video }: { video: Video }) => {
  if (!video) return <h1>لم يتم اضافة فيديو هنا بعد 🤔</h1>
  return (
    <>
      <h1 className="text-xl w-fit mx-auto text-primary-blue font-bold my-4">
        {video.title}
      </h1>
      <iframe
        height="315"
        src={video.url}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="block mx-auto sm:w-[560px] w-[94vw]"
      ></iframe>
    </>
  )
}
export default VideoPlayer
