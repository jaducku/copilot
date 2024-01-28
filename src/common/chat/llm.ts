
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

export class LLM{
    constructor(apiKey: string){}

    async getResponse(prompt: string, datas: string): Promise<string>  {
        //여기에 이제 langchain기반의 llm 연계 진행
        const jsonData = JSON.stringify(datas,null,2);
        const p = ChatPromptTemplate.fromMessages([
            ["system","You are very powerful " + process.env.ROLE_OF_GPT+". Must tell me shortly"],
            ["human","{command}" + "data : {datas}"],
        ]);
        const model = new ChatOpenAI({openAIApiKey: process.env.OPENAI_API_KEY,});
        const outputParser = new StringOutputParser();

        const chain = p.pipe(model).pipe(outputParser);

        const response = await chain.invoke({
            command: prompt,
            datas: jsonData
        });

        return response;
    }
}