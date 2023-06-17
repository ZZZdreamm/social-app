import { profileDTO } from "../ZZZ_USEFUL COMPONENTS/Profile/profiles.models";
import { ReadyImagesURL } from "../ZZZ_USEFUL COMPONENTS/appUrls";

export function openCallWindow(myProfile:profileDTO, friend:profileDTO, url:string){
    var width = window.innerWidth/4;
    var height =window.innerHeight/4;
    var left = (window.innerWidth - width) / 5;
    var top = (window.innerHeight - height) / 5;
    var windowFeatures = "width=" + width + ",height=" + height + ",left=" + left + ",top=" + top;
    window.open(`${ReadyImagesURL}/#/${url}/${myProfile.Id}/${friend.Id}`, "_blank", windowFeatures);
  }