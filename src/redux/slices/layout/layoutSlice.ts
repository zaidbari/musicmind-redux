import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '@/redux/store'

const initialState = {
	itemWidth: 200,
	layoutWidth: 820,
	itemCount: 4
}

const layoutSlice = createSlice({
	name: 'layout',
	initialState,
	reducers: {
		setLayoutWidth: (state, action: PayloadAction<number>) => {
			state.layoutWidth = action.payload
			state.itemWidth = (action.payload - 20 * state.itemCount - 1) / state.itemCount
		},
		setItemCount: (state, action: PayloadAction<number>) => {
			state.itemCount = action.payload
			state.itemWidth = (state.layoutWidth - 20 * action.payload - 1) / action.payload
		}
	}
})

export const { setLayoutWidth, setItemCount } = layoutSlice.actions
export const selectLayout = (state: RootState) => state.layout
export default layoutSlice.reducer
