import { Loader } from '@/components/loader'
import { colors } from '@/constants/colors'
import { ITrack, useGetPlaylistTracksQuery } from '@/redux/slices/tracks/tracksApiSlice'
import { MainStackParamList } from '@/stacks/main'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { ReactElement, useCallback, useState } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import TrackRow from './components/trackRow'
import PlaylistDetailCard from './components/playlistDetails'
import { SPACER } from '@/constants/misc'
import { useGetTherapistQuery } from '@/redux/slices/therapist/therapistApiSlice'

type Props = NativeStackScreenProps<MainStackParamList, 'tracks'>

const TrackScreen = ({ route }: Props): ReactElement => {
	const { playlist } = route.params

	const { data, isLoading, refetch, isFetching } = useGetPlaylistTracksQuery(playlist.playlist)
	const { data: therapist } = useGetTherapistQuery(playlist.music_therapist)

	const [listRef, setRef] = useState<FlatList<ITrack> | null>(null)

	const renderSeparator = useCallback(() => <View style={styles.separator} />, [])
	const renderTrackRow = useCallback(({ item }: { item: ITrack }) => <TrackRow track={item} />, [])
	const renderHeader = useCallback(
		() => (
			<PlaylistDetailCard playlistDetails={playlist} therapist={therapist || null} tracksLength={data?.length || 0} />
		),
		[playlist, data, therapist]
	)
	if (isLoading || isFetching) return <Loader />
	return (
		<View style={styles.container}>
			<FlatList
				onScrollToIndexFailed={() => {}}
				ref={(ref) => setRef(ref)}
				contentContainerStyle={{ paddingBottom: 30 }}
				ListHeaderComponent={renderHeader}
				data={data}
				initialNumToRender={20}
				keyExtractor={(item) => String(item.id)}
				renderItem={renderTrackRow}
				ItemSeparatorComponent={renderSeparator}
			/>
		</View>
	)
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginRight: SPACER
	},
	separator: {
		height: 1,
		marginVertical: 15,
		backgroundColor: colors.secondary
	}
})
export default TrackScreen
