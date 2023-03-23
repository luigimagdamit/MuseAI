import './App.css';
import useChatGPT from './logic/useChatGPT';
import SpotifyWebApi from 'spotify-web-api-js';
import { useEffect, useState } from 'react';
import abcjs from 'abcjs';
import axios from 'axios';
import SpotifyGetPlaylists from './SpotifyGetPlaylists'
import { getReturnedParamsFromSpotifyAuth, loginUrl } from './logic/spotifyAccess';

let parseAbc = (text) => {
  var str = text;
  str = str.split("X:1").pop();
  console.log("yuh")
  console.log("X:1" + str)
  abcjs.renderAbc("paper", "X:1\nK:D\nDD AA|BBA2|\n");
  // download("song.abc", str)
}

let abcString = ""


// function download(filename, text) {
//   var pom = document.createElement('a');
//   pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
//   pom.setAttribute('download', filename);

//   if (document.createEvent) {
//       var event = document.createEvent('MouseEvents');
//       event.initEvent('click', true, true);
//       pom.dispatchEvent(event);
//   }
//   else {
//       pom.click();
//   }
// }

function App() {

  const { handleSubmit, setPrompt, response, prompt } = useChatGPT();
  const { playlistNames, setPlaylistNames } = useState([])
  const { sData, setsData } = useState({})
  let spotifyApi = new SpotifyWebApi();
  let playlist_names = []

  const handleLogin = () => {
    window.location = loginUrl
  }
 useEffect (() => {
    if(window.location.hash) {
      
      const { access_token, expires_in, token_type } = getReturnedParamsFromSpotifyAuth(window.location.hash)
      localStorage.clear();
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("tokenType", token_type);
      localStorage.setItem("expiresIn", expires_in)
      console.log(localStorage.getItem('accessToken'))
    }
    spotifyApi.setAccessToken(localStorage.getItem('accessToken'));
    console.log(localStorage.getItem("hello"))
    console.log(getPlaylists())
    console.log(sData)
})

const getPlaylists = () => {
  let playlist_names = []
  spotifyApi
    .getUserPlaylists() // note that we don't pass a user id
    .then(
      function (data) {
        let playlists = data.items
        playlists.forEach(element => playlist_names.push(element.name));
        setsData(data)
        setPlaylistNames(playlistNames)

      },
      function (err) {
        console.error(err);
      }
    ).catch((e) => console.log(e));
}
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
          <div id="paper">hewwnp</div>

          <p>{response} {parseAbc(response)}</p>
          <SpotifyGetPlaylists />
        </div>
      </header>
    </div>
  );
}

export default App;
