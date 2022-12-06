import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	searchValue: '',
	categoryId: 0,
	currentPage: 1,
	sortType: {
		name: 'популярности (убыв.)',
		sortProperty: 'rating',
		order: 'desc',
	},
}

const filterSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setSearchValue(state, action) {
			state.searchValue = action.payload
		},
		setCategoryId(state, action) {
			state.categoryId = action.payload
		},
		setSortType(state, action) {
			state.sortType = action.payload
		},
		setCurrentPage(state, action) {
			state.currentPage = action.payload
		},
		setFilters(state, action) {
			state.categoryId = +action.payload.categoryId
			state.currentPage = +action.payload.currentPage
			state.sortType = action.payload.sortType
		},
	},
})

// Selectors
export const selectFilter = (state) => state.filter
export const selectSort = (state) => state.filter.sortType
// --- --- --- --- --- --- --- ---

export const {
	setSearchValue,
	setCategoryId,
	setSortType,
	setCurrentPage,
	setFilters,
} = filterSlice.actions

export default filterSlice.reducer
