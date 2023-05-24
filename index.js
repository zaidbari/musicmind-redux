import { colors, DEFAULT_THEME } from '@/constants/colors'
import { store } from '@/redux/store'
import AppStack from '@/stacks'
import i18n from '@/utils/localization'
import { logger } from '@/utils/logger'
import Ionicons from '@expo/vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationContainer } from '@react-navigation/native'
import { registerRootComponent } from 'expo'
import * as Font from 'expo-font'
import * as ScreenOrientation from 'expo-screen-orientation'
import * as SplashScreen from 'expo-splash-screen'
import { useCallback, useEffect, useState } from 'react'
import { Platform, StatusBar, UIManager } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'

import '@/utils/localization'
import 'react-native-gesture-handler'

// Prevents the splash screen from hiding until all fonts and assets are loaded
SplashScreen.preventAutoHideAsync()

// Enables layout animations on Android Devices
if (Platform.OS === 'android') {
	UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)
}

const Root = () => {
	const [appIsReady, setAppIsReady] = useState(false)

	async function prepareAppForMount() {
		try {
			// Pre-load Fonts | Icons
			await Font.loadAsync(Ionicons.font)

			// Pre-load user's last used language
			const language = await AsyncStorage.getItem('@language')
			if (language) i18n.changeLanguage(language)

			// This line actually unloacks all the possible orientations depending on device
			await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.DEFAULT)
		} catch (error) {
			logger.sentry(error)
		} finally {
			// Tell the application to render
			setAppIsReady(true)
		}
	}

	useEffect(() => {
		prepareAppForMount()
	}, [])
	const onLayoutRootView = useCallback(async () => {
		if (appIsReady) {
			// This tells the splash screen to hide immediately! If we call this after
			// `setAppIsReady`, then we may see a blank screen while the app is
			// loading its initial state and rendering its first pixels. So instead,
			// we hide the splash screen once we know the root view has already
			// performed layout.
			await SplashScreen.hideAsync()
		}
	}, [appIsReady])

	// Keep displaying splash screen until the app is ready to render
	if (!appIsReady) return null
	return (
		<Provider store={store}>
			<StatusBar barStyle={'light-content'} backgroundColor={colors.primary} />
			<NavigationContainer theme={DEFAULT_THEME}>
				<SafeAreaProvider onLayout={onLayoutRootView}>
					<AppStack />
				</SafeAreaProvider>
			</NavigationContainer>
		</Provider>
	)
}

registerRootComponent(Root)
