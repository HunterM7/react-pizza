import { RootState } from '../store'

// Selectors
export const selectFilter = (state: RootState) =>
	state.filter
export const selectSort = (state: RootState) =>
	state.filter.sortType
