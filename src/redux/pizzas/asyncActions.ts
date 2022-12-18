import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'

import {
	FetchPizzas,
	PizzaItem,
	SortOrder,
	SortPropertyEnum,
} from './types'

// Firebase
import {
	collection,
	getDocs,
	orderBy,
	query,
	where,
} from 'firebase/firestore'
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
		const collectionRef = query(
			collection(database, 'pizzas'),
			where('category', 'array-contains', categoryId),
			orderBy(sortType.sortProperty, sortType.order),
		)

		let pizzas: PizzaItem[] = []

		await getDocs(collectionRef)
			.then((response) => {
				pizzas = response.docs.map((item) => {
					return {
						...item.data(),
						key: item.id,
					}
				}) as PizzaItem[]
			})
			.catch((error) =>
				console.log(
					`Error: Didn't get pizzas`,
					error.message,
				),
			)

		return pizzas
	},
)

// MockAPI
// export const getPizzasData = async (value: string) => {
// 	const { data } = await axios.get<PizzaItem[]>(
// 		`https://62c6ff0674e1381c0a6edc07.mockapi.io/pizzas${value}`,
// 	)

// 	await getPizzasData2('')

// 	return data
// }

export const getPizzaById = async (id: string) => {
	const { data } = await axios.get<PizzaItem>(
		`https://62c6ff0674e1381c0a6edc07.mockapi.io/pizzas/${id}`,
	)

	return data
}
