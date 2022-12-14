import React from 'react'
import { Outlet } from 'react-router-dom'

// Files
import styles from './MainLayout.module.scss'

// Components
import { Header } from '../../components'

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
