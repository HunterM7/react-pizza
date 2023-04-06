import React from 'react'
import { Outlet } from 'react-router-dom'

// Components
import { Header } from 'components'

// Styles
import styles from './MainLayout.module.scss'

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
