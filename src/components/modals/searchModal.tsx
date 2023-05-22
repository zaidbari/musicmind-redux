import { colors } from '@/constants/colors'
import { SPACER } from '@/constants/misc'
import { Dispatch, ReactElement, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { Modal, StyleSheet, useWindowDimensions, View } from 'react-native'
import { IconButton } from '../buttons/iconButton'
import Input from '../form/input'

import { modalStyles as styles } from './modalStyles'

export type TSetSearchModal = Dispatch<SetStateAction<boolean>>
interface SearchModalProps {
	setModal: TSetSearchModal
	modal: boolean
}

export const SearchModal = ({ setModal, modal }: SearchModalProps): ReactElement => {
	const { width, height } = useWindowDimensions()
	const { t } = useTranslation()
	const _handleSearch = () => {
		setModal(false)
	}
	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={modal}
			onRequestClose={() => {
				setModal(false)
			}}
		>
			<View style={styles.centeredView}>
				<View
					style={StyleSheet.flatten([
						styles.modalView,
						customStyles.container,
						{ width: width - SPACER, maxHeight: height - 40 }
					])}
				>
					<Input autoFocus placeholder={t('inputs.search') as string} style={customStyles.input} />

					<IconButton
						onPress={_handleSearch}
						icon={'ios-search'}
						size={23}
						style={{ backgroundColor: colors.accent }}
					/>
					<IconButton
						onPress={() => setModal(false)}
						icon={'ios-close'}
						size={25}
						style={{ backgroundColor: colors.primary }}
					/>
				</View>
			</View>
		</Modal>
	)
}
const customStyles = StyleSheet.create({
	button: {
		paddingVertical: 8,
		backgroundColor: colors.accent,
		borderRadius: 5,
		paddingHorizontal: 10,
		flexDirection: 'row',
		borderWidth: 2,
		borderColor: colors.accent,
		justifyContent: 'center'
	},
	text: {
		color: colors.primary,
		fontSize: 16,
		textAlign: 'center',
		fontWeight: 'bold'
	},
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-evenly',
		gap: 5
	},
	input: {
		flexGrow: 2,
		backgroundColor: colors.primary,
		marginBottom: 0
	}
})
