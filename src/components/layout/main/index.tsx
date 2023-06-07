import { ReactElement, useEffect, useState } from 'react'

import { addEventListener } from '@react-native-community/netinfo'
import { Text, View } from 'react-native'

import Sidebar from './sidebar'

const NoInternet = (): ReactElement => {
	return (
		<View style={{ backgroundColor: 'red' }}>
			<Text style={{ textAlign: 'center', color: 'white' }}>No Internet</Text>
		</View>
	)
}

const MainLayout = ({ children }: { children: ReactElement }): ReactElement => {
	const [isInternetReachable, setIsInternetReachable] = useState<boolean>(true)

	useEffect(() => {
		const unsubscribe = addEventListener((state) => {
			setIsInternetReachable(state.isInternetReachable === null ? true : state.isInternetReachable)
		})

		return () => {
			unsubscribe()
		}
	}, [])

	return (
		<View style={{ flex: 1 }}>
			{!isInternetReachable && <NoInternet />}
			<View style={{ flex: 1, flexDirection: 'row' }}>
				<Sidebar />
				{children}
			</View>
		</View>
	)
}

export default MainLayout
