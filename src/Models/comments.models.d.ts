interface commentsDTO {
  Id: number;
  PostId: number;
  AutorName: string;
  TextContent: string;
  AutorProfileImage: string;
  Date: Date;
}
interface commentsCreationDTO {
  postId: number;
  autorId: string;
  textContent: string;
  date: Date;
}
