import { ReactElement } from 'react'

import Ionicons from '@expo/vector-icons/Ionicons'
import { Pressable, PressableProps, StyleSheet, Text, View, ViewStyle } from 'react-native'

import { colors } from '@/constants/colors'

type IconButtonProps = PressableProps & {
	icon: keyof typeof Ionicons.glyphMap
	text?: string
	style?: ViewStyle
	size?: number
}

export const IconButton = ({ icon, style, size, text, ...props }: IconButtonProps): ReactElement => {
	return (
		<Pressable style={StyleSheet.flatten([styles.iconButton, style && style])} {...props}>
			{({ pressed }) => (
				<View style={styles.textContainer}>
					<Ionicons name={icon} size={size || 20} color={pressed ? colors.accent : 'white'} />
					{text && <Text style={{ color: pressed ? colors.accent : 'white', marginLeft: 5 }}>{text}</Text>}
				</View>
			)}
		</Pressable>
	)
}

const styles = StyleSheet.create({
	iconButton: {
		backgroundColor: colors.secondary,
		padding: 8,
		borderRadius: 5,
		alignItems: 'center'
	},
	textContainer: {
		flexDirection: 'row',
		alignItems: 'center'
	}
})
