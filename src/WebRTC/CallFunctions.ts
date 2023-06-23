import { profileDTO } from "../ZZZ_USEFUL COMPONENTS/Profile/profiles.models";
import { ReadyImagesURL } from "../ZZZ_USEFUL COMPONENTS/appUrls";

export function openCallWindow(myProfile:profileDTO, friend:profileDTO, roomId:string, url:string){
    var width = window.innerWidth/4;
    var height =window.innerHeight/4;
    var left = (window.innerWidth - width) / 5;
    var top = (window.innerHeight - height) / 5;
    var windowFeatures = "width=" + 600 + ",height=" + 600 + ",left=" + left + ",top=" + top;
    window.open(`${ReadyImagesURL}/#/call/${url}/${myProfile.Id}/${friend.Id}/${roomId}`, "_blank", windowFeatures);
  }