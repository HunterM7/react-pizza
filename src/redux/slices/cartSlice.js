import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	totalPrice: 0,
	totalCount: 0,
	items: [],
}

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem(state, action) {
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

		removeItem(state, action) {
			state.items = state.items.filter(
				(obj) => obj.id !== action.payload,
			)
		},

		plusItem(state, action) {
			const findItem = state.items.find(
				(obj) => obj.id === action.payload,
			)

			if (findItem) {
				findItem.count++
			}
		},

		minusItem(state, action) {
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
export const selectCart = (state) => state.cart
export const selectCartItemById = (id) => (state) =>
	state.cart.items.find((obj) => obj.id === id)
// --- --- --- --- --- --- --- ---
export const {
	addItem,
	removeItem,
	plusItem,
	minusItem,
	clearItems,
} = cartSlice.actions

export default cartSlice.reducer