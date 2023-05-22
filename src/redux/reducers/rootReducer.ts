import authReducer from '@/redux/slices/auth/authSlice'
import timerReducer from '@/redux/slices/music/timer/timerSlice'
import aquisitionSlice from '@/redux/slices/music/aquisition/aquisitionSlice'

import { api } from '../utils/customFetch'
import deviceSlice from '../slices/layout/deviceSlice'
import sidebarSlice from '../slices/layout/sidebarSlice'
import layoutSlice from '../slices/layout/layoutSlice'

export const rootReducer = {
	[api.reducerPath]: api.reducer,
	auth: authReducer,
	timer: timerReducer,
	aquisition: aquisitionSlice,
	sidebar: sidebarSlice,
	device: deviceSlice,
	layout: layoutSlice
}
