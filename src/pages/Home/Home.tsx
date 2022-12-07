import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import QueryString from 'qs'

// Import files
import styles from './Home.module.scss'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import {
	setCategoryId,
	setCurrentPage,
	setFilters,
	selectFilter,
} from '../../redux/slices/filterSlice'
import {
	fetchPizzas,
	selectPizzas,
} from '../../redux/slices/pizzasSlice'

// Components
import Categories from '../../components/Categories/Categories'
import Sort, { sortList } from '../../components/Sort/Sort'
import PizzaCard from '../../components/PizzaCard/PizzaCard'
import PizzaCardSkeleton from '../../components/PizzaCard/PizzaCardLoader'
import Pagination from '../../components/Pagination/Pagination'
import NotFound from '../NotFound/NotFound'

// --- --- --- --- --- --- --- --- --- --- --- ---

const Home: React.FC = () => {
	// Redux
	const dispatch = useDispatch()
	const { categoryId, sortType, currentPage, searchValue } =
		useSelector(selectFilter)
	const { items: pizzas, status } =
		useSelector(selectPizzas)

	const onChangeCategory = (id: number) =>
		dispatch(setCategoryId(id))

	const onChangePage = (num: number) =>
		dispatch(setCurrentPage(num))

	// --- --- --- --- --- --- --- ---

	const isUrlSearch = React.useRef(false)
	const isMounted = React.useRef(false)

	const getPizzas = () => {
		dispatch(
			// @ts-ignore
			fetchPizzas({
				currentPage,
				sortType,
				categoryId,
				searchValue,
			}),
		)
	}

	// URL
	const navigate = useNavigate()

	// If params were changed and the first render was
	React.useEffect(() => {
		if (isMounted.current) {
			const queryString = QueryString.stringify({
				categoryId,
				sortProperty: sortType.sortProperty,
				order: sortType.order,
				currentPage,
			})

			navigate(`?${queryString}`)
		}
		isMounted.current = true
	}, [categoryId, sortType, currentPage, navigate])

	// At first render check for URL and send them to Redux
	React.useEffect(() => {
		const searchValue = window.location.search

		if (searchValue) {
			const params = QueryString.parse(
				searchValue.substring(1),
			)

			const sortType = sortList.find(
				(obj) =>
					obj.sortProperty === params.sortProperty &&
					obj.order === params.order,
			)

			dispatch(
				setFilters({
					...params,
					sortType,
				}),
			)
			isUrlSearch.current = true
		}
	}, [])

	// If first render was, then fetch for pizzas
	React.useEffect(() => {
		window.scrollTo(0, 0)

		if (!isUrlSearch.current) {
			getPizzas()
		}

		isUrlSearch.current = false
	}, [categoryId, sortType, searchValue, currentPage])

	const skeletons = [...new Array(4)].map((_, i) => {
		return (
			<li key={i} className={styles.pizzas__item}>
				<PizzaCardSkeleton />
			</li>
		)
	})

	const pizzaList = pizzas.map((obj: any) => (
		<li key={obj.id} className={styles.pizzas__item}>
			<NavLink to={`\pizza-${obj.id}`}>
				<PizzaCard {...obj} />
			</NavLink>
		</li>
	))

	return (
		<div className={`container ${styles.container}`}>
			<div className={styles.filters}>
				<Categories
					categoryId={categoryId}
					onChangeCategory={onChangeCategory}
				/>
				<Sort />
			</div>

			<h2 className={styles.title}>Все пиццы</h2>

			{status === 'error' ? (
				<NotFound />
			) : (
				<ul className={styles.pizzas}>
					{status === 'loading' ? skeletons : pizzaList}
				</ul>
			)}

			<div className={styles.pagination}>
				<Pagination
					currentPage={currentPage}
					setCurrentPage={onChangePage}
				/>
			</div>
		</div>
	)
}

export default Home
