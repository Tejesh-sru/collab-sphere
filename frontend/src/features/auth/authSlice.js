import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  accessToken: null,
  status: 'idle', // 'idle' | 'authenticating' | 'authenticated' | 'unauthenticated'
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.status = 'authenticated';
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
      state.status = 'authenticated';
    },
    clearAuth: (state) => {
      state.user = null;
      state.accessToken = null;
      state.status = 'unauthenticated';
    },
  },
});

export const { setCredentials, setAccessToken, clearAuth } = authSlice.actions;
export default authSlice.reducer;
