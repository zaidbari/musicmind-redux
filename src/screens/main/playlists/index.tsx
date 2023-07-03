import { ReactElement, useCallback, useEffect, useState } from 'react'

import { useTranslation } from 'react-i18next'
import { StyleSheet, Text, View } from 'react-native'
import { FlatGrid } from 'react-native-super-grid'

import { PHONE, SPACER } from '@/constants/misc'

import { BaseCard } from '@/components/cards/baseCard'
import { EmptyComponent } from '@/components/empty'
import { RefetchSearch } from '@/components/form/refetchSearch'
import { Loader } from '@/components/loader'
import { InfoModal, TInfoModal } from '@/components/modals/infoModal'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { selectDevice } from '@/redux/slices/layout/deviceSlice'
import { setItemCount, setLayoutWidth } from '@/redux/slices/layout/layoutSlice'
import { PlaylistProps, useGetPlaylistsQuery } from '@/redux/slices/playlists/playlistApiSlice'
import { ScreenProps } from '@/stacks/main'

type Props = ScreenProps<'playlist'>

const PlaylistsScreen = ({ route, navigation }: Props): ReactElement => {
	const { playlist, description } = route.params

	const [playlists, setPlaylists] = useState<PlaylistProps[]>([]!)
	const [search, setSearch] = useState<string>('')
	const [modal, setModal] = useState<TInfoModal>({
		visible: false,
		title: '',
		description: ''
	})

	const { data, isLoading, refetch, isFetching } = useGetPlaylistsQuery(playlist)
	const dispatch = useAppDispatch()
	const { t } = useTranslation()
	const { device } = useAppSelector(selectDevice)

	const renderItem = useCallback(
		({ item }: { item: PlaylistProps }) => (
			<BaseCard
				image={item.Photo}
				description={item.description}
				onPress={() =>
					navigation.navigate('tracks', {
						playlist: item
					})
				}
				setModal={setModal}
				name={item.playlist_name}
			/>
		),

		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	)

	const renderHeader = useCallback(
		() => (
			<View style={styles.headerContainer}>
				<Text style={styles.headerText}>{description}</Text>
			</View>
		),
		[description]
	)

	useEffect(() => {
		if (data) {
			setPlaylists(data.filter((playlist) => playlist.playlist_name.toLowerCase().includes(search.toLowerCase())))
		}
	}, [data, search])

	if (isLoading || isFetching) return <Loader />
	return (
		<View style={styles.container}>
			<InfoModal modal={modal} setModal={setModal} />
			<RefetchSearch
				placeholder={t('inputs.searchPreMadePlaylists') as string}
				setSearch={setSearch}
				refetch={refetch}
			/>
			<FlatGrid
				ListHeaderComponent={renderHeader}
				ListEmptyComponent={EmptyComponent}
				onLayout={({ nativeEvent }) => dispatch(setLayoutWidth(nativeEvent.layout.width))}
				onItemsPerRowChange={(count) => dispatch(setItemCount(count))}
				additionalRowStyle={{ padding: 0 }}
				itemDimension={device === PHONE ? 150 : 200}
				data={playlists}
				renderItem={renderItem}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	headerContainer: {
		marginRight: SPACER,
		marginBottom: SPACER
	},
	headerText: {
		fontSize: 18,
		fontStyle: 'italic',
		color: 'white'
	}
})

export default PlaylistsScreen
