import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

// Redux
import { useAppDispatch } from 'redux/store'
import { CartItemType } from 'redux/cart/types'
import { addItem } from 'redux/cart/slice'
import { selectCartItemById } from 'redux/cart/selectors'

// Components
import { Button } from 'components'

// Styles
import styles from './PizzaCard.module.scss'

type PizzaCardProps = {
  id: number
  title: string
  price: number
  imageUrl: string
  types: number[]
  sizes: number[]
}

export const PizzaCard: React.FC<PizzaCardProps> = ({
  id,
  title,
  price,
  imageUrl,
  types,
  sizes,
}) => {
  const typeNames: string[] = ['тонкое', 'традиционное']

  const [activeType, setActiveType] = React.useState(0)
  const [activeSize, setActiveSize] = React.useState(0)

  const cartItem = useSelector(selectCartItemById(id))

  const addedCount = cartItem ? cartItem.count : 0

  const dispatch = useAppDispatch()

  const onClickAdd = () => {
    const item: CartItemType = {
      id,
      title,
      price,
      imageUrl,
      type: typeNames[activeType],
      size: sizes[activeSize],
      count: 0,
    }

    dispatch(addItem(item))
  }

  return (
    <div className={styles.wrapper}>
      <NavLink to={`\pizza-${id}`}>
        <img className={styles.image} src={imageUrl} alt="Pizza preview" />

        <h4 className={styles.title}>{title}</h4>
      </NavLink>

      <div className={styles.selector}>
        <ul className={styles.selector__block}>
          {types.map((typeId, index) => {
            return (
              <li
                key={typeId}
                className={`
									${styles.selector__item}
									${activeType === index ? styles.active : ''}
								`}
                onClick={() => setActiveType(index)}
              >
                {typeNames[typeId]}
              </li>
            )
          })}
        </ul>
        <ul className={styles.selector__block}>
          {sizes.map((size, index) => {
            return (
              <li
                key={size}
                className={`
									${styles.selector__item}
									${activeSize === index ? styles.active : ''}
								`}
                onClick={() => setActiveSize(index)}
              >
                {size} см.
              </li>
            )
          })}
        </ul>
      </div>

      <div className={styles.bottom}>
        <p className={styles.price}>от {price} ₽</p>
        <Button
          title="Добавить"
          icon="plus"
          count={addedCount}
          onClick={onClickAdd}
        />
      </div>
    </div>
  )
}
