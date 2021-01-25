import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  ARI_years: 100,
  display_ARI_or_AEP: 'AEP',
  duration_hours: 24,
  current_display: 'HIRDSv4',
};

const ARIslice = createSlice({
  name: 'core',
  initialState,
  reducers: {
    ARIYearsChange(state, action) {
      state.ARI_years = action.payload;
    },
    durationHoursChange(state, action) {
      state.duration_hours = action.payload;
    },
  }
})

export const { ARIYearsChange, durationHoursChange } = ARIslice.actions

export default ARIslice.reducer
