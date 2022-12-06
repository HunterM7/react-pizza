import { Route, Routes } from 'react-router-dom'

import './scss/app.scss'

import Home from './pages/Home/Home'
import NotFound from './pages/NotFound/NotFound'
import Cart from './pages/Cart/Cart'
import PizzaPage from './pages/PizzaPage/PizzaPage'
import MainLayout from './layouts/MainLayout/MainLayout'

function App() {
	return (
		<Routes>
			<Route path='/' element={<MainLayout />}>
				<Route path='' element={<Home />} />
				<Route path='cart' element={<Cart />} />
				<Route path='pizza-:id' element={<PizzaPage />} />
				<Route path='*' element={<NotFound />} />
			</Route>
		</Routes>
	)
}

export default App
