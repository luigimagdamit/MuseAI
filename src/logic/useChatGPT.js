import { useState } from 'react';
import axios from 'axios';

const useChatGPT = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = (e) => {
    console.log("Sending message to server ...")
    e.preventDefault();
    // Send a request to the server with the prompt
    axios
      .post("https://agile-wildwood-37583.herokuapp.com/chat", { prompt })
      .then((res) => {
        // Update the response state with the server's response
        setResponse(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
    return {
        handleSubmit,
        setPrompt,
        response,
        prompt
    };
};

export default useChatGPT;