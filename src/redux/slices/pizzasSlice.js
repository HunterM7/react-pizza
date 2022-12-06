import axios from 'axios'

import {
	createSlice,
	createAsyncThunk,
} from '@reduxjs/toolkit'

const initialState = {
	items: [],
	status: 'loading', // loading | succes | error
}

export const fetchPizzas = createAsyncThunk(
	'pizzas/fetchPizzas',
	async (
		{ currentPage, sortType, categoryId, searchValue },
		thunkAPI,
	) => {
		let filter = ''
		filter += `?page=${currentPage}&limit=4`
		filter += `&sortBy=${sortType.sortProperty}&order=${sortType.order}`
		if (categoryId) filter += `&category=${categoryId}`
		if (searchValue) filter += `&title=${searchValue}`

		const { data } = await axios.get(
			`https://62c6ff0674e1381c0a6edc07.mockapi.io/pizzas${filter}`,
		)

		return data
	},
)

const pizzasSlice = createSlice({
	name: 'pizzas',
	initialState,
	reducers: {
		setItems(state, action) {
			state.items = action.payload
		},
	},
	extraReducers: {
		[fetchPizzas.pending]: (state) => {
			state.status = 'loading'
			state.items = []
		},
		[fetchPizzas.fulfilled]: (state, action) => {
			state.status = 'succes'
			state.items = action.payload
		},
		[fetchPizzas.rejected]: (state) => {
			state.status = 'error'
			state.items = []
		},
	},
})

// Selectors
export const selectPizzas = (state) => state.pizzas
// --- --- --- --- --- --- --- ---

export const { setItems } = pizzasSlice.actions

export default pizzasSlice.reducer
