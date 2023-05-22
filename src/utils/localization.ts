import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
	resources: {
		en: {
			translation: {
				buttons: {
					signin: 'Sign In',
					reset: 'Reset',
					reload: 'Reload',
					close: 'Close',
					cancel: 'Cancel',
					delete: 'Delete',
					play: 'Play',
					copy: 'Copy',
					addToPlaylist: 'Add to playlist',
					addToQueue: 'Add to queue',
					guidedTour: 'Guided tour',
					backToHome: 'Go back to home',
					confirmPlaylistDelete: 'Are you sure you want to delete this playlist?'
				},
				notifications: {
					authFliedsRequired: 'Email and password are required!',
					success: 'Success!',
					error: 'Error!',
					empty: 'No items found!',
					addedToQueue: 'Tracks added to queue successfully!',
					alreadyInQueue: 'Track already in queue!',
					trackAddedToPlaylist: 'Track added to playlist successfully!',
					trackAlreadyInPlaylist: 'Track is already in playlist!',
					'No active account found with the given credentials!': 'No active account found with the given credentials!'
				},
				headings: {
					categories: 'Categories',
					tracks: 'Tracks',
					actions: 'Actions',
					home: 'Home',
					internalContainers: 'Internal Containers',
					myPlaylists: 'My playlists',
					createPlaylist: 'Create playlist',
					playlist: 'Playlist',
					playlistTracks: 'Playlist tracks',
					newsfeed: 'News Feed',
					internalPlaylist: 'Internal playlists',
					assignedPlaylists: 'Assigned playlists',
					artist: 'Artist'
				},
				inputs: {
					username: 'Username',
					password: 'Password',
					search: 'Search',
					searchPlaylists: 'Search playlists',
					searchPreMadePlaylists: 'Search pre-made playlists',
					setTimer: 'Set timer',
					invalidMinutes: 'Please input valid number of minutes'
				}
			}
		},
		// danish
		da: {
			translation: {
				buttons: {
					signin: 'Log ind',
					reset: 'Nulstil',
					reload: 'Genindlæs',
					close: 'Luk',
					cancel: 'Annuller',
					delete: 'Slet',
					play: 'Afspil',
					copy: 'Kopier',
					addToPlaylist: 'Tilføj til afspilningsliste',
					addToQueue: 'Tilføj til kø',
					guidedTour: 'Guidet rundvisning',
					backToHome: 'Gå tilbage til hjem',
					confirmPlaylistDelete: 'Er du sikker på, at du vil slette denne afspilningsliste?'
				},
				notifications: {
					authFliedsRequired: 'E-mail og adgangskode er påkrævet!',
					success: 'Succes!',
					error: 'Fejl!',
					empty: 'Ingen elementer fundet!',
					addedToQueue: 'Spor tilføjet til køen!',
					alreadyInQueue: 'Spor allerede i køen!',
					trackAddedToPlaylist: 'Spor tilføjet til afspilningsliste!',
					trackAlreadyInPlaylist: 'Spor er allerede i afspilningslisten!',
					'No active account found with the given credentials!':
						'Ingen aktiv konto fundet med de angivne legitimationsoplysninger!'
				},
				headings: {
					categories: 'Kategorier',
					tracks: 'Numre',
					actions: 'Handlinger',
					home: 'Hjem',
					internalContainers: 'Internt Miljø',
					myPlaylists: 'Mine spillelister',
					createPlaylist: 'Opret Spillelister',
					playlist: 'Spillelister',
					playlistTracks: 'Spillelister numre',
					newsfeed: 'Nyhedsstrøm',
					internalPlaylist: 'Interne spillelister',
					assignedPlaylists: 'Tildelte spillelister',
					artist: 'Lavet af'
				},
				inputs: {
					username: 'Brugernavn',
					password: 'Adgangskode',
					search: 'Søg',
					searchPlaylists: 'Søg spillelister',
					searchPreMadePlaylists: 'Søg præoprettet spillelister',
					setTimer: 'Indstil timer',
					invalidMinutes: 'Venligst indtast et gyldigt antal minutter'
				}
			}
		}
	},
	fallbackLng: 'da',
	interpolation: {
		escapeValue: false
	},
	react: { useSuspense: false }
})

export default i18n
