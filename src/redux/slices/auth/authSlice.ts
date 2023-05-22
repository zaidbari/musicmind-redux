import { RootState } from '@/redux/store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { IAuthState, ITokens, IUser } from './types'

const initialState: IAuthState = {
	user: null,
	tokens: null
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setTokens: (state, action: PayloadAction<ITokens>) => {
			state.tokens = action.payload

			AsyncStorage.setItem('@refresh', action.payload.refresh).then(() => {})
			AsyncStorage.setItem('@access', action.payload.access).then(() => {})
		},
		setUser: (state, action: PayloadAction<IUser>) => {
			state.user = action.payload

			AsyncStorage.setItem('@user', JSON.stringify(action.payload)).then(() => {})
		},
		logoutUser: (state) => {
			state.user = null
			state.tokens = null

			AsyncStorage.multiRemove(['@access', '@refresh', '@user']).then(() => {})
		}
	}
})

export const { setTokens, setUser, logoutUser } = authSlice.actions
export const selectLoggedInUser = (state: RootState) => state.auth.user
export const selectAuthTokens = (state: RootState) => state.auth.tokens

export default authSlice.reducer
