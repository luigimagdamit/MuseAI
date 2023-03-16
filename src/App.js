import logo from './logo.svg';
import './App.css';
import React, { Component, useEffect }  from 'react';

const CLIENT_ID = 'dbc3d2104607452ca6db9512421dcbda';
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize"
const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000/yuh"
const SPACE_DELIMITER = '%20'
const SCOPES = [
  "user-read-currently-playing",
  "user-read-playback-state"
]
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

const getReturnedParamsFromSpotifyAuth = (hash) => {
  const stringAfterHashtag = hash.substring(1);
  const paramsInUrl = stringAfterHashtag.split("&");
  const paramSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
    console.log(currentValue)
;    const [key, value] = currentValue.split("=");
    accumulater[key] = value;
    return accumulater
  }, {});

  return paramSplitUp
};
function App() {
  useEffect(() => {
    if(window.location.hash) {
      const { access_token, expires_in, token_type } = getReturnedParamsFromSpotifyAuth(window.location.hash)
      console.log( {access_token} );
      localStorage.clear();
      localStorage.setItem("tokenType", token_type);
      localStorage.setItem("tokenType", token_type);
      localStorage.setItem("expiresIn", expires_in)
    }
  })
  const handleLogin = () => {
    console.log("yuh");
    window.location = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scopes=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`
  }
  return (
    <div className="App">
      <header className="App-header">
        <button onClick = {handleLogin}>log in to spotify</button>
      </header>
    </div>
  );
}

export default App;
