import { ReadyImagesURL } from "../../globals/appUrls";
import { profileDTO } from "../../models/profiles.models";

export function openCallWindow(myProfile:profileDTO, friend:profileDTO, roomId:string, url:string){
    var width = window.innerWidth/4;
    var height =window.innerHeight/4;
    var left = (window.innerWidth - width) / 10;
    var top = (window.innerHeight - height) / 10;
    var windowFeatures = "width=" + 600 + ",height=" + 600 + ",left=" + left + ",top=" + top;
    window.open(`${ReadyImagesURL}/#/call/${url}/${myProfile.Id}/${friend.Id}/${roomId}`, "_blank", windowFeatures);
  }