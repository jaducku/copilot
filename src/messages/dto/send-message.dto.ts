import { IsJSON, IsString } from "class-validator";

export class SendMessageDto {
    @IsString()
    prompt: string;
    @IsJSON()
    datas: string;
}