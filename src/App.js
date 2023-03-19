import './App.css';
import React, { useEffect, useState }  from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
import axios from "axios";
import { getReturnedParamsFromSpotifyAuth, loginUrl } from './logic/spotifyAccess';

const playlist_names = []

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  useEffect(() => {
    if(window.location.hash) {
      const { access_token, expires_in, token_type } = getReturnedParamsFromSpotifyAuth(window.location.hash)
      localStorage.clear();
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("tokenType", token_type);
      localStorage.setItem("expiresIn", expires_in)
    }

    let spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(localStorage.getItem('accessToken'));
    
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
    console.log(playlist_names)
  })
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
  return (
    <div className="App">
      <header className="App-header">
        <button onClick = {handleLogin}>log in to spotify</button>
        <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <p>{response}</p>
    </div>
      </header>
    </div>
  );
}

export default App;
