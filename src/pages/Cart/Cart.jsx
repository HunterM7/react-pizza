import React from 'react'
import { Link } from 'react-router-dom'

import styles from './Cart.module.scss'

// SVGs
import {
	binIcon,
	cartIcon,
	minusIcon,
	plusIcon,
	triangleIcon,
} from '../../assets/icons.js'

const Cart = () => {
	return (
		<div className={styles.cart}>
			<div
				className={`
					container
					${styles.cart__container}
				`}
			>
				<div className={styles.cart__top}>
					<h2 className={styles.content__title}>
						{cartIcon}
						Корзина
					</h2>
					<div className={styles.cart__clear}>
						{binIcon}

						<span>Очистить корзину</span>
					</div>
				</div>

				<div className={styles.content__items}>
					<div className={styles.cart__item}>
						<div className={styles['cart__item-img']}>
							<img
								className='pizza-block__image'
								src='https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg'
								alt='Pizza'
							/>
						</div>
						<div className={styles['cart__item-info']}>
							<h3>Сырный цыпленок</h3>
							<p>тонкое тесто, 26 см.</p>
						</div>
						<div className={styles['cart__item-count']}>
							<div
								className={`
									button button--outline button--circle 
									${styles['cart__item-count-minus']}
							`}
							>
								{minusIcon}
							</div>
							<b>2</b>
							<div
								className={`
								button button--outline button--circle 
								${styles['cart__item-count-plus']}
							`}
							>
								{plusIcon}
							</div>
						</div>
						<div className={styles['cart__item-price']}>
							<b>770 ₽</b>
						</div>
						<div className={styles['cart__item-remove']}>
							<div className='button button--outline button--circle'>
								{plusIcon}
							</div>
						</div>
					</div>
				</div>

				<div className={styles.cart__bottom}>
					<div className={styles['cart__bottom-details']}>
						<span>
							{' '}
							Всего пицц: <b>3 шт.</b>{' '}
						</span>
						<span>
							{' '}
							Сумма заказа: <b>900 ₽</b>{' '}
						</span>
					</div>
					<div className={styles['cart__bottom-buttons']}>
						<Link
							to='/'
							className='button button--outline button--add go-back-btn'
						>
							{triangleIcon}

							<span>Вернуться назад</span>
						</Link>
						<div className='button pay-btn'>
							<span>Оплатить сейчас</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Cart
