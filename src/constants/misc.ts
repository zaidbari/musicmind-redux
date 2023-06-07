import * as Device from 'expo-device'

import { colors } from './colors'

const fw: 'bold' | 'normal' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | undefined = 'bold'
const inter: 'dark' | 'light' | undefined = 'dark'

export const ACTION_MENU_STYLES = {
	userInterfaceStyle: inter,
	showSeparators: true,
	containerStyle: {
		backgroundColor: colors.primary
	},
	separatorStyle: {
		backgroundColor: colors.secondary
	},
	titleTextStyle: {
		color: colors.accent,
		fontWeight: fw,
		fontSize: 20
	},
	textStyle: {
		color: 'white',
		fontSize: 16
	},
	useModal: true
}

export const PHONE = Device.DeviceType.PHONE
export const TABLET = Device.DeviceType.TABLET
export const DESKTOP = Device.DeviceType.DESKTOP
export const TV = Device.DeviceType.TV

export const SPACER = 15
export const FALLBACK = require('../../assets/icon.png')
