import { Injectable } from '@nestjs/common';
import { SendMessageDto } from './dto/send-message.dto';
import { LLM } from 'src/common/chat/llm';
import { Inject, forwardRef } from '@nestjs/common';

@Injectable()
export class MessagesService {
  constructor(
    @Inject(forwardRef(() => LLM))
    private llm: LLM,
  ) {}

  async send(sendMessageDto: SendMessageDto){
    const prompt = sendMessageDto.prompt;
    const datas = sendMessageDto.datas;
    return this.llm.getResponse(prompt,datas);
  }
}
