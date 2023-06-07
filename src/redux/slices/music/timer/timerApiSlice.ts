import { TIMER_ACQUISITION_URL } from '@/constants/urls'

import { api } from '@/redux/utils/customFetch'

type TResponse = {
	timer_enabled_bool: boolean
	timer_value_integer: number
	id: number
	user: number
}

export const timerApiSlice = api.injectEndpoints({
	endpoints: (builder) => ({
		getTimerProperties: builder.query<[TResponse, {}], null>({
			query: () => TIMER_ACQUISITION_URL
		})
	})
})

export const { useGetTimerPropertiesQuery } = timerApiSlice
