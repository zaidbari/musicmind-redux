import MainLayout from '@/components/layout/main'
import { HeaderLeft, HeaderRight, HeaderTitle } from '@/components/layout/main/header'
import { SPACER } from '@/constants/misc'
import { useAppDispatch } from '@/redux/hooks'
import { useGetUserNameQuery, useGetUserTypeQuery } from '@/redux/slices/auth/authApiSlice'
import { setUser } from '@/redux/slices/auth/authSlice'
import { useGetPlayerAquisitionQuery } from '@/redux/slices/music/aquisition/aquisitionApiSlice'
import { setAquisition } from '@/redux/slices/music/aquisition/aquisitionSlice'
import { useGetTimerPropertiesQuery } from '@/redux/slices/music/timer/timerApiSlice'
import { setTimer } from '@/redux/slices/music/timer/timerSlice'
import { PlaylistProps } from '@/redux/slices/playlists/playlistApiSlice'
import HomeScreen from '@/screens/main/home'
import PlaylistsScreen from '@/screens/main/playlists'
import TrackScreen from '@/screens/main/tracks'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ReactElement, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

export type MainStackParamList = {
	home: undefined
	playlist: {
		playlist: number
		description: string
	}
	tracks: {
		playlist: PlaylistProps
	}
}

const Stack = createNativeStackNavigator<MainStackParamList>()

const MainStack = (): ReactElement => {
	const { data: username } = useGetUserNameQuery(null)
	const { data: userType } = useGetUserTypeQuery(null)
	const { data: timerProperties } = useGetTimerPropertiesQuery(null)
	const { data: playerAquisition } = useGetPlayerAquisitionQuery(null)

	const dispatch = useAppDispatch()
	const { t } = useTranslation()

	useEffect(() => {
		if (playerAquisition) {
			dispatch(
				setAquisition({
					isRepeatEnabled: playerAquisition[0].repeat_enabled_bool,
					isShuffleEnabled: playerAquisition[0].shuffle_enabled_bool
				})
			)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [playerAquisition])

	useEffect(() => {
		if (timerProperties) {
			dispatch(
				setTimer({
					isTimerEnabled: timerProperties[0].timer_enabled_bool,
					timerMilliSeconds: timerProperties[0].timer_value_integer * 60 * 60
				})
			)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [timerProperties])

	useEffect(() => {
		if (username && userType) {
			dispatch(
				setUser({
					username: username.username as string,
					user_id: username.user_id as number,
					type: userType.usertype as number
				})
			)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [username, userType])

	return (
		<MainLayout>
			<Stack.Navigator
				screenOptions={{
					headerRight: HeaderRight,
					headerLeft: HeaderLeft,
					headerBackVisible: false,
					headerTitle: HeaderTitle,
					contentStyle: { paddingLeft: SPACER }
				}}
			>
				<Stack.Screen name="home" options={{ title: t('headings.home') as string }} component={HomeScreen} />
				<Stack.Screen
					name="playlist"
					options={{ title: t('headings.playlist') as string }}
					component={PlaylistsScreen}
				/>
				<Stack.Screen name="tracks" options={{ title: t('headings.tracks') as string }} component={TrackScreen} />
			</Stack.Navigator>
		</MainLayout>
	)
}

export default MainStack
