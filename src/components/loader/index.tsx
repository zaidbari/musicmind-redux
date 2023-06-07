import { ReactElement } from 'react'

import { ActivityIndicator, View } from 'react-native'

import { colors } from '@/constants/colors'

export const Loader = (): ReactElement => {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<ActivityIndicator size={'large'} color={colors.accent} />
		</View>
	)
}
