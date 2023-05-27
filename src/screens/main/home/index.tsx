import { BaseCard } from '@/components/cards/baseCard'
import { EmptyComponent } from '@/components/empty'
import { RefetchSearch } from '@/components/form/refetchSearch'
import { Loader } from '@/components/loader'
import { InfoModal, TInfoModal } from '@/components/modals/infoModal'
import { PHONE } from '@/constants/misc'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { MainContainerProps, useGetMainContainersQuery } from '@/redux/slices/containers/containersApiSlice'
import { selectDevice } from '@/redux/slices/layout/deviceSlice'
import { setItemCount, setLayoutWidth } from '@/redux/slices/layout/layoutSlice'
import { ScreenProps } from '@/stacks/main'
import { ReactElement, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyleSheet, View } from 'react-native'
import { FlatGrid } from 'react-native-super-grid'

type Props = ScreenProps<'home'>

const HomeScreen = ({ navigation }: Props): ReactElement => {
	const [containers, setContainers] = useState<MainContainerProps[]>([] as MainContainerProps[])
	const [search, setSearch] = useState<string>('')
	const [modal, setModal] = useState<TInfoModal>({
		visible: false,
		title: '',
		description: ''
	})

	const { data, isLoading, refetch, isFetching } = useGetMainContainersQuery(null)
	const { device } = useAppSelector(selectDevice)
	const { t } = useTranslation()
	const dispatch = useAppDispatch()

	const renderItem = useCallback(
		({ item }: { item: MainContainerProps }) => (
			<BaseCard
				name={item.name}
				description={item.description}
				image={item.Photo}
				onPress={() => navigation.navigate('playlist', { playlist: item.id, description: item.description })}
				setModal={setModal}
			/>
		),

		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	)

	useEffect(() => {
		if (data) {
			setContainers(data.filter((container) => container.name.toLowerCase().includes(search.toLowerCase())))
		}
	}, [data, search])

	if (isLoading || isFetching) return <Loader />
	return (
		<View style={styles.container}>
			<InfoModal modal={modal} setModal={setModal} />
			<RefetchSearch placeholder={t('inputs.searchPlaylists')} setSearch={setSearch} refetch={refetch} />
			<FlatGrid
				ListEmptyComponent={EmptyComponent}
				onLayout={({ nativeEvent }) => dispatch(setLayoutWidth(nativeEvent.layout.width))}
				onItemsPerRowChange={(count) => dispatch(setItemCount(count))}
				additionalRowStyle={{ padding: 0 }}
				itemDimension={device === PHONE ? 150 : 200}
				data={containers as MainContainerProps[]}
				renderItem={renderItem}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
})

export default HomeScreen
