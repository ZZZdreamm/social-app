export interface ReelsDto {
  Id: string;
  MediaFile: string;
  CreationTime: Date;
  ExpirationTime: Date;
  AutorId: string;
  AutorName: string;
  AutorProfileImage: string;
}

export interface ReelsCreationDto {
  MediaFile: File;
  CreationTime: number;
  ExpirationTime: number;
  AutorId: string;
}
