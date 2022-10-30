import React from 'react'

import styles from './Categories.module.scss'

const Categories = ({ categoryId, changeCategory }) => {
	const categoryItems = [
		'Все',
		'Мясные',
		'Вегетерианские',
		'Гриль',
		'Острые',
	]

	const CategoriesList = categoryItems.map(
		(item, index) => {
			return (
				<li
					key={index}
					onClick={() => changeCategory(index)}
					className={`
						${styles.categories__item}
						${index === categoryId ? styles.active : ''}
					`}
				>
					{item}
				</li>
			)
		},
	)

	return (
		<ul className={styles.categories}>{CategoriesList}</ul>
	)
}

export default Categories
