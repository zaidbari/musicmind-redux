import { LOGIN_URL, USERNAME_URL, USERTYPE_URL } from '@/constants/urls'
import { api } from '@/redux/utils/customFetch'
import { ICredentials, ITokens } from './types'

export const authApiSlice = api.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation<ITokens, ICredentials>({
			query: (credentials) => ({
				url: LOGIN_URL,
				method: 'POST',
				body: credentials
			})
		}),
		getUserName: builder.query<{ username: string; user_id: number }, null>({
			query: () => USERNAME_URL
		}),
		getUserType: builder.query<{ usertype: number }, null>({
			query: () => USERTYPE_URL
		})
	})
})

export const { useLoginMutation, useGetUserTypeQuery, useGetUserNameQuery } = authApiSlice
