import React from 'react'

import styles from './Button.module.scss'
import { minusIcon, plusIcon } from '../../assets/icons'

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
	return (
		<button
			className={`
			${styles.wrapper}
			${round ? styles['wrapper--round'] : ''}
			${icon === 'remove' ? styles['wrapper--remove'] : ''}
		`}
			onClick={func}
			disabled={isDisabled}
		>
			{icon && (
				<div className={styles.icon}>
					{(icon === 'plus' || icon === 'remove') &&
						plusIcon}
					{icon === 'minus' && minusIcon}
				</div>
			)}
			{title && (
				<span className={styles.title}>{title}</span>
			)}
			{count > 0 && (
				<span className={styles.count}>{count}</span>
			)}
		</button>
	)
}

export default Button
