import deviceSlice from '../slices/layout/deviceSlice'
import layoutSlice from '../slices/layout/layoutSlice'
import sidebarSlice from '../slices/layout/sidebarSlice'
import { api } from '../utils/customFetch'

import authReducer from '@/redux/slices/auth/authSlice'
import aquisitionSlice from '@/redux/slices/music/aquisition/aquisitionSlice'
import timerReducer from '@/redux/slices/music/timer/timerSlice'

export const rootReducer = {
	[api.reducerPath]: api.reducer,
	auth: authReducer,
	timer: timerReducer,
	aquisition: aquisitionSlice,
	sidebar: sidebarSlice,
	device: deviceSlice,
	layout: layoutSlice
}
