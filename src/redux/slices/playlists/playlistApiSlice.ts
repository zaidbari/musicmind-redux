import { PLAYLIST_GROUP_URL } from '@/constants/urls'
import { api } from '@/redux/utils/customFetch'

export interface PlaylistProps {
	Photo: string
	container_group: number
	id: number
	music_therapist: number
	music_therapist_name: string
	playlist: number
	playlist_name: string
	position: number
	description: string
}

export const playlistsApiSlice = api.injectEndpoints({
	endpoints: (builder) => ({
		getPlaylists: builder.query<PlaylistProps[], number>({
			query: (playlist) => PLAYLIST_GROUP_URL + playlist
		})
	})
})

export const { useGetPlaylistsQuery } = playlistsApiSlice
