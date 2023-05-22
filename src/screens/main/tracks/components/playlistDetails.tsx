import { IconButton } from '@/components/buttons/iconButton'
import { blurhash, colors } from '@/constants/colors'
import { PHONE } from '@/constants/misc'
import { FALLBACK } from '@/constants/misc'
import { useAppSelector } from '@/redux/hooks'
import { selectDevice } from '@/redux/slices/layout/deviceSlice'
import { PlaylistProps } from '@/redux/slices/playlists/playlistApiSlice'

import Ionicons from '@expo/vector-icons/Ionicons'
import { Image } from 'expo-image'
import { memo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native'

type TProps = {
	playlistDetails: PlaylistProps
	tracksLength: number
}
const PlaylistDetailCard = ({ playlistDetails, tracksLength }: TProps): JSX.Element => {
	const { t } = useTranslation()
	const { device } = useAppSelector(selectDevice)

	const [photo, setPhoto] = useState(playlistDetails.Photo ?? FALLBACK)

	return (
		<View style={StyleSheet.flatten([styles.container, device === PHONE && { flexDirection: 'column' }])}>
			<ImageBackground
				source={{ uri: photo }}
				onError={() => setPhoto(FALLBACK)}
				style={styles.backgroundImage}
				resizeMode="cover"
				blurRadius={10}
			>
				<Image
					style={styles.image}
					contentFit="fill"
					source={{ uri: photo }}
					transition={10}
					onError={() => setPhoto(FALLBACK)}
					placeholder={blurhash}
				/>
			</ImageBackground>

			<View style={{ flexGrow: 1, flex: 1 }}>
				<Text style={StyleSheet.flatten([styles.title, device === PHONE && { textAlign: 'center' }])}>
					{playlistDetails.playlist_name}
				</Text>
				<Text style={StyleSheet.flatten([styles.subTitle, device === PHONE && { textAlign: 'center' }])}>
					{tracksLength} {t('tracks')}
				</Text>

				<View style={StyleSheet.flatten([styles.buttonRow, device === PHONE && { flexDirection: 'column' }])}>
					<View style={styles.buttonRow}>
						<Pressable style={styles.button} onPress={() => {}}>
							<Ionicons name="ios-play" size={18} color={colors.primary} />
							<Text style={styles.buttonText}>{t('buttons.play')}</Text>
						</Pressable>
						<Pressable style={styles.button}>
							<Ionicons name="ios-copy" size={15} color={colors.primary} />
							<Text style={styles.buttonText}>{t('buttons.copy')}</Text>
						</Pressable>
						<IconButton icon={'ios-shuffle'} />
						<IconButton icon={'ios-repeat'} />
					</View>
				</View>
			</View>
		</View>
	)
}

export default memo(PlaylistDetailCard)

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		flexDirection: 'row',
		gap: 10,
		padding: 20,
		backgroundColor: colors.secondary,
		borderRadius: 20,
		marginBottom: 30
	},
	backgroundImage: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 150,
		width: 150,
		borderRadius: 20,
		overflow: 'hidden'
	},
	image: {
		width: 110,
		height: 110,
		borderRadius: 110,
		borderWidth: 2,
		borderColor: colors.accent,
		borderStyle: 'solid',
		overflow: 'hidden'
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		color: 'white'
	},
	subTitle: {
		fontSize: 16,
		fontStyle: 'italic',
		color: 'white'
	},
	buttonRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 3,
		marginTop: 10
	},
	button: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: 10,
		paddingHorizontal: 10,
		paddingVertical: 3,
		borderRadius: 5,
		gap: 5,
		backgroundColor: colors.accent
	},
	buttonText: {
		fontSize: 12,
		color: colors.primary,
		fontWeight: 'bold'
	}
})
