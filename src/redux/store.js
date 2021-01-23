import { configureStore } from '@reduxjs/toolkit'
import initialState from './initialState'

import ARIReducer from "./reducers/ARI";

const store = configureStore({
  preloadedState: initialState,
  reducer: {
    // Code that changes different parts of the state based on actions dispatched
    ARI_years: ARIReducer,
  }
})

export default store;
