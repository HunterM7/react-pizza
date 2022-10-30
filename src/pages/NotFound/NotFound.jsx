import React from 'react'

import styles from './NotFound.module.scss'

const NotFound = () => {
	return (
		<div className={styles.root}>
			<span className={styles.root__emoji}>😕</span>
			<h1 className={styles.root__title}>
				Ничего не найдено
			</h1>
			<p className={styles.desc}>
				Такой странички не существует...
			</p>
		</div>
	)
}

export default NotFound
