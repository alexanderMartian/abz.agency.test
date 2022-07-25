import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const initialState = {
  isActive: false,
  type: '',
  text: '',
};

const hideMessage = createAsyncThunk('message/hide', () => true);

export const showMessage = createAsyncThunk(
  'message/show',
  ({text, type = 'success', timeout = 5000}, {dispatch}) => {
    setTimeout(() => dispatch(hideMessage()), timeout);
    return {text, type};
  },
);

const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {},
  extraReducers: {
    [showMessage.fulfilled]: (state, {payload: {text, type}}) => {
      state.text = text;
      state.type = type;
      state.isActive = true;
    },
    [hideMessage.fulfilled]: (state) => {
      state.isActive = false;
    },
  },
});

export default messageSlice.reducer;
