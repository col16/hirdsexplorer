import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  time_period: 'historical',
  rcp_scenario: 8.5,
};

const HIRDSv4slice = createSlice({
  name: 'hirdsv4',
  initialState,
  reducers: {
  }
})

//export const {  } = HIRDSv4slice.actions

export default HIRDSv4slice.reducer
