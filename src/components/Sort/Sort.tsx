import React from 'react'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import {
	SortName,
	SortOrder,
	SortPropertyEnum,
	SortType,
} from '../../redux/slices/pizzasSlice'
import {
	selectSort,
	setSortType,
} from '../../redux/slices/filterSlice'

// Import files and styles
import styles from './Sort.module.scss'
import { triangleIcon } from '../../assets/icons'

export const sortList: SortType[] = [
	{
		name: SortName.RATING_ASC,
		sortProperty: SortPropertyEnum.RATING,
		order: SortOrder.ASC,
	},
	{
		name: SortName.RATING_DESC,
		sortProperty: SortPropertyEnum.RATING,
		order: SortOrder.DESC,
	},
	{
		name: SortName.PRICE_ASC,
		sortProperty: SortPropertyEnum.PRICE,
		order: SortOrder.ASC,
	},
	{
		name: SortName.PRICE_DESC,
		sortProperty: SortPropertyEnum.PRICE,
		order: SortOrder.DESC,
	},
	{
		name: SortName.TITLE_ASC,
		sortProperty: SortPropertyEnum.TITLE,
		order: SortOrder.ASC,
	},
	{
		name: SortName.TITLE_DESC,
		sortProperty: SortPropertyEnum.TITLE,
		order: SortOrder.DESC,
	},
]

const Sort: React.FC = () => {
	// Popup control
	const [open, setOpen] = React.useState(false)
	const sortRef = React.useRef<HTMLDivElement>(null)

	React.useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			const _e = e as MouseEvent & {
				path: Node[]
			}

			if (
				sortRef.current &&
				!_e.path.includes(sortRef.current)
			) {
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
	const sort = useSelector(selectSort)

	const chooseAndClose = (obj: SortType) => {
		dispatch(setSortType(obj))
		setOpen(false)
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
