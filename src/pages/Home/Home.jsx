import React from 'react'
import axios from 'axios'
import QueryString from 'qs'

// Import files
import styles from './Home.module.scss'
import { AppContext } from '../../App'

// Redux
import { useSelector, useDispatch } from 'react-redux'
import {
	setCategoryId,
	setCurrentPage,
	setFilters,
} from '../../redux/slices/filterSlice'

// Components
import Categories from '../../components/Categories/Categories'
import Sort, { sortList } from '../../components/Sort/Sort'
import PizzaCard from '../../components/PizzaCard/PizzaCard'
import PizzaCardSkeleton from '../../components/PizzaCard/PizzaCardLoader'
import Pagination from '../../components/Pagination/Pagination'
import { useNavigate } from 'react-router-dom'

const Home = () => {
	// Redux
	const dispatch = useDispatch()
	const { categoryId, sortType, currentPage } = useSelector(
		(state) => state.filter,
	)

	const onChangeCategory = (id) => {
		dispatch(setCategoryId(id))
	}

	const onChangePage = (num) => {
		dispatch(setCurrentPage(num))
	}
	// --- --- --- --- --- --- --- ---

	const [pizzas, setPizzas] = React.useState([])
	const [isLoading, setIsLoading] = React.useState(true)
	const isUrlSearch = React.useRef(false)
	const isMounted = React.useRef(false)

	const { searchValue } = React.useContext(AppContext)

	const fetchPizzas = () => {
		setIsLoading(true)

		let filter = ''
		filter += `?page=${currentPage}&limit=4`
		filter += `&sortBy=${sortType.sortProperty}&order=${sortType.order}`
		if (categoryId) filter += `&category=${categoryId}`
		if (searchValue) filter += `&title=${searchValue}`

		axios
			.get(
				`https://62c6ff0674e1381c0a6edc07.mockapi.io/pizzas${filter}`,
			)
			.then((res) => {
				setPizzas(res.data)
				setIsLoading(false)
			})
	}

	// URL
	const navigate = useNavigate()

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

	// --- --- --- --- --- --- --- ---

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

	React.useEffect(() => {
		window.scrollTo(0, 0)

		if (!isUrlSearch.current) {
			fetchPizzas()
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

	const pizzaList = pizzas.map((obj) => (
		<li key={obj.id} className={styles.pizzas__item}>
			<PizzaCard {...obj} />
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

			<ul className={styles.pizzas}>
				{isLoading ? skeletons : pizzaList}
			</ul>

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
