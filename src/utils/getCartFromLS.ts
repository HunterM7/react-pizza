// Function that getting cart items from Local Storage

import { calcTotalPrice } from './calcTotalPrice'
import { calcTotalCount } from './calcTotalCount'
import { CartItemType } from '../redux/cart/types'

export const getCartFromLS = () => {
	const data = localStorage.getItem('cart')
	const items: CartItemType[] = data ? JSON.parse(data) : []
	const totalPrice: number = calcTotalPrice(items)
	const totalCount: number = calcTotalCount(items)

	return {
		items,
		totalPrice,
		totalCount,
	}
}
