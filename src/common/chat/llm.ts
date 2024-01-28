
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { HNSWLib } from "@langchain/community/vectorstores/hnswlib";
import { formatDocumentsAsString } from "langchain/util/document";
import { PromptTemplate } from "@langchain/core/prompts";
import {
  RunnableSequence,
  RunnablePassthrough,
} from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";

export class LLM {
    constructor(){}
    async chat(question:string, datas:string){
        const model = new ChatOpenAI({openAIApiKey: process.env.OPENAI_API_KEY,});

        const vectorStore = await HNSWLib.fromTexts(
            [JSON.stringify(JSON.stringify(datas,null,2),null,2)],
            [{ id: 1 }],
            new OpenAIEmbeddings()
        );

        const retriever = vectorStore.asRetriever();
        const prompt = PromptTemplate.fromTemplate(`Answer the question based only on the following context:{context} Question: {question}`);

        const chain = RunnableSequence.from([
            {
                context: retriever.pipe(formatDocumentsAsString),
                question: new RunnablePassthrough(),
            },
            prompt,
            model,
            new StringOutputParser(),
        ]);
        
        const result = await chain.invoke(question);
        console.log(result);
        return result;
    }
}