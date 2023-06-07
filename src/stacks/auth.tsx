import { ReactElement } from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import LoginScreen from '@/screens/auth/login'

const Stack = createNativeStackNavigator()

const AuthStack = (): ReactElement => {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false
			}}
		>
			<Stack.Screen
				name="login"
				options={{
					title: 'Login'
				}}
				component={LoginScreen}
			/>
		</Stack.Navigator>
	)
}

export default AuthStack
