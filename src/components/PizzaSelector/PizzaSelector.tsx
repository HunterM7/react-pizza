import React from 'react'

// Utils
import { typeNames } from 'utils/pizzaTypes'

// Styles
import styles from './PizzaSelector.module.scss'

interface IPizzaSelector {
  types: number[]
  activeType: number
  activeSize: number
  setActiveType: (index: number) => void
  sizes: number[]
  setActiveSize: (index: number) => void
}

const PizzaSelector: React.FC<IPizzaSelector> = ({
  types,
  activeType,
  activeSize,
  setActiveType,
  sizes,
  setActiveSize,
}) => {
  return (
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
  )
}

export default PizzaSelector
