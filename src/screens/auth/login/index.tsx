import Input from '@/components/form/input'
import { blurhash, colors } from '@/constants/colors'
import { useAppDispatch } from '@/redux/hooks'
import { useLoginMutation } from '@/redux/slices/auth/authApiSlice'
import { setTokens } from '@/redux/slices/auth/authSlice'
import { Image } from 'expo-image'
import { ReactElement, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text } from 'react-native'

const LoginScreen = (): ReactElement => {
	const [username, setUsername] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [error, setError] = useState<string>('')

	const { t } = useTranslation()

	useEffect(() => {
		if (error !== '') setError('')

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [username, password])

	const [login, { isLoading }] = useLoginMutation()
	const dispatch = useAppDispatch()

	const _handleLogin = async () => {
		try {
			const result = await login({ username, password }).unwrap()
			dispatch(setTokens(result))
		} catch (err: any) {
			setError(err.data.detail)
		}
	}
	return (
		<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
			<Image
				style={styles.image}
				source={require('../../../../assets/music_mind_logo.svg')}
				placeholder={blurhash}
				contentFit="contain"
				transition={10}
			/>
			<Input onChangeText={setUsername} placeholder={'username'} autoFocus />
			<Input onChangeText={setPassword} placeholder={'password'} secureTextEntry />
			<Pressable style={styles.button} onPress={_handleLogin}>
				{isLoading && <ActivityIndicator style={{ marginRight: 10 }} color={colors.primary} />}
				<Text style={styles.buttonText}>{t('buttons.signin')}</Text>
			</Pressable>
			<Text style={styles.errorText}>{t(error)}</Text>
		</KeyboardAvoidingView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	image: {
		width: 300,
		height: 150,
		marginBottom: 20
	},
	button: {
		width: 300,
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 5,
		borderWidth: 2,
		borderColor: colors.accent,
		backgroundColor: colors.accent,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center'
	},
	buttonText: {
		fontSize: 18,
		fontWeight: 'bold',
		color: colors.primary,
		textAlign: 'center'
	},
	errorText: {
		fontSize: 18,
		color: 'red',
		textAlign: 'center',
		width: 300,
		marginTop: 20
	}
})

export default LoginScreen
