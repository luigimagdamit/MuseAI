import './App.css';
import useChatGPT from './logic/useChatGPT';
import { useEffect } from 'react';
import SpotifyGetPlaylists from './SpotifyGetPlaylists'
import spotifyAccess from './logic/spotifyAccess';

function SpotifyLoginButton() {
  const { loginUrl, getTokens } = spotifyAccess();

  const handleLogin = () => {
    window.location = loginUrl
  };

  useEffect(() => {
    if(window.location.hash) {
      getTokens();
    };
  });

  return (
    <div>
      <button onClick = {handleLogin}>log in to spotify</button>
    </div>
  );
};

function ChatGptPrompt() {
  const { handleSubmit, setPrompt, response, prompt } = useChatGPT();
  return (
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
  )
}
function App() {
  return (
    <div className="App">
      <header className="App-header">     
        <SpotifyLoginButton />
        <ChatGptPrompt />
        <div id="paper">hewwnp</div>
        <SpotifyGetPlaylists />
      </header>
    </div>
  );
}

export default App;
