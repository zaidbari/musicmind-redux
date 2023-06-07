import authReducer from '@/redux/slices/auth/authSlice'
import deviceSlice from '@/redux/slices/layout/deviceSlice'
import layoutSlice from '@/redux/slices/layout/layoutSlice'
import sidebarSlice from '@/redux/slices/layout/sidebarSlice'
import aquisitionSlice from '@/redux/slices/music/aquisition/aquisitionSlice'
import timerReducer from '@/redux/slices/music/timer/timerSlice'
import { api } from '@/redux/utils/customFetch'

export const rootReducer = {
	[api.reducerPath]: api.reducer,
	auth: authReducer,
	timer: timerReducer,
	aquisition: aquisitionSlice,
	sidebar: sidebarSlice,
	device: deviceSlice,
	layout: layoutSlice
}
