import { ReadyImagesURL } from "../appUrls";
import { profileDTO } from "./profiles.models";



export function saveProfile(userId:string, email:string){
    localStorage.setItem("id",userId);
    localStorage.setItem("email",email);
}
export function getProfile(): profileDTO{
    const id = localStorage.getItem("id");
    const email = localStorage.getItem("email");
    const profileImage = localStorage.getItem("profileImage");
    const response : profileDTO = {id:id!,email:email!};
    if(profileImage){
        response.profileImage = profileImage;
    }
    return response;
}