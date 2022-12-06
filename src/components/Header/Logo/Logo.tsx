import React from 'react'
import { Link } from 'react-router-dom'

import styles from './Logo.module.scss'
import { logo } from '../../../assets/icons'

const Logo: React.FC = () => {
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

export default Logo
