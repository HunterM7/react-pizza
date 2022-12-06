import React from 'react'
import { useLocation } from 'react-router-dom'

import styles from './Header.module.scss'

import Search from '../Search/Search'
import CartButton from './CartButton/CartButton'
import Logo from './Logo/Logo'

const Header: React.FC = () => {
	const location: string = useLocation().pathname

	return (
		<header className={styles.header}>
			<div
				className={`container ${styles.header__container}`}
			>
				<Logo />
				{location !== '/cart' && (
					<>
						<Search />
						<CartButton />
					</>
				)}
			</div>
		</header>
	)
}

export default Header
