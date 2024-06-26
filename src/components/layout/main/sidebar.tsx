import { memo, ReactElement } from 'react'

import Ionicons from '@expo/vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import { Image } from 'expo-image'
import { useTranslation } from 'react-i18next'
import { Pressable, PressableProps, StyleSheet, Text, useWindowDimensions, View } from 'react-native'

import { blurhash, colors } from '@/constants/colors'
import { PHONE, SPACER } from '@/constants/misc'

import { IconButton } from '@/components/buttons/iconButton'
import { TrackControls } from '@/components/music/main/trackControls'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { selectDevice } from '@/redux/slices/layout/deviceSlice'
import { selectSidebar, setIsSidebarOpen } from '@/redux/slices/layout/sidebarSlice'

type SidebarLinkProps = PressableProps & {
	icon: keyof typeof Ionicons.glyphMap
	text: string
}

const SidebarLink = ({ icon, text, ...props }: SidebarLinkProps): ReactElement => {
	return (
		<Pressable style={styles.iconButton} {...props}>
			{({ pressed }) => (
				<View style={styles.textContainer}>
					<Ionicons name={icon} size={25} color={pressed ? colors.accent : 'white'} />
					<Text style={StyleSheet.flatten([{ color: pressed ? colors.accent : 'white' }, styles.linkText])}>
						{text}
					</Text>
				</View>
			)}
		</Pressable>
	)
}

const Sidebar = (): ReactElement | null => {
	const { device } = useAppSelector(selectDevice)
	const { isSidebarOpen } = useAppSelector(selectSidebar)

	const dispatch = useAppDispatch()

	const { navigate } = useNavigation()
	const { t } = useTranslation()
	const { width, height } = useWindowDimensions()

	const _handleLinkPress = (screen: string) => {
		if (device === PHONE) dispatch(setIsSidebarOpen(false))
		navigate(screen as never)
	}

	if (!isSidebarOpen) return null
	return (
		<View
			style={StyleSheet.flatten([
				styles.container,
				device === PHONE && isSidebarOpen && { width, height, zIndex: 10, position: 'absolute', left: 0 }
			])}
		>
			<View>
				<View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
					<Image
						style={styles.image}
						source={require('../../../../assets/music_mind_logo.svg')}
						placeholder={blurhash}
						contentFit="contain"
						transition={0}
					/>
					{device === PHONE && <IconButton icon={'close-sharp'} onPress={() => dispatch(setIsSidebarOpen(false))} />}
				</View>
				<SidebarLink onPress={() => _handleLinkPress('home')} icon="ios-home-outline" text={t('headings.home')} />
				<SidebarLink icon="ios-folder-open-outline" text={t('headings.internalContainers')} />
				<SidebarLink icon="ios-albums-outline" text={t('headings.myPlaylists')} />
				<SidebarLink icon="ios-add-circle-outline" text={t('headings.createPlaylist')} />
				<SidebarLink icon="ios-radio-outline" text={'Play Radio'} />
			</View>
			{device !== PHONE && <TrackControls />}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: colors.primary,
		padding: SPACER,
		width: 250,
		justifyContent: 'space-between'
	},
	image: {
		width: 170,
		height: 70,
		marginBottom: 20
	},
	iconButton: {
		marginBottom: 12
	},
	textContainer: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	linkText: {
		marginLeft: 10,
		fontSize: 16
	}
})

export default memo(Sidebar)
