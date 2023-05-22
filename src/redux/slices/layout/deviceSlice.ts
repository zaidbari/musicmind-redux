import { RootState } from '@/redux/store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as Device from 'expo-device'

const initialState = {
	device: Device.DeviceType.TABLET
}

const deviceSlice = createSlice({
	name: 'device',
	initialState,
	reducers: {
		setDevice: (state, action: PayloadAction<number>) => {
			state.device = action.payload
		}
	}
})

export const { setDevice } = deviceSlice.actions
export const selectDevice = (state: RootState) => state.device

export default deviceSlice.reducer
