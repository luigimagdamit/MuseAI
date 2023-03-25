const CLIENT_ID = 'dbc3d2104607452ca6db9512421dcbda';
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize";
const REDIRECT_URL_AFTER_LOGIN = "https://museai.netlify.app/";
const SPACE_DELIMITER = '%20';
const SCOPES = [
  "user-read-currently-playing",
  "user-read-playback-state",
  "user-read-private",
  "user-read-recently-played",
  "user-read-email",
  "playlist-read-private",
  "user-top-read",
];
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

const loginUrl = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scopes=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`;

const getReturnedParamsFromSpotifyAuth = (hash) => {
  const stringAfterHashtag = hash.substring(1);
  const paramsInUrl = stringAfterHashtag.split("&");
  const paramSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
    const [key, value] = currentValue.split("=");
    accumulater[key] = value;
    return accumulater
  }, {});

  return paramSplitUp
};

const getTokens = () => {
  const { access_token, expires_in, token_type } = getReturnedParamsFromSpotifyAuth(window.location.hash)
  localStorage.clear();
  localStorage.setItem("accessToken", access_token);
  localStorage.setItem("tokenType", token_type);
  localStorage.setItem("expiresIn", expires_in)
  console.log("Success! Token is set.")
  console.log(localStorage.getItem('accessToken'))
}

const spotifyAccess = () => {
  return {
    getTokens,
    loginUrl
  }
};

export default spotifyAccess;