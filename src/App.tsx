import React from 'react'
import { Route, Routes } from 'react-router-dom'

// Files
import './scss/app.scss'

// Components
import { Home, NotFound } from './pages'

import MainLayout from './layouts/MainLayout/MainLayout'

// Dynamic imports
const Cart = React.lazy(
	() =>
		import(
			/* webpackChunkName: "Cart"*/ './pages/Cart/Cart'
		),
)
const PizzaPage = React.lazy(
	() =>
		import(
			/* webpackChunkName: "PizzaPage"*/ './pages/PizzaPage/PizzaPage'
		),
)

function App() {
	return (
		<React.Suspense fallback={<div>Пицца загружается</div>}>
			<Routes>
				<Route path='/' element={<MainLayout />}>
					<Route path='' element={<Home />} />
					<Route path='cart' element={<Cart />} />
					<Route path='pizza-:id' element={<PizzaPage />} />
					<Route path='*' element={<NotFound />} />
				</Route>
			</Routes>
		</React.Suspense>
	)
}

export default App
