import React from 'react'
import { Route, Routes } from 'react-router-dom'

import './scss/app.scss'

import Header from './components/Header/Header'
import Home from './pages/Home/Home'
import NotFound from './pages/NotFound/NotFound'
import Cart from './pages/Cart/Cart'

export const AppContext = React.createContext('')

function App() {
	const [searchValue, setSearchValue] = React.useState('')

	return (
		<div className='wrapper'>
			<AppContext.Provider
				value={{
					searchValue,
					setSearchValue,
				}}
			>
				<Header />

				<main className='main'>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/cart' element={<Cart />} />
						<Route path='*' element={<NotFound />} />
					</Routes>
				</main>
			</AppContext.Provider>
		</div>
	)
}

export default App
