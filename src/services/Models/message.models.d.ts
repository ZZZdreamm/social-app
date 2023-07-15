export interface messageCreationDTO{
    SenderId:string;
    ReceiverId:string;
    SenderName:string;
    TextContent:string;
    MediaFiles:string[];
    VoiceFile:string;
    Date:number;
    Emojis: string[];
    AmountOfEmojis: number;
    responseTo:messageResponseDTO | undefined;
}

export interface messageDTO{
    Id:string;
    SenderId:string;
    SenderName:string;
    ReceiverId:string;
    TextContent:string;
    MediaFiles:string[];
    VoiceFile:string;
    Date:Date;
    Emojis: string[];
    AmountOfEmojis: number;
    responseTo:messageResponseDTO;
}


export interface messageResponseDTO{
    SenderName:string;
    TextContent:string;
    MediaFiles:string[];
}
