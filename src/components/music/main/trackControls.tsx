import { ReactElement } from 'react'

import Ionicons from '@expo/vector-icons/Ionicons'
import Slider from '@react-native-community/slider'
import { StyleSheet, Text, View } from 'react-native'

import { colors } from '@/constants/colors'

export const TrackControls = (): ReactElement => {
	return (
		<View style={styles.container}>
			<View style={styles.buttonContainer}>
				<Text style={{ fontSize: 12, color: colors.secondary }}>--:--</Text>
				<Slider
					style={{ marginHorizontal: 5, flex: 1 }}
					minimumValue={0}
					maximumValue={1}
					minimumTrackTintColor={colors.accent}
					maximumTrackTintColor={colors.secondary}
					thumbTintColor={colors.secondary}
					disabled={false}
				/>
				<Text style={{ fontSize: 12, color: colors.secondary }}>--:--</Text>
			</View>

			<View style={styles.buttonContainer}>
				<Ionicons name={'ios-shuffle'} size={20} color={colors.secondary} />
				<Ionicons name={'play-back-sharp'} size={30} color={colors.secondary} />
				<Ionicons name={'play-circle'} size={50} color={colors.secondary} />
				<Ionicons name={'play-forward-sharp'} size={30} color={colors.secondary} />
				<Ionicons name={'ios-repeat'} size={20} color={colors.secondary} />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center'
	},
	buttonContainer: {
		width: '100%',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	}
})
