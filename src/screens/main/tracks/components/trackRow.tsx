import { colors } from '@/constants/colors'
import { PHONE } from '@/constants/misc'
import { useAppSelector } from '@/redux/hooks'
import { selectDevice } from '@/redux/slices/layout/deviceSlice'
import { ITrack } from '@/redux/slices/tracks/tracksApiSlice'

import Ionicons from '@expo/vector-icons/Ionicons'
import { memo, ReactElement } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

const TrackRow = ({ track }: { track: ITrack }): ReactElement => {
	const { device } = useAppSelector(selectDevice)

	return (
		<View style={styles.container}>
			<Pressable onPress={() => {}}>
				<Ionicons name={'play-circle'} color={colors.secondary} size={40} />
			</Pressable>
			<View style={{ flex: 1 }}>
				<Text style={[styles.title, { color: 'white' }]} numberOfLines={2}>
					{track.title}
				</Text>
				<Text style={styles.subTitle} numberOfLines={2}>
					{track.artist}
				</Text>
				{device === PHONE && (
					<Text style={{ color: 'white', marginTop: 10 }} numberOfLines={2}>
						{track.album}
					</Text>
				)}
			</View>
			{device !== PHONE && (
				<View style={{ flex: 1 }}>
					<Text style={{ color: 'white' }} numberOfLines={2}>
						{track.album}
					</Text>
				</View>
			)}
			<Pressable onPress={() => {}} style={device !== PHONE && { flex: 1, alignItems: 'flex-end' }}>
				{({ pressed }) => (
					<Ionicons name="ios-ellipsis-vertical-circle-outline" size={34} color={pressed ? colors.accent : 'white'} />
				)}
			</Pressable>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		gap: 10,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	title: {
		fontSize: 16,
		marginBottom: 10,
		fontWeight: 'bold'
	},
	subTitle: {
		color: 'rgba(255,255,255,0.8)',
		fontStyle: 'italic',
		textDecorationLine: 'underline',
		textDecorationStyle: 'solid',
		textDecorationColor: colors.accent
	}
})

export default memo(TrackRow)
