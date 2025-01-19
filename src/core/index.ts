import 'reflect-metadata';
import { NODE_ENV } from './config/env';
import { runAiAgent } from './modules/aiAgent/Index';
console.log(`Node Env : ${NODE_ENV}`);
console.log(`Directory : ${__dirname}`);

runAiAgent().then().catch((err)=>{
  console.log(err);
});
