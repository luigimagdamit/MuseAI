import {React, useState, useEffect} from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addTrack } from "./trackSlice";

const SpotifyGetPlaylists = () => {
    const [token, setToken] = useState('');
    const [data, setData] = useState({});
    const [idList, setIdList] = useState([])
    const [trackList, setTrackList] = useState([])
    const [ flag, setFlag ] = useState("tracks not got")
    const count = useSelector((state) => state.tracks.value)
    const dispatch = useDispatch()
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
        console.log(idList)
        // getTracksByID("5LjgYuUQ74DB6M69k90d6p");
        // getTracksByID(idList[0]);

    };

    const getTracksByID = (id) => {
        const playlistURL = `https://api.spotify.com/v1/playlists/${id}/tracks`;
        axios.get(playlistURL, {
            headers: {
                Authorization: "Bearer " + token,
            },
        }).then(response => {
            response.data.items.forEach(element => {
                //setTrackList(trackList => [...trackList, element.track.name])
                dispatch(addTrack(element.track.name))
            });
        })
        .catch((error) => console.log(error));
        console.log(count)
        setFlag("tracks done got")
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
        // console.log(idList)
        // idList.forEach(element => {
        //     getTracksByID(element)
        // })
        // console.log(trackList)
    }

    return (
        <div>
        <button onClick={handleGetPlaylists}>
            get Playlists
        </button>
        <button onClick={gatherPlaylistsIDs}>
            get playlist ids
        </button>
        <button onClick={() => getTracksByID(idList[2])}>
            get tracks
        </button>
        <p>{flag}</p>
        <p>{Object.keys(data)}</p>
        <p>{idList.toString()}</p>
        {/* {data.items ? data.items.map((item) => <div><p>{item.name}</p><p>{item.id}</p></div>) : null} */}
        </div>

    );
};

export default SpotifyGetPlaylists;