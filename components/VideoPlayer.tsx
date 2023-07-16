import { Video } from "@/types"

const VideoPlayer = ({ video }: { video: Video }) => {
  return (
    <>
      <h1 className="text-xl mx-auto text-primary-blue font-bold my-4">
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
