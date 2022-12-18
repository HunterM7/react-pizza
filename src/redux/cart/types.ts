// Cart Types

export type CartItemType = {
	id: number
	title: string
	price: number
	imageUrl: string
	type: string
	size: number
	count: number
}

export interface CartSliceState {
	totalPrice: number
	totalCount: number
	items: CartItemType[]
}
