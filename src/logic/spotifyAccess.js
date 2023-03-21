const CLIENT_ID = 'dbc3d2104607452ca6db9512421dcbda';
const SPOTIFY_AUTHORIZE_ENDPOINT = "https://accounts.spotify.com/authorize"
const REDIRECT_URL_AFTER_LOGIN = "http://localhost:3000/yuh"
const SPACE_DELIMITER = '%20'
const SCOPES = [
  "user-read-currently-playing",
  "user-read-playback-state",
  "user-top-read",
  "user-read-private",
  "user-read-recently-played",
  "user-read-email"
]
const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

export const loginUrl = `${SPOTIFY_AUTHORIZE_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL_AFTER_LOGIN}&scopes=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`

export const getReturnedParamsFromSpotifyAuth = (hash) => {
  const stringAfterHashtag = hash.substring(1);
  const paramsInUrl = stringAfterHashtag.split("&");
  const paramSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
    const [key, value] = currentValue.split("=");
    accumulater[key] = value;
    return accumulater
  }, {});

  return paramSplitUp
};