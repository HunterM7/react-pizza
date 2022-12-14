import { useDispatch } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

// Slices
import pizzas from './pizzas/slice'
import filter from './filter/slice'
import cart from './cart/slice'

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
