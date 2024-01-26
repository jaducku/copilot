
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

export class LLM{
    constructor(apiKey: string){}

    async getResponse(prompt: string, datas: string): Promise<string>  {
        //여기에 이제 langchain기반의 llm 연계 진행
        const p = ChatPromptTemplate.fromMessages([
            ["human","You are a good analysist. {command}"],
        ]);
        const model = new ChatOpenAI({openAIApiKey: process.env.OPENAI_API_KEY,});
        const outputParser = new StringOutputParser();

        const chain = p.pipe(model).pipe(outputParser);

        const response = await chain.invoke({
            command: prompt,
        });

        return response;
    }
}