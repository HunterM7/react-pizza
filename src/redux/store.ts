import { configureStore } from '@reduxjs/toolkit'

import pizzas from './slices/pizzasSlice'
import filter from './slices/filterSlice'
import cart from './slices/cartSlice'
import { useDispatch } from 'react-redux'

export const store = configureStore({
	reducer: {
		pizzas,
		filter,
		cart,
	},
})

export type RootState = ReturnType<typeof store.getState>

export const useAppDispatch = () =>
	useDispatch<typeof store.dispatch>()
