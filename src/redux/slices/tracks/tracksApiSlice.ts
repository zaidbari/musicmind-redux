import { PLAYLIST_TRACKS_URL } from '@/constants/urls'

import { api } from '@/redux/utils/customFetch'

export interface IRealTrack {
	id: number
	soundsource_id: number
	album: number
	album_name: string
	album_photo: string
	artist: number
	artist_name: string
	song_title: string
	track_file: string
}

export interface IRealTrackObject {
	id: number
	position: number
	playlist: number
	track: IRealTrack
}

export interface ITrack {
	id: number
	playlist: number
	track_id: number
	position: number
	soundsource_id: number
	album_id: number
	artist_id: number
	artist: string
	title: string
	url: string
	album: string
	artwork: string
}

export const tracksApiSlice = api.injectEndpoints({
	endpoints: (builder) => ({
		getPlaylistTracks: builder.query<ITrack[], number>({
			query: (playlist_id) => PLAYLIST_TRACKS_URL + playlist_id,

			// Transforimg response to accomodate react-native-track-player
			transformResponse: (response: IRealTrackObject[]) => {
				return response.map((value) => ({
					id: value.id,
					position: value.position,
					playlist: value.playlist,
					track_id: value.track.id,
					soundsource_id: value.track.soundsource_id,
					album_id: value.track.album,
					album: value.track.album_name,
					artist: value.track.artist_name,
					artist_id: value.track.artist,
					title: value.track.song_title,
					url: value.track.track_file,
					artwork: value.track.album_photo
				}))
			}
		})
	})
})

export const { useGetPlaylistTracksQuery } = tracksApiSlice
