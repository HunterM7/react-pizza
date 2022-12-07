import React from 'react'
import debounce from 'lodash.debounce'

import styles from './Search.module.scss'
import { crossIcon, searchIcon } from '../../assets/icons'

// Redux
import { useDispatch } from 'react-redux'
import { setSearchValue } from '../../redux/slices/filterSlice'

const Search: React.FC = () => {
	const [localSearchValue, setLocalSearchValue] =
		React.useState('')

	// Redux
	const dispatch = useDispatch()

	const handleSearchValue = (value: string) =>
		dispatch(setSearchValue(value))

	// Func for changing input
	const onChangeInput = (
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		setLocalSearchValue(e.target.value)
		updateSearchValue(e.target.value)
	}

	// Delay for search request
	const updateSearchValue = React.useMemo(
		() =>
			debounce((str: string) => {
				handleSearchValue(str)
			}, 300),
		[],
	)

	// Clear button
	const inputRef = React.useRef<HTMLInputElement>(null)

	const clearSearchBar = () => {
		setLocalSearchValue('')
		handleSearchValue('')

		inputRef.current?.focus()
	}

	return (
		<div className={styles.wrapper}>
			{searchIcon}

			<input
				ref={inputRef}
				type='text'
				value={localSearchValue}
				onChange={onChangeInput}
				className={styles.input}
				placeholder='Поиск пиццы...'
			/>

			{localSearchValue && (
				<button
					onClick={clearSearchBar}
					className={styles.clearBtn}
				>
					{crossIcon}
				</button>
			)}
		</div>
	)
}

export default Search
