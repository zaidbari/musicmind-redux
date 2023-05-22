import { IconButton } from '@/components/buttons/iconButton'
import { SearchModal } from '@/components/modals/searchModal'
import { PHONE, SPACER } from '@/constants/misc'
import { useTranslationHandler } from '@/hooks/useTranslationHandler'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { logoutUser } from '@/redux/slices/auth/authSlice'
import { selectDevice } from '@/redux/slices/layout/deviceSlice'
import { selectSidebar, setIsSidebarOpen } from '@/redux/slices/layout/sidebarSlice'
import { useNavigation } from '@react-navigation/native'
import { ReactElement, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

type HTProps = {
	children: string
}

type HLProps = {
	canGoBack: boolean
}

export const HeaderRight = (): ReactElement => {
	const [modal, setModal] = useState<boolean>(false)
	const { _handleLanguageChange } = useTranslationHandler()
	const dispatch = useAppDispatch()

	return (
		<View style={{ flexDirection: 'row', gap: 10, paddingRight: SPACER }}>
			<IconButton icon="language-outline" onPress={_handleLanguageChange} />
			<IconButton icon="cog-outline" onPress={() => {}} />
			<IconButton icon="search-outline" onPress={() => setModal(true)} />
			<IconButton icon="notifications-outline" onPress={() => {}} />
			<IconButton icon="log-out-outline" onPress={() => dispatch(logoutUser())} />
			<SearchModal modal={modal} setModal={setModal} />
		</View>
	)
}

export const HeaderLeft = ({ canGoBack }: HLProps): ReactElement => {
	const { isSidebarOpen } = useAppSelector(selectSidebar)
	const dispatch = useAppDispatch()
	const { goBack } = useNavigation()

	const _handleSidebar = () => {
		dispatch(setIsSidebarOpen(!isSidebarOpen))
	}

	return (
		<View style={styles.headerLeftContainer}>
			<IconButton onPress={_handleSidebar} style={styles.headerLeftIcon} icon={'menu-outline'} />
			{canGoBack && <IconButton style={styles.headerLeftIcon} icon={'arrow-back'} onPress={() => goBack()} />}
		</View>
	)
}

export const HeaderTitle = ({ children }: HTProps): ReactElement => {
	const { device } = useAppSelector(selectDevice)
	return device !== PHONE ? <Text style={styles.headerTitleText}>{children.toUpperCase()}</Text> : <View />
}

const styles = StyleSheet.create({
	headerLeftContainer: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	headerLeftIcon: {
		marginLeft: SPACER
	},
	headerRightIcon: {
		marginRight: SPACER
	},
	headerTitleText: {
		color: 'white',
		fontSize: 16,
		fontWeight: 'bold'
	}
})