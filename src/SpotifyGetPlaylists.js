import {React, useState, useEffect} from "react";
import axios from "axios";
const SpotifyGetPlaylists = () => {
    const [token, setToken] = useState('');
    const [data, setData] = useState({});

    useEffect(() => {
        if (localStorage.getItem("accessToken")) {
            setToken(localStorage.getItem("accessToken"))
        }
    }, []);

    const handleGetPlaylists = () => {
        console.log(token)
        axios.get("https://api.spotify.com/v1/me/playlists/", {
            headers: {
                Authorization: "Bearer " + token,
            },
        }).then(response => {
            
            console.log(response)
            setData(response.data)
        })
        .catch((error) => console.log(error))

        axios.get(" 	https://api.spotify.com/v1/playlists/5LjgYuUQ74DB6M69k90d6p/tracks", {
            headers: {
                Authorization: "Bearer " + token,
            },
        }).then(response => {
            
            console.log(response.data.items[0].track.name)
        })
        .catch((error) => console.log(error))
        console.log(data)
    };

    return (
        <button onClick={handleGetPlaylists}>
            get Playlists
            {data.items ? data.items.map((item) => <p>{item.name}</p>) : null}
        </button>
    );
};

export default SpotifyGetPlaylists;