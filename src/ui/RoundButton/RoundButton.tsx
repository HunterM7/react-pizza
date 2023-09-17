import React, { MouseEventHandler } from 'react'
import cn from 'classnames'

// Assets
import { minusIcon, plusIcon } from 'assets'

// Styles
import styles from './RoundButton.module.scss'

export interface IRoundButtonProps {
  type: 'plus' | 'minus' | 'remove'
  onClick: MouseEventHandler<HTMLButtonElement>
  disabled?: boolean
}

export const RoundButton: React.FC<IRoundButtonProps> = ({
  type,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      className={cn(
        styles.wrapper,
        type === 'remove' && styles['wrapper--remove'],
      )}
      onClick={onClick}
      disabled={disabled}
    >
      <div className={styles.icon}>
        {type === 'plus' && plusIcon}
        {type === 'minus' && minusIcon}
        {type === 'remove' && plusIcon}
      </div>
    </button>
  )
}
