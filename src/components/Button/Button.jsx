import React from 'react'

import styles from './Button.module.scss'

const Button = ({ title, icon, count, func }) => {
	return (
		<button className={styles.wrapper} onClick={func}>
			{icon && <div className={styles.icon}>{icon}</div>}
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
