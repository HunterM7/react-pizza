// Selectors
import { RootState } from '../store'
import { CartItemType } from './types'

export const selectCart = (state: RootState) => state.cart
export const selectCartItemById =
	(id: number) => (state: RootState) =>
		state.cart.items.find(
			(obj: CartItemType) => obj.id === id,
		)
