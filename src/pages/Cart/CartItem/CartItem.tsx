import React from 'react'

// Redux
import { useAppDispatch } from 'redux/store'
import { CartItemType } from 'redux/cart/types'
import { minusItem, plusItem, removeItem } from 'redux/cart/slice'

// Components 'n UI
import { RoundButton } from 'ui'
import { Button } from 'components'

// Styles
import styles from './CartItem.module.scss'

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
        <img className={styles.info__img} src={imageUrl} alt="Pizza" />

        <h3 className={styles.info__title}>{title}</h3>
        <p className={styles.info__desc}>
          {type} тесто, {size} см.
        </p>
      </div>

      <div className={styles.controls}>
        <div className={styles.controls__count}>
          <RoundButton
            type="minus"
            onClick={onClickMinus}
            disabled={count <= 1}
          />

          <span>{count}</span>

          <Button
            disabled={count >= 10}
            icon="plus"
            round
            onClick={onClickPlus}
          />
        </div>

        <span className={styles.controls__price}>{price * count} ₽</span>

        <Button icon="remove" round onClick={onClickRemove} />
      </div>
    </div>
  )
}

export default CartItem
