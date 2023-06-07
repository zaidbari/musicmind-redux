import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '@/redux/store'

const initialState = {
	isRepeatEnabled: false,
	isShuffleEnabled: false
}

type PayloadProps = typeof initialState

const aquisitionSlice = createSlice({
	name: 'aquisition',
	initialState,
	reducers: {
		setAquisition: (state, action: PayloadAction<PayloadProps>) => {
			state = action.payload
		}
	}
})

export const { setAquisition } = aquisitionSlice.actions
export const selectAquisition = (state: RootState) => state.aquisition

export default aquisitionSlice.reducer
