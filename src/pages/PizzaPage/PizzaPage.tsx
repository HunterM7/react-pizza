import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { PizzaItem } from '../../redux/pizzas/types'
import { getPizzaById } from '../../redux/pizzas/asyncActions'

import { LoadingPage } from '../'

const PizzaPage: React.FC = () => {
	const { id } = useParams()
	const [pizza, setPizza] = React.useState<PizzaItem>()

	const navigate = useNavigate()

	React.useEffect(() => {
		fetchPizzas()

		async function fetchPizzas() {
			try {
				if (id) {
					const data = await getPizzaById(id)

					setPizza(data)
				}
			} catch (error) {
				alert('Такой пиццы не существует!')
				navigate('/')
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	if (!pizza) {
		return <LoadingPage />
	}

	return (
		<div className='container'>
			<img src={pizza.imageUrl} alt='Пицца' />
			<h2>{pizza.title}</h2>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing
				elit. Tempore tempora incidunt aut similique? Est
				amet facilis dolor blanditiis quisquam repellendus!
			</p>
			<h4>{pizza.price} р</h4>
		</div>
	)
}

export default PizzaPage
