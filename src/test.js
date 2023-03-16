import { ChatGPTAPI } from 'chatgpt';

const api = new ChatGPTAPI({ apiKey: process.env.OPEN_AI })
  
let res = await api.sendMessage('Hello world!')
console.log(res.text)
