import { configureStore } from '@reduxjs/toolkit'
import trackSlice from './trackSlice'

export default configureStore({
  reducer: {tracks: trackSlice},
})