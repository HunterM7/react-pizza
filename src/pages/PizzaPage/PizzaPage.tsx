import React from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { PizzaItem } from '../../redux/pizzas/types'

const PizzaPage: React.FC = () => {
	const { id } = useParams()
	const [pizza, setPizza] = React.useState<PizzaItem>()

	const navigate = useNavigate()

	React.useEffect(() => {
		fetchPizzas()

		async function fetchPizzas() {
			try {
				const { data } = await axios.get(
					`https://62c6ff0674e1381c0a6edc07.mockapi.io/pizzas/${id}`,
				)

				setPizza(data)
			} catch (error) {
				alert('Такой пиццы не существует!')
				navigate('/')
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	if (!pizza) {
		return <h2>Загрузка...</h2>
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
