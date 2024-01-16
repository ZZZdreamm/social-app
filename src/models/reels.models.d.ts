export interface ReelsDto {
  Id: string;
  Name: string;
  MediaFile: string;
  CreationTime: Date;
  ExpirationTime: Date;
  AutorId: string;
  AutorName: string;
  AutorProfileImage: string;
}

export interface ReelsCreationDto {
  Name: string;
  MediaFile: File;
  CreationTime: number;
  ExpirationTime: number;
  AutorId: string;
}
