import axios from 'axios'

import {
	createSlice,
	PayloadAction,
	createAsyncThunk,
} from '@reduxjs/toolkit'

import { RootState } from '../store'

export enum SortName {
	TITLE_ASC = 'алфавиту (возр.)',
	TITLE_DESC = 'алфавиту (убыв.)',
	PRICE_ASC = 'цене (возр.)',
	PRICE_DESC = 'цене (убыв.)',
	RATING_ASC = 'популярности (возр.)',
	RATING_DESC = 'популярности (убыв.)',
}

export enum SortPropertyEnum {
	TITLE = 'title',
	PRICE = 'price',
	RATING = 'rating',
}

export enum SortOrder {
	ASC = 'asc',
	DESC = 'desc',
}

export type SortType = {
	name: SortName
	sortProperty: SortPropertyEnum
	order: SortOrder
}

export type FetchPizzas = {
	currentPage: number
	sortType: SortType
	categoryId: number
	searchValue: string
}

type PizzaItem = {
	id: string
	title: string
	price: number
	imageUrl: string
	types: number[]
	sizes: number[]
	category: number[]
	rating: number
}

export enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
}

interface PizzaSliceState {
	items: PizzaItem[]
	status: Status
}

const initialState: PizzaSliceState = {
	items: [],
	status: Status.LOADING,
}

export const fetchPizzas = createAsyncThunk<
	PizzaItem[],
	FetchPizzas
>(
	'pizzas/fetchPizzas',
	async ({
		currentPage,
		sortType,
		categoryId,
		searchValue,
	}) => {
		let filter = ''
		filter += `?page=${currentPage}&limit=4`
		filter += `&sortBy=${sortType.sortProperty}&order=${sortType.order}`
		if (categoryId) filter += `&category=${categoryId}`
		if (searchValue) filter += `&title=${searchValue}`

		const { data } = await axios.get<PizzaItem[]>(
			`https://62c6ff0674e1381c0a6edc07.mockapi.io/pizzas${filter}`,
		)

		return data
	},
)

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

// Selectors
export const selectPizzas = (state: RootState) =>
	state.pizzas
// --- --- --- --- --- --- --- ---

export const { setItems } = pizzasSlice.actions

export default pizzasSlice.reducer
