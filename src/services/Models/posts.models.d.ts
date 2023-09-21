interface postCreationDTO {
  AutorId: string;
  AutorName: string;
  TextContent: string;
  MediaFiles: string[];
  Date: number;
}
interface postDTO {
  Id: string;
  AutorId: string;
  AutorName: string;
  TextContent: string;
  MediaFiles?: string[];
  AmountOfComments: number;
  AmountOfLikes: number;
  AutorProfileImage: string;
  Date: number;
}
