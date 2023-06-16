interface postCreationDTO{
    autorName:string;
    textContent:string;
    mediaFile?:File;
    Date:Date;
}
interface postDTO{
    Id:number;
    AutorName:string;
    TextContent:string;
    MediaFile?:string;
    AmountOfComments:number;
    AmountOfLikes:number;
    AutorProfileImage:string;
    Date:Date;
}