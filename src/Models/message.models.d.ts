export interface messageCreationDTO{
    SenderId:string;
    ReceiverId:string;
    TextContent:string;
    MediaFiles:string[];
    VoiceFile:string;
    Date:number;
}

export interface messageDTO{
    Id:string;
    SenderId:string;
    ReceiverId:string;
    TextContent:string;
    MediaFiles:string[];
    VoiceFile:string;
    Date:Date;
}