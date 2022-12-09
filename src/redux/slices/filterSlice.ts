import {
	createSlice,
	PayloadAction,
} from '@reduxjs/toolkit'
import { RootState } from '../store'
import {
	FetchPizzas,
	SortName,
	SortOrder,
	SortPropertyEnum,
	SortType,
} from './pizzasSlice'

const initialState: FetchPizzas = {
	searchValue: '',
	categoryId: 0,
	currentPage: 1,
	sortType: {
		name: SortName.RATING_DESC,
		sortProperty: SortPropertyEnum.RATING,
		order: SortOrder.DESC,
	},
}

const filterSlice = createSlice({
	name: 'filters',
	initialState,
	reducers: {
		setSearchValue(state, action: PayloadAction<string>) {
			state.searchValue = action.payload
		},
		setCategoryId(state, action: PayloadAction<number>) {
			state.categoryId = action.payload
		},
		setCurrentPage(state, action: PayloadAction<number>) {
			state.currentPage = action.payload
		},
		setSortType(state, action: PayloadAction<SortType>) {
			state.sortType = action.payload
		},
		setFilters(state, action: PayloadAction<FetchPizzas>) {
			if (Object.keys(action.payload).length) {
				state.searchValue = action.payload.searchValue
				state.categoryId = +action.payload.categoryId
				state.currentPage = +action.payload.currentPage
				state.sortType = action.payload.sortType
			} else {
				state.searchValue = ''
				state.categoryId = 0
				state.currentPage = 1
				state.sortType = {
					name: SortName.RATING_DESC,
					sortProperty: SortPropertyEnum.RATING,
					order: SortOrder.DESC,
				}
			}
		},
	},
})

// Selectors
export const selectFilter = (state: RootState) =>
	state.filter
export const selectSort = (state: RootState) =>
	state.filter.sortType
// --- --- --- --- --- --- --- ---

export const {
	setSearchValue,
	setCategoryId,
	setSortType,
	setCurrentPage,
	setFilters,
} = filterSlice.actions

export default filterSlice.reducer
