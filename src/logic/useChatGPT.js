import { useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from "react-redux";
import { setLyrics } from "../trackSlice";

const useChatGPT = () => {
  const lyrics = useSelector((state) => state.lyrics)
  const dispatch = useDispatch()
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
        dispatch(setLyrics(res.data))
        // console.log(lyrics)
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

export const useChatGPTExternal = () => {
  const lyrics = useSelector((state) => state.lyrics)
  const dispatch = useDispatch()

  const HandleSubmitExternal = (prompt) => {
    console.log("Sending message to server ... EXTERNAL")
    dispatch(setLyrics("loading...."))
    // Send a request to the server with the prompt
    axios
      .post("https://agile-wildwood-37583.herokuapp.com/chat", { prompt })
      .then((res) => {
        // Update the response state with the server's response
        //setResponse(res.data);
        console.log(res.data);
        dispatch(setLyrics(res.data))
      })
      .catch((err) => {
        console.error(err);
      });
  };
  return {
    HandleSubmitExternal
  }
}

export default useChatGPT;