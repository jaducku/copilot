import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { LLM } from 'src/common/chat/llm';
import { LLMWithRAG } from 'src/common/chat/llm-with-rag';

@Module({
  imports: [LLM],
  controllers: [MessagesController],
  providers: [MessagesService,LLM],
})
export class MessagesModule {}
