import { ReadyImagesURL } from "../../globals/appUrls";
import { Image } from "../../_utils/image/Image";

export function ClosedEyeIcon() {
  return <Image style={{width:"80%", height:"80%"}} imageURL={`${ReadyImagesURL}/eye-closed-icon.png`} />;
}
