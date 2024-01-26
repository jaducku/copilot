import { IsString } from "class-validator";

export class SendMessageDto {
    @IsString()
    prompt: string;
    @IsString()
    datas: string;
}


git config --global user.name "jaducku"
git config --global user.email "jaducku@gmail.com"
