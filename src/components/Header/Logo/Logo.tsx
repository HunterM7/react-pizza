import React from 'react'
import { Link } from 'react-router-dom'

// Files
import styles from './Logo.module.scss'
import { logo } from '../../../assets/icons'

export const Logo: React.FC = () => {
	return (
		<Link to={'/'} className={styles.logo}>
			{logo}
			<p className={styles.title}>React Pizza</p>
			<p className={styles.subtitle}>
				самая вкусная пицца во вселенной
			</p>
		</Link>
	)
}
