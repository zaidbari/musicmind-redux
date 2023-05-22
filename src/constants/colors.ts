import { DarkTheme } from '@react-navigation/native'

export const blurhash =
	'|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj['

export const colors = {
	primary: '#151a28',
	secondary: '#1E273D',
	accent: '#ff6e00',
	placeholder: '#999999',
	transparentPrimary: 'rgba(21,26,40,0.8)'
}

export const DEFAULT_THEME = {
	...DarkTheme,
	colors: {
		...DarkTheme,
		background: colors.primary,
		primary: '#ffffff',
		text: '#ffffff',
		card: colors.primary,
		border: colors.primary
	}
}
