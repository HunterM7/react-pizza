import {
	createSlice,
	PayloadAction,
} from '@reduxjs/toolkit'

import { fetchPizzas } from './asyncActions'
import { PizzaItem, PizzaSliceState, Status } from './types'

const initialState: PizzaSliceState = {
	items: [],
	status: Status.LOADING,
}

const pizzasSlice = createSlice({
	name: 'pizzas',
	initialState,
	reducers: {
		setItems(state, action: PayloadAction<PizzaItem[]>) {
			state.items = action.payload
		},
	},

	extraReducers: (builder) => {
		builder.addCase(fetchPizzas.pending, (state) => {
			state.status = Status.LOADING
			state.items = []
		})
		builder.addCase(
			fetchPizzas.fulfilled,
			(state, action) => {
				state.status = Status.SUCCESS
				state.items = action.payload
			},
		)
		builder.addCase(fetchPizzas.rejected, (state) => {
			state.status = Status.ERROR
			state.items = []
		})
	},
})

export const { setItems } = pizzasSlice.actions

export default pizzasSlice.reducer
