import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import axiosInstance from '../../services/axiosInterceptor';

/**
 * We use `fakeBaseQuery` + manual axios calls inside each endpoint
 * (rather than RTK Query's built-in fetchBaseQuery) so we can reuse the
 * single Axios instance that already has the token-attach + silent-
 * refresh interceptors wired up, instead of duplicating that logic.
 */
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    signup: builder.mutation({
      async queryFn(body) {
        try {
          const { data } = await axiosInstance.post('/auth/signup', body);
          return { data };
        } catch (err) {
          return { error: err.response?.data || err.message };
        }
      },
    }),
    login: builder.mutation({
      async queryFn(body) {
        try {
          const { data } = await axiosInstance.post('/auth/login', body);
          return { data };
        } catch (err) {
          return { error: err.response?.data || err.message };
        }
      },
    }),
    getMe: builder.query({
      async queryFn() {
        try {
          const { data } = await axiosInstance.get('/auth/me');
          return { data };
        } catch (err) {
          return { error: err.response?.data || err.message };
        }
      },
    }),
    logout: builder.mutation({
      async queryFn() {
        try {
          const { data } = await axiosInstance.post('/auth/logout');
          return { data };
        } catch (err) {
          return { error: err.response?.data || err.message };
        }
      },
    }),
  }),
});

export const {
  useSignupMutation,
  useLoginMutation,
  useGetMeQuery,
  useLogoutMutation,
} = authApi;
