interface postCreationDTO{
    AutorName: string;
    TextContent: string;
    MediaFiles: string[];
    Date: number;
}
interface postDTO{
    Id:number;
    AutorName:string;
    TextContent:string;
    MediaFiles?:string[];
    AmountOfComments:number;
    AmountOfLikes:number;
    AutorProfileImage:string;
    Date:Date;
}