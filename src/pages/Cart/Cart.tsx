import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

// Redux
import { useAppDispatch } from 'redux/store'
import { CartItemType } from 'redux/cart/types'
import { clearItems } from 'redux/cart/slice'
import { selectCart } from 'redux/cart/selectors'

// Assets
import { arrowIcon, binIcon, cartIcon } from 'assets'

// Styles
import styles from './Cart.module.scss'

// Components
import CartItem from './CartItem/CartItem'
import CartEmpty from './CartEmpty/CartEmpty'

const Cart: React.FC = () => {
  const dispatch = useAppDispatch()
  const { items, totalPrice, totalCount } = useSelector(selectCart)

  const itemsList = items.map((obj: CartItemType) => (
    <li key={obj.id} className={styles.cartItem}>
      <CartItem {...obj} />
    </li>
  ))

  // Clear cart
  const onClickClear = () => {
    if (window.confirm('Вы уверены, что хотите очистить корзину?')) {
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
        <button onClick={onClickClear} className={styles.allClearBtn}>
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
            to="/"
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
