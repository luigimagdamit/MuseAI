import { useState, useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import { getReturnedParamsFromSpotifyAuth, loginUrl } from './spotifyAccess';
import axios from 'axios';

const useLogin = () => {
    const [prompt, setPrompt] = useState("");
    const [response, setResponse] = useState("");
    let spotifyApi = new SpotifyWebApi();
    let playlist_names = []

    const handleLogin = () => {
        window.location = loginUrl
    }
  const handleSubmit = (e) => {
    e.preventDefault();
    // Send a request to the server with the prompt
    axios
      .post("https://agile-wildwood-37583.herokuapp.com/chat", { prompt })
      .then((res) => {
        // Update the response state with the server's response
        setResponse(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const useEffectBody = (windowlocationhash) => {
    
      const { access_token, expires_in, token_type } = getReturnedParamsFromSpotifyAuth(windowlocationhash)
      localStorage.clear();
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("tokenType", token_type);
      localStorage.setItem("expiresIn", expires_in)
    spotifyApi.setAccessToken(localStorage.getItem('accessToken'));
    
}

    const getPlaylists = (spotifyApi) => {
        spotifyApi
          .getUserPlaylists() // note that we don't pass a user id
          .then(
            function (data) {
              let playlists = data.items
              playlists.forEach(element => playlist_names.push(element.name));
    
            },
            function (err) {
              console.error(err);
            }
          );
      }
    return {
        handleLogin,
        handleSubmit,
        setPrompt,
        response,
        prompt,
        useEffectBody,
        spotifyApi,
        getPlaylists
    }
}

export default useLogin