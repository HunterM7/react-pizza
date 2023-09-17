import React, { MouseEventHandler } from 'react'
import cn from 'classnames'

// Assets
import { minusIcon, plusIcon } from 'assets/icons'

// Styles
import styles from './Button.module.scss'

export interface IButtonProps {
  title?: string
  icon: 'plus' | 'minus' | 'remove'
  count?: number
  onClick: MouseEventHandler<HTMLButtonElement>
  round?: boolean
  disabled?: boolean
}

export const Button: React.FC<IButtonProps> = ({
  title,
  icon,
  count = 0,
  onClick,
  round = false,
  disabled = false,
}) => {
  return (
    <button
      className={cn(
        styles.wrapper,
        round && styles['wrapper--round'],
        icon === 'remove' && styles['wrapper--remove'],
      )}
      onClick={onClick}
      disabled={disabled}
    >
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
