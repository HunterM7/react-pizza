import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { FetchPizzas, PizzaItem } from './types'

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
