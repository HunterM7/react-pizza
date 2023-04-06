import React from 'react'

import { minusIcon, plusIcon } from '../../assets/icons'

// Styles
import styles from './Button.module.scss'

type ButtonProps = {
  title?: string
  icon: string
  count?: number
  func: () => void
  round?: boolean
  isDisabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
  title,
  icon,
  count = 0,
  func,
  round = false,
  isDisabled = false,
}) => {
  const className = `${styles.wrapper}${round ? styles['wrapper--round'] : ''}
${icon === 'remove' ? styles['wrapper--remove'] : ''}`

  return (
    <button className={className} onClick={func} disabled={isDisabled}>
      {icon && (
        <div className={styles.icon}>
          {(icon === 'plus' || icon === 'remove') && plusIcon}
          {icon === 'minus' && minusIcon}
        </div>
      )}
      {title && <span className={styles.title}>{title}</span>}
      {count > 0 && <span className={styles.count}>{count}</span>}
    </button>
  )
}

export default Button
