import { RootState } from '@/redux/store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState = {
	isSidebarOpen: true
}

const sidebarSlice = createSlice({
	name: 'sidebar',
	initialState,
	reducers: {
		setIsSidebarOpen: (state, action: PayloadAction<boolean>) => {
			state.isSidebarOpen = action.payload
		}
	}
})

export const { setIsSidebarOpen } = sidebarSlice.actions
export const selectSidebar = (state: RootState) => state.sidebar

export default sidebarSlice.reducer
