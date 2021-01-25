import { configureStore } from '@reduxjs/toolkit'

import CoreReducer from "./reducers/core";
import HIRDSv4Reducer from "./reducers/core";

const store = configureStore({
  reducer: {
    // Code that changes different parts of the state based on actions dispatched
    core: CoreReducer,
    hirdsv4: HIRDSv4Reducer,
  }
})

export default store;
