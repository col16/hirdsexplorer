const initialState = 100;

const setARI = (state = initialState, action) => {
  switch (action.type) {
    case 'core/ARI_years_change': {
      return action.payload
    }
    default: {
      return state;
    }
  }
};

export default setARI;
