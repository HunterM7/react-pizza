// Function that calculate total cart price

import { CartItemType } from '../redux/cart/types'

export const calcTotalPrice = (
	items: CartItemType[],
): number =>
	items.reduce((sum, obj) => sum + obj.price * obj.count, 0)
