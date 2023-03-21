import './App.css';
import useLogin from './logic/useLogin';
import { useEffect } from 'react';
import { getReturnedParamsFromSpotifyAuth } from './logic/spotifyAccess';
function App() {

  const { handleLogin, handleSubmit, setPrompt, response, prompt, useEffectBody, spotifyApi, getPlaylists } = useLogin();
  
  useEffect = () => {
    if(window.location.hash) {
      
      const { access_token, expires_in, token_type } = getReturnedParamsFromSpotifyAuth(window.location.hash)
      localStorage.clear();
      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("tokenType", token_type);
      localStorage.setItem("expiresIn", expires_in)
    }
    spotifyApi.setAccessToken(localStorage.getItem('accessToken'));
    console.log(spotifyApi)
    
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
          <p>{response}</p>
        </div>
      </header>
    </div>
  );
}

export default App;
