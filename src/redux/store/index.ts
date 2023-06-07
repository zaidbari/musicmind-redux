import { configureStore } from '@reduxjs/toolkit'

import { api } from '../utils/customFetch'

import { rootReducer } from '@/redux/reducers/rootReducer'

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
	devTools: process.env.NODE_ENV !== 'production'
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
