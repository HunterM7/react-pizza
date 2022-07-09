import React from 'react'

import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaCard from '../components/PizzaCard/PizzaCard'
import PizzaCardSkeleton from '../components/PizzaCard/PizzaCardLoader'

const Home = () => {
	const [pizzas, setPizzas] = React.useState([])
	const [isLoading, setIsLoading] = React.useState(true)
	const [activeCategory, setActiveCategory] = React.useState(0)
	const [selectedSort, setSelectedSort] = React.useState({
		name: 'популярности',
		sortProperty: 'rating',
		order: 'desc',
	})

	React.useEffect(() => {
		setIsLoading(true)

		let filter = ''
		filter += `?sortBy=${selectedSort.sortProperty}&order=${selectedSort.order}`
		if (activeCategory) filter += `&category=${activeCategory}`

		fetch(
			`https://62c6ff0674e1381c0a6edc07.mockapi.io/pizzas${filter}`,
		)
			.then((res) => {
				return res.json()
			})
			.then((json) => {
				setPizzas(json)
				setIsLoading(false)
			})
		window.scrollTo(0, 0)
	}, [activeCategory, selectedSort])

	return (
		<div className='container'>
			<div className='content__top'>
				<Categories
					activeCategory={activeCategory}
					setActiveCategory={setActiveCategory}
				/>
				<Sort
					selectedSort={selectedSort}
					setSelectedSort={setSelectedSort}
				/>
			</div>
			<h2 className='content__title'>Все пиццы</h2>
			<ul className='content__list'>
				{isLoading
					? [...new Array(8)].map((_, i) => {
							return (
								<li key={i} className='content__items'>
									<PizzaCardSkeleton />
								</li>
							)
					  })
					: pizzas.map((obj) => {
							return (
								<li key={obj.id} className='content__items'>
									<PizzaCard {...obj} />
								</li>
							)
					  })}
			</ul>
		</div>
	)
}

export default Home
