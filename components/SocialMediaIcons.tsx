import Link from "next/link"
import {
  AiFillFacebook,
  AiFillYoutube,
  AiFillLinkedin,
  AiFillInstagram,
} from "react-icons/ai"

const SocialMediaIcons = () => {
  return (
    <div className="flex items-center sm:justify-start justify-center gap-2">
      <Link
        href={
          "https://www.facebook.com/profile.php?id=100093559575904&mibextid=ZbWKwL"
        }
      >
        <AiFillFacebook size={35} color="#1877f2" />
      </Link>
      <Link
        href={"https://youtube.com/@GeologistAhmadFarnwany"}
      >
        <AiFillYoutube size={35} color="#ff0000" />
      </Link>
      {/* <AiFillLinkedin size={35} color="#0a66c2" />
      <AiFillInstagram size={35} color="#c13584" /> */}
    </div>
  )
}
export default SocialMediaIcons
