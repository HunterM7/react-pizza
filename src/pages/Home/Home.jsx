import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

import styles from './Home.module.scss'
import { AppContext } from '../../App'

import {
	setCategoryId,
	setCurrentPage,
} from '../../redux/slices/filterSlice'

import Categories from '../../components/Categories/Categories'
import Sort from '../../components/Sort/Sort'
import PizzaCard from '../../components/PizzaCard/PizzaCard'
import PizzaCardSkeleton from '../../components/PizzaCard/PizzaCardLoader'
import Pagination from '../../components/Pagination/Pagination'

const Home = () => {
	const dispatch = useDispatch()
	const {
		categoryId,
		sort: sortType,
		currentPage,
	} = useSelector((state) => state.filter)

	const onChangeCategory = (id) => {
		dispatch(setCategoryId(id))
	}

	const onChangePage = (num) => {
		dispatch(setCurrentPage(num))
	}

	const [pizzas, setPizzas] = React.useState([])
	const [isLoading, setIsLoading] = React.useState(true)

	const { searchValue } = React.useContext(AppContext)

	React.useEffect(() => {
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

		window.scrollTo(0, 0)
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
					changeCategory={onChangeCategory}
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
