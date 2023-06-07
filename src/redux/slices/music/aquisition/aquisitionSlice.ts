import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '@/redux/store'

const initialState = {
	isRepeatEnabled: false,
	isShuffleEnabled: false
}

const aquisitionSlice = createSlice({
	name: 'aquisition',
	initialState,
	reducers: {
		setAquisition: (state, action: PayloadAction<{ isShuffleEnabled: boolean; isRepeatEnabled: boolean }>) => {
			state.isShuffleEnabled = action.payload.isShuffleEnabled
			state.isRepeatEnabled = action.payload.isRepeatEnabled
		}
	}
})

export const { setAquisition } = aquisitionSlice.actions
export const selectAquisition = (state: RootState) => state.aquisition

export default aquisitionSlice.reducer
