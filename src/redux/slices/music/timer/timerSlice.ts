import { RootState } from '@/redux/store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
	isTimerEnabled: false,
	timerMilliSeconds: 0
}

const timerSlice = createSlice({
	name: 'timer',
	initialState,
	reducers: {
		setTimer: (state, action: PayloadAction<{ isTimerEnabled: boolean; timerMilliSeconds: number }>) => {
			state.isTimerEnabled = action.payload.isTimerEnabled
			state.timerMilliSeconds = action.payload.timerMilliSeconds
		}
	}
})

export const { setTimer } = timerSlice.actions
export const selectTimer = (state: RootState) => state.timer

export default timerSlice.reducer
