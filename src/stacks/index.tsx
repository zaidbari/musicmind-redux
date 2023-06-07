import { useEffect } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Device from 'expo-device'

import { PHONE } from '@/constants/misc'

import AuthStack from './auth'
import MainStack from './main'

import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { selectAuthTokens, setTokens, setUser } from '@/redux/slices/auth/authSlice'
import { setDevice } from '@/redux/slices/layout/deviceSlice'
import { setIsSidebarOpen } from '@/redux/slices/layout/sidebarSlice'

const AppStack = () => {
	const tokens = useAppSelector(selectAuthTokens)
	const dispatch = useAppDispatch()

	useEffect(() => {
		// set device type on application startup
		Device.getDeviceTypeAsync().then((value) => {
			dispatch(setDevice(value))

			// depending on device type, we will set if the sidebar should be open by default or not
			dispatch(setIsSidebarOpen(value !== PHONE))
		})

		// set user data and values on application startup
		AsyncStorage.multiGet(['@refresh', '@access', '@user']).then(
			(values) => {
				if (!values[0][1] || !values[1][1] || !values[2][1]) return
				dispatch(
					setTokens({
						refresh: values[0][1],
						access: values[1][1]
					})
				)
				dispatch(setUser(JSON.parse(values[2][1])))
			},
			(err) => {
				console.log(err)
			}
		)

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return tokens ? <MainStack /> : <AuthStack />
}

export default AppStack
