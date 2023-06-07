import { Dispatch, ReactElement, SetStateAction, useState } from 'react'

import { Image } from 'expo-image'
import { useTranslation } from 'react-i18next'
import {
	ImageBackground,
	Modal,
	Pressable,
	ScrollView,
	StyleSheet,
	Text,
	useWindowDimensions,
	View
} from 'react-native'

import { blurhash } from '@/constants/colors'
import { FALLBACK, SPACER } from '@/constants/misc'

import { modalStyles as styles } from './modalStyles'

import { TherapistProps } from '@/redux/slices/therapist/therapistApiSlice'

export type TSetTherapistModal = Dispatch<SetStateAction<boolean>>
interface TherapistModalProps {
	setModal: TSetTherapistModal
	modal: boolean
	therapist: TherapistProps
}

export const TherapistModal = ({ setModal, modal, therapist }: TherapistModalProps): ReactElement => {
	const { width, height } = useWindowDimensions()
	const { t } = useTranslation()
	const [photo, setPhoto] = useState<string>(therapist.Photo ?? FALLBACK)

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
				<View style={StyleSheet.flatten([styles.modalView, { width: width - SPACER, maxHeight: height - 40 }])}>
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
					<Text style={styles.modalTextTitle}>{therapist.name}</Text>
					<ScrollView>
						<Text style={styles.modalTextDescription}>{therapist.description}</Text>
					</ScrollView>
					<Pressable
						style={[styles.button, styles.button]}
						onPress={() => {
							setModal(false)
						}}
					>
						<Text style={styles.buttonText}>{t('buttons.close')}</Text>
					</Pressable>
				</View>
			</View>
		</Modal>
	)
}
