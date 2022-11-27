import React from 'react'
import { Link } from 'react-router-dom'

import styles from './Cart.module.scss'

import Button from '../../components/Button/Button'

// SVGs
import {
	arrowIcon,
	binIcon,
	cartIcon,
} from '../../assets/icons.js'

const Cart = () => {
	return (
		<div className={`container ${styles.container}`}>
			<div className={styles.header}>
				<h2 className={styles.header__title}>
					{cartIcon}
					Корзина
				</h2>
				<button className={styles.allClearBtn}>
					{binIcon}
					Очистить корзину
				</button>
			</div>

			<ul className={styles.cartList}>
				<li className={styles.cartItem}>
					<div className={styles.cartItem__info}>
						<img
							className={styles.cartItem__img}
							src='https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg'
							alt='Pizza'
						/>

						<h3 className={styles.cartItem__title}>
							Сырный цыпленок
						</h3>
						<p className={styles.cartItem__desc}>
							тонкое тесто, 26 см.
						</p>
					</div>

					<div className={styles.cartItem__controls}>
						<div className={styles.cartItem__count}>
							<Button icon='minus' round />
							<span>2</span>
							<Button icon='plus' round />
						</div>

						<span className={styles.cartItem__price}>
							770 ₽
						</span>

						<Button icon='remove' round />
					</div>
				</li>

				<li className={styles.cartItem}>
					<div className={styles.cartItem__info}>
						<img
							className={styles.cartItem__img}
							src='https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg'
							alt='Pizza'
						/>

						<h3 className={styles.cartItem__title}>
							Сырный цыпленок
						</h3>
						<p className={styles.cartItem__desc}>
							тонкое тесто, 26 см.
						</p>
					</div>

					<div className={styles.cartItem__controls}>
						<div className={styles.cartItem__count}>
							<Button icon='minus' round />
							<span>2</span>
							<Button icon='plus' round />
						</div>

						<span className={styles.cartItem__price}>
							770 ₽
						</span>

						<Button icon='remove' round />
					</div>
				</li>

				<li className={styles.cartItem}>
					<div className={styles.cartItem__info}>
						<img
							className={styles.cartItem__img}
							src='https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg'
							alt='Pizza'
						/>

						<h3 className={styles.cartItem__title}>
							Сырный цыпленок
						</h3>
						<p className={styles.cartItem__desc}>
							тонкое тесто, 26 см.
						</p>
					</div>

					<div className={styles.cartItem__controls}>
						<div className={styles.cartItem__count}>
							<Button icon='minus' round />
							<span>2</span>
							<Button icon='plus' round />
						</div>

						<span className={styles.cartItem__price}>
							770 ₽
						</span>

						<Button icon='remove' round />
					</div>
				</li>
			</ul>

			<div className={styles.footer}>
				<div className={styles.footer__info}>
					<p className={styles.footer__text}>
						Всего пицц: <b>3 шт.</b>
					</p>
					<p className={styles.footer__text}>
						Сумма заказа: <b>900 ₽</b>
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
