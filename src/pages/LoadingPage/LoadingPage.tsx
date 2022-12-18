import React from 'react'

// Files
import styles from './LoadingPage.module.scss'
import { loadingPizza } from '../../assets/icons'

const LoadingPage: React.FC = () => {
	return (
		<div className={styles.wrapper}>{loadingPizza}</div>
	)
}

export default LoadingPage
