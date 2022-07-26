import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  isSuccessfullyRegistration: false,
};


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    switchState(state) {
      state.isSuccessfullyRegistration = !state.isSuccessfullyRegistration;
    },
  },
});

export const {switchState} = userSlice.actions;
export default userSlice.reducer;

