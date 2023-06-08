export interface profileDTO {
  id: string;
  email: string;
  profileImage?: string;
}
export interface profileImageCreationDTO{
  id:string;
  email:string;
  profileImage:File;
}
