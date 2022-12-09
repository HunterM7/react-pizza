import {
	createSlice,
	PayloadAction,
} from '@reduxjs/toolkit'
import { RootState } from '../store'

export type CartItemType = {
	id: string
	title: string
	price: number
	imageUrl: string
	type: string
	size: number
	count: number
}

interface CartSliceState {
	totalPrice: number
	totalCount: number
	items: CartItemType[]
}

const initialState: CartSliceState = {
	totalPrice: 0,
	totalCount: 0,
	items: [],
}

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem(state, action: PayloadAction<CartItemType>) {
			const findItem = state.items.find(
				(obj) => obj.id === action.payload.id,
			)

			if (findItem) {
				findItem.count++
			} else {
				state.items.push({ ...action.payload, count: 1 })
			}

			state.totalPrice = state.items.reduce(
				(sum, obj) => sum + obj.price * obj.count,
				0,
			)

			state.totalCount = state.items.reduce(
				(sum, obj) => sum + obj.count,
				0,
			)
		},

		removeItem(state, action: PayloadAction<string>) {
			state.items = state.items.filter(
				(obj) => obj.id !== action.payload,
			)
		},

		plusItem(state, action: PayloadAction<string>) {
			const findItem = state.items.find(
				(obj) => obj.id === action.payload,
			)

			if (findItem) {
				findItem.count++
			}
		},

		minusItem(state, action: PayloadAction<string>) {
			const findItem = state.items.find(
				(obj) => obj.id === action.payload,
			)

			if (findItem) {
				findItem.count--
			}
		},

		clearItems(state) {
			state.items = []
			state.totalPrice = 0
			state.totalCount = 0
		},
	},
})

// Selectors
export const selectCart = (state: RootState) => state.cart
export const selectCartItemById =
	(id: string) => (state: RootState) =>
		state.cart.items.find((obj: CartItemType) => obj.id === id)
// --- --- --- --- --- --- --- ---

export const {
	addItem,
	removeItem,
	plusItem,
	minusItem,
	clearItems,
} = cartSlice.actions

export default cartSlice.reducer
