import React from 'react';
import './scss/app.scss';

import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaCard from './components/PizzaCard/PizzaCard';
import PizzaCardSkeleton from './components/PizzaCard/PizzaCardLoader';

function App() {
	const [pizzas, setPizzas] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);

	React.useEffect(() => {
		fetch('https://62c6ff0674e1381c0a6edc07.mockapi.io/pizzas')
			.then((res) => {
				return res.json();
			})
			.then((json) => {
				setPizzas(json);
				setIsLoading(false);
			});
	}, []);

	return (
		<div className='wrapper'>
			<Header />

			<div className='content'>
				<div className='container'>
					<div className='content__top'>
						<Categories />
						<Sort />
					</div>
					<h2 className='content__title'>Все пиццы</h2>
					<ul className='content__list'>
						{isLoading
							? [...new Array(8)].map((_, i) => {
									return (
										<li key={i} className='content__items'>
											<PizzaCardSkeleton />
										</li>
									);
							  })
							: pizzas.map((obj) => {
									return (
										<li key={obj.id} className='content__items'>
											<PizzaCard {...obj} />
										</li>
									);
							  })}
					</ul>
				</div>
			</div>
		</div>
	);
}

export default App;
