import React from 'react'

// Files
import { loadingPizza } from 'assets/icons'

// Styles
import styles from './LoadingPage.module.scss'

const LoadingPage: React.FC = () => {
  return <div className={styles.wrapper}>{loadingPizza}</div>
}

export default LoadingPage
