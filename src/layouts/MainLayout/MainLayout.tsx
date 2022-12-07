import React from 'react'
import { Outlet } from 'react-router-dom'

import styles from './MainLayout.module.scss'

import Header from '../../components/Header/Header'

const MainLayout: React.FC = () => {
	return (
		<div className={styles.wrapper}>
			<Header />
			<main className={styles.main}>
				<Outlet />
			</main>
		</div>
	)
}

export default MainLayout
