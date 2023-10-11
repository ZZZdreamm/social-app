export interface ReelsDto {
  Id: string;
  MediaFile: string;
  CreationTime: Date;
  ExpirationTime: Date;
  AutorId: string;
}

export interface ReelsCreationDto {
  MediaFile: File;
  CreationTime: number;
  ExpirationTime: number;
  AutorId: string;
}
