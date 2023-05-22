import { colors } from '@/constants/colors'
import { useState } from 'react'
import { StyleSheet, TextInput, TextInputProps } from 'react-native'

const Input = (props: TextInputProps) => {
	const [isFocused, setIsFocused] = useState<boolean>(false)
	return (
		<TextInput
			{...props}
			onFocus={() => setIsFocused(true)}
			onBlur={() => setIsFocused(false)}
			style={StyleSheet.flatten([styles.input, isFocused && { borderColor: colors.accent }, props.style])}
			placeholderTextColor={colors.placeholder}
		/>
	)
}

const styles = StyleSheet.create({
	input: {
		width: 300,
		paddingVertical: 10,
		paddingHorizontal: 20,
		fontSize: 18,
		backgroundColor: colors.secondary,
		borderRadius: 5,
		color: 'white',
		marginBottom: 10,
		borderWidth: 2,
		borderColor: colors.secondary
	}
})

export default Input
