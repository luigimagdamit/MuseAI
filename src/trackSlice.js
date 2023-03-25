import { createSlice } from '@reduxjs/toolkit'

export const trackSlice = createSlice({
    name: 'tracks',
    initialState: {
        value: [],
        lyrics: ""
    },

    reducers: {
        addTrack: (state, action) => {
            state.value.push(action.payload)
        },
        setLyrics: (state, action) => {
            state.lyrics = action.payload
        }
    }
})
export const { addTrack, setLyrics } = trackSlice.actions
export default trackSlice.reducer