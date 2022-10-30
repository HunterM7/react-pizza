import React from 'react'
import debounce from 'lodash.debounce'

import styles from './Search.module.scss'
import { crossIcon, searchIcon } from '../../assets/icons'
import { AppContext } from '../../App'

const Search = () => {
	const [localSearchValue, setLocalSearchValue] =
		React.useState('')
	const { setSearchValue } = React.useContext(AppContext)

	// Func for changing input
	const onChangeInput = (e) => {
		setLocalSearchValue(e.target.value)
		updateSearchValue(e.target.value)
	}

	// Delay for search request
	const updateSearchValue = React.useMemo(
		() =>
			debounce((str) => {
				setSearchValue(str)
			}, 300),
		[setSearchValue],
	)

	// Clear button
	const inputRef = React.useRef()

	const clearSearchBar = () => {
		setLocalSearchValue('')
		setSearchValue('')
		inputRef.current.focus()
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
