import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import styles from './CartButton.module.scss'
import { cartIcon } from '../../../assets/icons'

const CartButton = () => {
	const { items, totalPrice, totalCount } = useSelector(
		(state) => state.cart,
	)

	return (
		<Link to='/cart' className={styles.wrapper}>
			<span className={styles.price}>{totalPrice} ₽</span>
			<div className={styles.rightside}>
				{cartIcon}
				<span className={styles.count}>{totalCount}</span>
			</div>
		</Link>
	)
}

export default CartButton
