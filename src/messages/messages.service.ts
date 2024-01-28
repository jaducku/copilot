import { Injectable } from '@nestjs/common';
import { SendMessageDto } from './dto/send-message.dto';
import { LLM } from 'src/common/chat/llm';
import { Inject, forwardRef } from '@nestjs/common';
import { LLMWithRAG } from 'src/common/chat/llm-with-rag';

@Injectable()
export class MessagesService {
  constructor(
    @Inject(forwardRef(() => LLM))
    private llm: LLM
  ) {}

  async send(sendMessageDto: SendMessageDto){
    return this.llm.chat(sendMessageDto.prompt,sendMessageDto.datas);
  }
}
