import React from 'react'
import { Link } from 'react-router-dom'

// Files
import styles from './CartButton.module.scss'
import { cartIcon } from '../../../assets/icons'

// Redux
import { useSelector } from 'react-redux'
import { selectCart } from '../../../redux/cart/selectors'

export const CartButton: React.FC = () => {
	const { totalPrice, totalCount } = useSelector(selectCart)

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
