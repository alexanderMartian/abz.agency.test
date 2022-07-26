import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isActive: false,
  text: '',
  coordinates: []
};

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    showMessage(state, payload ) {
          state.text = payload.payload.text;
          state.coordinates = payload.payload.coordinates;
          state.isActive = true;
    },
    hideMessage(state) {
      state.isActive = false;
    },
},
})

export default messageSlice.reducer;
export const {showMessage, hideMessage} = messageSlice.actions;
