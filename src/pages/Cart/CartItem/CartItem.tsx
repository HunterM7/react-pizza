import React from 'react'

// Redux
import { useAppDispatch } from '../../../redux/store'
import { CartItemType } from '../../../redux/cart/types'
import {
	minusItem,
	plusItem,
	removeItem,
} from '../../../redux/cart/slice'

// Files
import styles from './CartItem.module.scss'

// Components
import { Button } from '../../../components'

const CartItem: React.FC<CartItemType> = ({
	id,
	count,
	imageUrl,
	price,
	size,
	title,
	type,
}) => {
	const dispatch = useAppDispatch()

	const onClickPlus = () => {
		dispatch(plusItem(id))
	}

	const onClickMinus = () => {
		dispatch(minusItem(id))
	}

	const onClickRemove = () => {
		if (window.confirm('Are you sure?')) {
			dispatch(removeItem(id))
		}
	}

	return (
		<div className={styles.cartItem}>
			<div className={styles.info}>
				<img
					className={styles.info__img}
					src={imageUrl}
					alt='Pizza'
				/>

				<h3 className={styles.info__title}>{title}</h3>
				<p className={styles.info__desc}>
					{type} тесто, {size} см.
				</p>
			</div>

			<div className={styles.controls}>
				<div className={styles.controls__count}>
					<Button
						isDisabled={count <= 1}
						icon='minus'
						round
						func={onClickMinus}
					/>
					<span>{count}</span>
					<Button
						isDisabled={count >= 10}
						icon='plus'
						round
						func={onClickPlus}
					/>
				</div>

				<span className={styles.controls__price}>
					{price * count} ₽
				</span>

				<Button icon='remove' round func={onClickRemove} />
			</div>
		</div>
	)
}

export default CartItem
