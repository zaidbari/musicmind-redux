import { colors } from '@/constants/colors'
import { SPACER } from '@/constants/misc'
import { StyleSheet } from 'react-native'

export const modalStyles = StyleSheet.create({
	centeredView: {
		backgroundColor: colors.transparentPrimary,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: SPACER
	},
	modalView: {
		backgroundColor: colors.secondary,
		borderRadius: 10,
		padding: 20,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5
	},
	backgroundImage: {
		justifyContent: 'center',
		alignItems: 'center',
		height: 150,
		width: 150,
		borderRadius: 20,
		marginBottom: 10,
		overflow: 'hidden'
	},
	image: {
		width: 110,
		height: 110,
		borderRadius: 110,
		borderWidth: 2,
		borderColor: colors.accent,
		borderStyle: 'solid',
		overflow: 'hidden'
	},

	button: {
		width: 100,
		paddingHorizontal: 20,
		paddingVertical: 4,
		borderRadius: 2,
		borderWidth: 2,
		borderColor: colors.accent,
		backgroundColor: colors.accent,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	buttonText: {
		fontSize: 12,
		fontWeight: 'bold',
		color: colors.primary,
		textAlign: 'center'
	},
	textStyle: {
		color: 'white',
		fontWeight: 'bold',
		textAlign: 'center'
	},
	modalTextTitle: {
		marginBottom: 15,
		textAlign: 'center',
		color: colors.accent,
		fontSize: 18,
		fontWeight: 'bold'
	},
	modalTextDescription: {
		color: 'white',
		marginBottom: 15,
		textAlign: 'center'
	}
})
