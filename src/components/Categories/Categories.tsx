import React from 'react'

import styles from './Categories.module.scss'

type CategoriesProps = {
	categoryId: number
	onChangeCategory: (id: number) => void
}

const categoryItems: string[] = [
	'Все',
	'Мясные',
	'Вегетерианские',
	'Гриль',
	'Острые',
]

const Categories: React.FC<CategoriesProps> = ({
	categoryId,
	onChangeCategory,
}) => {
	const CategoriesList = categoryItems.map(
		(item, index) => {
			return (
				<li
					key={index}
					onClick={() => onChangeCategory(index)}
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
