import React from 'react'

import styles from './Header.module.scss'

import Search from '../Search/Search'
import CartButton from './CartButton/CartButton'
import Logo from './Logo/Logo'

const Header = () => {
	return (
		<header className={styles.header}>
			<div
				className={`container ${styles.header__container}`}
			>
				<Logo />
				<Search />
				<CartButton />
			</div>
		</header>
	)
}

export default Header
