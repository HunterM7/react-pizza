import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { CartItemType, CartSliceState } from './types'

// Functions
import { getCartFromLS, calcTotalPrice, calcTotalCount } from 'utils'

const initialState: CartSliceState = getCartFromLS()

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItemType>) {
      const findItem = state.items.find((obj) => obj.id === action.payload.id)

      if (findItem) {
        findItem.count++
      } else {
        state.items.push({ ...action.payload, count: 1 })
      }

      state.totalPrice = calcTotalPrice(state.items)
      state.totalCount = calcTotalCount(state.items)
    },

    removeItem(state, action: PayloadAction<number>) {
      state.items = state.items.filter((obj) => obj.id !== action.payload)

      state.totalPrice = calcTotalPrice(state.items)
      state.totalCount = calcTotalCount(state.items)
    },

    plusItem(state, action: PayloadAction<number>) {
      const findItem = state.items.find((obj) => obj.id === action.payload)

      if (findItem) {
        findItem.count++

        state.totalPrice = calcTotalPrice(state.items)
        state.totalCount = calcTotalCount(state.items)
      }
    },

    minusItem(state, action: PayloadAction<number>) {
      const findItem = state.items.find((obj) => obj.id === action.payload)

      if (findItem) {
        findItem.count--

        state.totalPrice = calcTotalPrice(state.items)
        state.totalCount = calcTotalCount(state.items)
      }
    },

    clearItems(state) {
      state.items = []
      state.totalPrice = 0
      state.totalCount = 0
    },
  },
})

export const { addItem, removeItem, plusItem, minusItem, clearItems } =
  cartSlice.actions

export default cartSlice.reducer
