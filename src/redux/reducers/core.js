import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  ARI_years: 10,
  display_ARI_or_AEP: 'ARI',
  duration_hours: 1,
  current_display: 'HIRDSv4',
};

const ARIslice = createSlice({
  name: 'core',
  initialState,
  reducers: {
    ARIYearsChange(state, action) {
      state.ARI_years = action.payload;
    },
    ARIAEPdisplayToggle(state, action) {
      if (state.display_ARI_or_AEP === 'ARI') {
        state.display_ARI_or_AEP = 'AEP'
      } else {
        state.display_ARI_or_AEP = 'ARI'
      }
    },
    durationHoursChange(state, action) {
      state.duration_hours = action.payload;
    },
  }
})

export const {
  ARIYearsChange,
  ARIAEPdisplayToggle,
  durationHoursChange,
} = ARIslice.actions

export default ARIslice.reducer
