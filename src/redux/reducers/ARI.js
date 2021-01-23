import { createSlice } from '@reduxjs/toolkit'

const initialState = 100;

const ARIslice = createSlice({
  name: 'core',
  initialState,
  reducers: {
    ARI_years_change(state, action) {
      return action.payload;
    },
  }
})

export const { ARI_years_change } = ARIslice.actions

export default ARIslice.reducer
