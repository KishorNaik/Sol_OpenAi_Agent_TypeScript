import {getWeatherDetails} from '../tools/index';
import OpenAI from 'openai';
import readLineSync from 'readline-sync';
import { IMessages } from './types';
import { systemPrompt } from './prompts';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const tools={
  "getWeatherDetails":getWeatherDetails
}

const messages:IMessages[]=[
  {
    role:"system",
    content:systemPrompt
  }
]

export const runAiAgent=async ()=>{
  while(true){
    // Get the Question from the user
    const userQuestionQuery=readLineSync.question('User: ');

    // map user  query to query object
    const query={
      type:"user",
      user:userQuestionQuery
    }

    // push the query to messages array
    messages.push({
      role:"user",
      content:JSON.stringify(query)
    });

    // call the openai api
    while(true){
      const chat=await client.chat.completions.create({
        model: 'gpt-4o',
        messages:messages as any,
        response_format:{
          type:"json_object"
        }
      });

      const result=chat.choices[0].message.content;
      messages.push({
        role:"assistant",
        content:result!
      });

      console.log(`\n\n----------------------START AI-----------------------`);
      console.log(`Result:${result}`);
      console.log(`----------------------END AI-----------------------\n\n`);

      const call=JSON.parse(result!);
      if(call.type==='output'){
        console.log(`Assistant: ${call.output}`);
        break;
      }
      else if (call.type === 'action') {
        const functionCall = tools[call.function as keyof typeof tools];
        const observation = functionCall(call.input);
        const observationQuery = {
          type: 'observation',
          observation,
        }
        messages.push({
          role: 'developer',
          content: JSON.stringify(observationQuery),
        });
      }
    }
  }
}
