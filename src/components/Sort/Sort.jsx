import React from 'react'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import { setSortType } from '../../redux/slices/filterSlice'

// Import files and styles
import styles from './Sort.module.scss'
import { triangleIcon } from '../../assets/icons'

export const sortList = [
	{
		name: 'популярности (возр.)',
		sortProperty: 'rating',
		order: 'asc',
	},
	{
		name: 'популярности (убыв.)',
		sortProperty: 'rating',
		order: 'desc',
	},
	{
		name: 'цене (возр.)',
		sortProperty: 'price',
		order: 'asc',
	},
	{
		name: 'цене (убыв.)',
		sortProperty: 'price',
		order: 'desc',
	},
	{
		name: 'алфавиту (возр.)',
		sortProperty: 'title',
		order: 'asc',
	},
	{
		name: 'алфавиту (убыв.)',
		sortProperty: 'title',
		order: 'desc',
	},
]

const Sort = () => {
	// Popup control
	const [open, setOpen] = React.useState(false)
	const sortRef = React.useRef()

	React.useEffect(() => {
		const handleClick = (e) => {
			if (!e.path.includes(sortRef.current)) {
				setOpen(false)
			}
		}

		document.body.addEventListener('click', handleClick)

		return () => {
			document.body.removeEventListener(
				'click',
				handleClick,
			)
		}
	}, [])

	// Redux
	const dispatch = useDispatch()
	const sort = useSelector((state) => state.filter.sortType)

	const chooseAndClose = (obj) => {
		dispatch(setSortType(obj))
		setOpen(!open)
	}
	// --- --- --- --- --- --- --- ---

	return (
		<div ref={sortRef} className={styles.sort}>
			<div
				className={`
						${styles.sort__icon}
						${open ? styles.active : ''}
					`}
			>
				{triangleIcon}
			</div>

			<b className={styles.sort__title}>Сортировка по:</b>

			<span
				className={styles.sort__name}
				onClick={() => setOpen(!open)}
			>
				{sort.name}
			</span>

			{open && (
				<ul className={styles.popup}>
					{sortList.map((obj, i) => {
						return (
							<li
								key={i}
								className={`
									${styles.popup__item}
									${sort.name === obj.name ? styles.active : ''}
								`}
								onClick={() => chooseAndClose(obj)}
							>
								{obj.name}
							</li>
						)
					})}
				</ul>
			)}
		</div>
	)
}

export default Sort
