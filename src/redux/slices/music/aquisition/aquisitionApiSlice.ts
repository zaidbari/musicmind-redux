import { MEDIAPLAYER_ACQUISITION_URL } from '@/constants/urls'

import { api } from '@/redux/utils/customFetch'

type TResponse = {
	repeat_enabled_bool: boolean
	shuffle_enabled_bool: boolean
	id: number
	user: number
}

export const aquisitionApiSlice = api.injectEndpoints({
	endpoints: (builder) => ({
		getPlayerAquisition: builder.query<[TResponse, {}], null>({
			query: () => MEDIAPLAYER_ACQUISITION_URL
		})
	})
})

export const { useGetPlayerAquisitionQuery } = aquisitionApiSlice
