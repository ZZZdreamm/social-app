export interface profileDTO {
  Id: string;
  Email: string;
  ProfileImage?: string;
  Roles?: string[];
}
export interface profileImageCreationDTO{
  id:string;
  email:string;
  profileImage:File;
}
