import AsyncStorage from '@react-native-async-storage/async-storage'
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, retry } from '@reduxjs/toolkit/query'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'

import { BASE_API_URL, REFRESH_URL } from '@/constants/urls'

import { RootState } from '../store'

import { logoutUser, setTokens } from '@/redux/slices/auth/authSlice'

// Create a new mutex
const mutex = new Mutex()

const baseQuery = fetchBaseQuery({
	baseUrl: BASE_API_URL,
	mode: 'cors',
	prepareHeaders: (headers, { getState }) => {
		headers.set('Content-Type', 'application/json')
		const token = (getState() as RootState).auth.tokens
		if (token) {
			headers.set('authorization', `JWT ${token.access}`)
		}
		return headers
	}
})

const customFetch: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
	// wait until the mutex is available without locking it
	await mutex.waitForUnlock()
	let result = await baseQuery(args, api, extraOptions)

	if (result.error?.status === 401 && (result.error?.data as any).code === 'token_not_valid') {
		if (!mutex.isLocked()) {
			const release = await mutex.acquire()
			const refresh = await AsyncStorage.getItem('@refresh')

			try {
				const refreshResult: any = await baseQuery(
					{
						url: REFRESH_URL,
						method: 'POST',
						body: { refresh }
					},
					api,
					extraOptions
				)

				if (refreshResult.data) {
					// Retry the initial query
					api.dispatch(
						setTokens({
							access: refreshResult.data.access,
							refresh: refreshResult.data.refresh
						})
					)
					result = await baseQuery(args, api, extraOptions)
				} else {
					api.dispatch(logoutUser())
				}
			} finally {
				// release must be called once the mutex should be released again.
				release()
			}
		} else {
			// wait until the mutex is available without locking it
			await mutex.waitForUnlock()
			result = await baseQuery(args, api, extraOptions)
		}
	}

	return result
}

export const api = createApi({
	baseQuery: retry(customFetch, { maxRetries: 2 }),
	endpoints: () => ({})
})
