import { TSetInfoModal } from '@/components/modals/infoModal'
import { blurhash, colors } from '@/constants/colors'
import { SPACER } from '@/constants/misc'
import { useAppSelector } from '@/redux/hooks'
import { selectLayout } from '@/redux/slices/layout/layoutSlice'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Image } from 'expo-image'
import { GestureResponderEvent, Pressable, StyleSheet, Text, View } from 'react-native'

type BaseCardProps = {
	name: string
	image: string
	description: string
	setModal: TSetInfoModal
	onPress: (event: GestureResponderEvent) => void
}

export const BaseCard = ({ name, image, description, setModal, onPress }: BaseCardProps) => {
	const { itemWidth } = useAppSelector(selectLayout)

	return (
		<View style={{ flex: 1, minHeight: itemWidth, position: 'relative' }}>
			<Pressable onPress={onPress} style={styles.card}>
				<Image
					style={StyleSheet.flatten([styles.image, { minHeight: itemWidth, maxHeight: itemWidth }])}
					contentFit={'fill'}
					source={image}
					placeholder={blurhash}
					transition={10}
				/>
				<View style={styles.cardContent}>
					<Text style={styles.cardText}>{name}</Text>
				</View>
			</Pressable>
			<Pressable
				style={styles.infoButton}
				onPress={() =>
					setModal({
						visible: true,
						title: name,
						description
					})
				}
			>
				<Ionicons name="information-circle" size={16} color="white" />
			</Pressable>
		</View>
	)
}

const styles = StyleSheet.create({
	image: {
		flex: 1,
		borderRadius: 10,
		width: '100%'
	},
	card: {
		borderRadius: 10,
		backgroundColor: colors.secondary,
		marginBottom: 10,
		flex: 1
	},
	cardContent: {
		paddingHorizontal: SPACER,
		marginVertical: 20,
		width: '100%'
	},
	cardText: {
		color: 'white',
		textAlign: 'center'
	},
	infoButton: {
		position: 'absolute',
		top: 0,
		right: 0,
		backgroundColor: colors.primary,
		padding: 10,
		borderBottomLeftRadius: 10
	}
})
