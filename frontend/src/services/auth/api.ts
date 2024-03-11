import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Credentials, TokenObtainResponse, User } from './types'
import { RootState } from '../../app/store'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/auth',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (build) => ({
    login: build.mutation<TokenObtainResponse, Credentials>({
      query: (credentials) => ({
        url: '/token/obtain',
        method: 'POST',
        body: credentials,
      }),
    }),
    logout: build.mutation<void, void>({
      query: () => ({
        url: '/token/blacklist',
        method: 'POST',
        body: { token: localStorage.getItem('refresh') },
      }),
    }),
    verifyToken: build.query<{ user: User }, void>({
      query: () => ({
        url: '/token/verify',
        method: 'POST',
        body: { token: localStorage.getItem('access') },
      }),
    }),
    refreshToken: build.query<{ access: string }, void>({
      query: () => ({
        url: '/token/refresh',
        method: 'POST',
        body: { refresh: localStorage.getItem('refresh') },
      }),
    }),
    testAuthenticated: build.query<{ message: string }, void>({
      query: () => '/test-authenticated',
    }),
  }),
})

export const {
  useLoginMutation,
  useLogoutMutation,
  useVerifyTokenQuery,
  useRefreshTokenQuery,
  useTestAuthenticatedQuery,
} = authApi
