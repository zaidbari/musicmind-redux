import { MAIN_CONTAINER_URL } from '@/constants/urls'
import { api } from '@/redux/utils/customFetch'

export interface MainContainerProps {
	id: number
	Photo: string
	description: string
	name: string
	position: number
	department: number
}

export const mainContainersApiSlice = api.injectEndpoints({
	endpoints: (builder) => ({
		getMainContainers: builder.query<MainContainerProps[], null>({
			query: () => MAIN_CONTAINER_URL
		})
	})
})

export const { useGetMainContainersQuery } = mainContainersApiSlice
