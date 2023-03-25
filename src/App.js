import './App.css';
import useChatGPT, { useChatGPTExternal } from './logic/useChatGPT';
import { useEffect } from 'react';
import SpotifyGetPlaylists from './SpotifyGetPlaylists'
import spotifyAccess from './logic/spotifyAccess';
import  { Provider, useDispatch, useSelector } from 'react-redux';
import store from './store'
import { addTrack } from './trackSlice';

// "Can you write original lyrics for a single song in the style of these songs:  " + tracks.toString()
function Counter() {
  const tracks = useSelector((state) => state.tracks.value)
  const lyrics = useSelector((state) => state.tracks.lyrics)
  const HandleSubmitExternal = useChatGPTExternal()
  const dispatch = useDispatch()
  return (
    <div>
      <div>
        
        <button onClick={() => (HandleSubmitExternal.HandleSubmitExternal(
          "Can you write original lyrics for a single song in the style of these songs:  " + tracks.toString()
        ))}>
          test
        </button>
        <br></br>
        <p>{lyrics}</p>
        <span>{tracks}</span>
      </div>
    </div>
  )
}

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

function Main() {
  return (
    <div>
      <header className="App-header">     
        <SpotifyLoginButton />
        {/* <ChatGptPrompt /> */}
        <div id="paper">hewwnp</div>
        <SpotifyGetPlaylists />
        <Counter />
      </header>
    </div>
  )
}
function App() {
  return (
    <div className="App">
      <Provider store = {store}>
        <Main />
      </Provider>
      
    </div>
  );
}

export default App;
