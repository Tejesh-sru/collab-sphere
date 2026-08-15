import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import { authApi } from '../features/auth/authApi';

/**
 * Single Redux store for the whole app. Feature slices (authSlice, ...)
 * hold plain client state (current user, UI flags). RTK Query api
 * slices (authApi, ...) own server-state caching, so we don't hand-roll
 * loading/error booleans per request.
 *
 * As each feature is built, add its slice + its RTK Query api reducer
 * + middleware here, following the `authApi` pattern below.
 */
export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    // profile: profileReducer, [profileApi.reducerPath]: profileApi.reducer,
    // feed: feedReducer, [feedApi.reducerPath]: feedApi.reducer,
    // ...one pair per feature as it's built
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});
