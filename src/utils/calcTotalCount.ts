// Function that calculate total pizza count in cart

import { CartItemType } from 'redux/cart/types'

export const calcTotalCount = (items: CartItemType[]): number =>
  items.reduce((sum, obj) => sum + obj.count, 0)
