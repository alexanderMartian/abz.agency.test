import {configureStore} from '@reduxjs/toolkit';
import userReducer from './reducers/userReducer';
import messageReducer from "./reducers/messageReducer";

export default configureStore({
  reducer: {
    user: userReducer,
    message: messageReducer,
  },
});
