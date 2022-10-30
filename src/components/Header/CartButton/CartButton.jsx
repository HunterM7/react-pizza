import React from 'react'
import { Link } from 'react-router-dom'

import styles from './CartButton.module.scss'
import { cartIcon } from '../../../assets/icons'

const CartButton = () => {
	return (
		<Link to='/cart' className={styles.wrapper}>
			<span className={styles.price}>520 ₽</span>
			<div className={styles.rightside}>
				{cartIcon}
				<span className={styles.count}>3</span>
			</div>
		</Link>
	)
}

export default CartButton
