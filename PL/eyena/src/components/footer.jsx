import { WhatsAppIcon } from "./icons/whatsAppIcon";
import { FaceBookIcon } from "./icons/facebookIcon";
import { TwitterIcon } from "./icons/twitterIcon";
import { InstagramIcon } from "./icons/instgramIcon";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <>
      <div className="footer  bg-secondary bottom-0  w-full p-2 ">
        <div className="follow-us flex flex-col justify-center items-center mb-3">
          <p className="text-primary font-bold my-1">
            Follow us on Social Media
          </p>
          <div className="social-media flex gap-3">
            <div className="w-8 hover:cursor-pointer">
              <FaceBookIcon color={"#edcf5d"} secondaryColor={"#010101"} />
            </div>
            <div className="w-8 hover:cursor-pointer">
              <TwitterIcon color={"#edcf5d"} secondaryColor={"#010101"} />
            </div>
            <div className="w-8 hover:cursor-pointer">
              <InstagramIcon color={"#edcf5d"} secondaryColor={"#010101"} />
            </div>
            <div className="w-8 hover:cursor-pointer">
              <WhatsAppIcon color={"#edcf5d"} secondaryColor={"#010101"} />
            </div>
          </div>
        </div>
        <div className="copy-rights text-sm text-primary flex flex-col justify-center items-center">
          <p> &copy; CopyRights {year}</p>
        </div>
      </div>
    </>
  );
}
