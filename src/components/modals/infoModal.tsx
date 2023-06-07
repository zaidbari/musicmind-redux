import { Dispatch, ReactElement, SetStateAction } from 'react'

import { useTranslation } from 'react-i18next'
import { Modal, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native'

import { SPACER } from '@/constants/misc'

import { modalStyles as styles } from './modalStyles'

export type TInfoModal = {
	title: string
	visible: boolean
	description: string
}
export type TSetInfoModal = Dispatch<SetStateAction<TInfoModal>>

interface InfoModalProps {
	setModal: TSetInfoModal
	modal: TInfoModal
}

export const InfoModal = ({ setModal, modal }: InfoModalProps): ReactElement => {
	const { width, height } = useWindowDimensions()
	const { t } = useTranslation()

	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={modal.visible}
			onRequestClose={() => {
				setModal({
					title: '',
					description: '',
					visible: false
				})
			}}
		>
			<View style={styles.centeredView}>
				<View style={StyleSheet.flatten([styles.modalView, { width: width - SPACER, maxHeight: height - 40 }])}>
					<Text style={styles.modalTextTitle}>{modal.title}</Text>
					<ScrollView>
						<Text style={styles.modalTextDescription}>{modal.description}</Text>
					</ScrollView>
					<Pressable
						style={[styles.button, styles.button]}
						onPress={() => {
							setModal({
								title: '',
								description: '',
								visible: false
							})
						}}
					>
						<Text style={styles.buttonText}>{t('buttons.close')}</Text>
					</Pressable>
				</View>
			</View>
		</Modal>
	)
}
