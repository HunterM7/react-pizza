import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

// Redux
import { CartItemType } from '../../redux/cart/types'
import { addItem } from '../../redux/cart/slice'
import { selectCartItemById } from '../../redux/cart/selectors'

// Components
import { Button } from '../../components'
import { useAppDispatch } from '../../redux/store'

// Styles
import styles from './PizzaCard.module.scss'
import PizzaSelector from '../PizzaSelector/PizzaSelector'

type PizzaCardProps = {
  id: number
  title: string
  price: number
  imageUrl: string
  types: number[]
  sizes: number[]
}

const PizzaCard: React.FC<PizzaCardProps> = ({
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
      <NavLink to={`/pizza/${id}`}>
        <img className={styles.image} src={imageUrl} alt="Pizza preview" />

        <h4 className={styles.title}>{title}</h4>
      </NavLink>

      <PizzaSelector
        activeSize={activeSize}
        activeType={activeType}
        setActiveSize={setActiveSize}
        setActiveType={setActiveType}
        sizes={sizes}
        types={types}
      />

      <div className={styles.bottom}>
        <p className={styles.price}>от {price} ₽</p>
        <Button
          title="Добавить"
          icon="plus"
          count={addedCount}
          func={onClickAdd}
        />
      </div>
    </div>
  )
}

export default PizzaCard
