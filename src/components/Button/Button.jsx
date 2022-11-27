import React from 'react'
import { minusIcon, plusIcon } from '../../assets/icons'

import styles from './Button.module.scss'

const Button = ({ title, icon, count, func, round }) => {
	return (
		<button
			className={`
			${styles.wrapper}
			${round ? styles['wrapper--round'] : ''}
			${icon === 'remove' ? styles['wrapper--remove'] : ''}
		`}
			onClick={func}
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
