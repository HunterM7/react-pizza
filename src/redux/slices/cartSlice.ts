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

			refreshTotalPrice(state)
			refreshTotalCount(state)
		},

		removeItem(state, action: PayloadAction<string>) {
			state.items = state.items.filter(
				(obj) => obj.id !== action.payload,
			)

			refreshTotalPrice(state)
			refreshTotalCount(state)
		},

		plusItem(state, action: PayloadAction<string>) {
			const findItem = state.items.find(
				(obj) => obj.id === action.payload,
			)

			if (findItem) {
				findItem.count++

				refreshTotalPrice(state)
				refreshTotalCount(state)
			}
		},

		minusItem(state, action: PayloadAction<string>) {
			const findItem = state.items.find(
				(obj) => obj.id === action.payload,
			)

			if (findItem) {
				findItem.count--

				refreshTotalPrice(state)
				refreshTotalCount(state)
			}
		},

		clearItems(state) {
			state.items = []
			state.totalPrice = 0
			state.totalCount = 0
		},
	},
})

const refreshTotalPrice = (state: CartSliceState) => {
	state.totalPrice = state.items.reduce(
		(sum, obj) => sum + obj.price * obj.count,
		0,
	)
}

const refreshTotalCount = (state: CartSliceState) => {
	state.totalCount = state.items.reduce(
		(sum, obj) => sum + obj.count,
		0,
	)
}

// Selectors
export const selectCart = (state: RootState) => state.cart
export const selectCartItemById =
	(id: string) => (state: RootState) =>
		state.cart.items.find(
			(obj: CartItemType) => obj.id === id,
		)
// --- --- --- --- --- --- --- ---

export const {
	addItem,
	removeItem,
	plusItem,
	minusItem,
	clearItems,
} = cartSlice.actions

export default cartSlice.reducer
