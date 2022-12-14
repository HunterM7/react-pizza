import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

import { FetchPizzas, PizzaItem } from './types'

// Firebase
import { collection, getDocs } from 'firebase/firestore'
import { database } from '../../firebase/firebaseConfig'

// --- --- --- --- --- --- --- --- --- --- --- ---

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

		return getPizzasData(filter)
	},
)

// MockAPI
export const getPizzasData = async (value: string) => {
	const { data } = await axios.get<PizzaItem[]>(
		`https://62c6ff0674e1381c0a6edc07.mockapi.io/pizzas${value}`,
	)

	return data
}

// FIREBASE
// export const getPizzasData = async (value: string) => {
// 	const collectionRef = collection(database, 'pizzas')

// 	let pizzas: PizzaItem[] = []

// 	await getDocs(collectionRef)
// 		.then((response) => {
// 			pizzas = response.docs.map((item) => {
// 				return { ...item.data(), id: item.id } as PizzaItem
// 			})
// 		})
// 		.catch((error) =>
// 			console.log(
// 				`Error: Didn't get pizzas`,
// 				error.message,
// 			),
// 		)

// 	return pizzas
// }

export const getPizzaById = async (id: string) => {
	const { data } = await axios.get<PizzaItem>(
		`https://62c6ff0674e1381c0a6edc07.mockapi.io/pizzas/${id}`,
	)

	return data
}
