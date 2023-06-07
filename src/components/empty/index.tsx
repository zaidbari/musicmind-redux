import { ReactElement } from 'react'

import Ionicons from '@expo/vector-icons/Ionicons'
import { Text, View } from 'react-native'

export const EmptyComponent = (): ReactElement => {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Ionicons name={'warning-outline'} color={'white'} size={100} />
			<Text style={{ textAlign: 'center', fontSize: 24, color: 'white', marginTop: 10 }}>No Data</Text>
		</View>
	)
}
