import { GET_MUSIC_THERAPIST } from '@/constants/urls'

import { api } from '@/redux/utils/customFetch'

export interface TherapistProps {
	Photo: string
	id: number
	name: string
	description: string
}

export const therapistApiSlice = api.injectEndpoints({
	endpoints: (builder) => ({
		getTherapist: builder.query<TherapistProps, number>({
			query: (therapist) => GET_MUSIC_THERAPIST + therapist,
			transformResponse: (response: TherapistProps[]) => response[0]
		})
	})
})

export const { useGetTherapistQuery } = therapistApiSlice
