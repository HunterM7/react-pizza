// Pizzas Types

export enum SortPropertyEnum {
	TITLE = 'title',
	PRICE = 'price',
	RATING = 'rating',
}

export enum SortName {
	TITLE_ASC = 'алфавиту (возр.)',
	TITLE_DESC = 'алфавиту (убыв.)',
	PRICE_ASC = 'цене (возр.)',
	PRICE_DESC = 'цене (убыв.)',
	RATING_ASC = 'популярности (возр.)',
	RATING_DESC = 'популярности (убыв.)',
}

export enum SortOrder {
	ASC = 'asc',
	DESC = 'desc',
}

export enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
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

export type PizzaItem = {
	id: string
	title: string
	price: number
	imageUrl: string
	types: number[]
	sizes: number[]
	category: number[]
	rating: number
}

export interface PizzaSliceState {
	items: PizzaItem[]
	status: Status
}
