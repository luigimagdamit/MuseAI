import {React, useState, useEffect} from "react";
import axios from "axios";

const SpotifyGetPlaylists = () => {
    const [token, setToken] = useState('');
    const [data, setData] = useState({});
    const [idList, setIdList] = useState([])
    const [trackList, setTrackList] = useState([])
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
            
            //console.log(response.data.items)
            setData(response.data)
            console.log(data.items)
            
        })
        // getTracksByID("5LjgYuUQ74DB6M69k90d6p");
        getTracksByID("44iiOPrXHNl846Xvei1CaG");

    };

    const getTracksByID = (id) => {
        console.log(id)
        let tempTrackList = []
        const playlistURL = `https://api.spotify.com/v1/playlists/${id}/tracks`;
        axios.get(playlistURL, {
            headers: {
                Authorization: "Bearer " + token,
            },
        }).then(response => {
            response.data.items.forEach(element => {
                //tempTrackList.push(element.track.name)
                setTrackList(trackList => [...trackList, element.track.name])
                // console.log(id)
            });
        })
        .catch((error) => console.log(error));
        console.log(trackList)
    }
    const gatherPlaylistsIDs = () => {
        let tempIdList = []
        console.log("Gathering...")
        console.log(data.items)
        let playlist_array = (data.items)
        playlist_array.forEach(element => {
            // console.log(element.id)
            tempIdList.push(element.id)
            
        })

        setIdList(tempIdList.slice(0, 5))
        console.log(idList)
        idList.forEach(element => {
            getTracksByID(element)
        })
        console.log(trackList)
    }

    return (
        <div>
        <button onClick={handleGetPlaylists}>
            get Playlists
        </button>
        <button onClick={console.log("ahhh")}>populate list</button>
        {data.items ? data.items.map((item) => <div><p>{item.name}</p><p>{item.id}</p></div>) : null}
        </div>
    );
};

export default SpotifyGetPlaylists;