import React from 'react'
import { Link } from 'react-router-dom'

// Redux
import { useDispatch, useSelector } from 'react-redux'
import {
	clearItems,
	selectCart,
} from '../../redux/slices/cartSlice'

import styles from './Cart.module.scss'

import CartItem from './CartItem/CartItem'
import CartEmpty from './CartEmpty/CartEmpty'

// SVGs
import {
	arrowIcon,
	binIcon,
	cartIcon,
} from '../../assets/icons.js'

const Cart = () => {
	const dispatch = useDispatch()
	const { items, totalPrice, totalCount } =
		useSelector(selectCart)

	const itemsList = items.map((obj) => (
		<li key={obj.id} className={styles.cartItem}>
			<CartItem {...obj} />
		</li>
	))

	// Clear cart
	const onClickClear = () => {
		if (
			window.confirm(
				'Вы уверены, что хотите очистить корзину?',
			)
		) {
			dispatch(clearItems())
		}
	}

	if (!items.length) {
		return <CartEmpty />
	}

	return (
		<div className={`container ${styles.container}`}>
			<div className={styles.header}>
				<h2 className={styles.header__title}>
					{cartIcon}
					Корзина
				</h2>
				<button
					onClick={onClickClear}
					className={styles.allClearBtn}
				>
					{binIcon}
					Очистить корзину
				</button>
			</div>

			<ul className={styles.cartList}>{itemsList}</ul>

			<div className={styles.footer}>
				<div className={styles.footer__info}>
					<p className={styles.footer__text}>
						Всего пицц: <b>{totalCount} шт.</b>
					</p>
					<p className={styles.footer__text}>
						Сумма заказа: <b>{totalPrice} ₽</b>
					</p>
				</div>

				<div className={styles.footer__buttons}>
					<Link
						to='/'
						className={`
							${styles.button}
							${styles['button--back']}
						`}
					>
						{arrowIcon}
						Вернуться назад
					</Link>

					<button
						//  className='button pay-btn'
						className={`
							${styles.button}
							${styles['button--confirm']}
						`}
					>
						Оплатить сейчас
					</button>
				</div>
			</div>
		</div>
	)
}

export default Cart
