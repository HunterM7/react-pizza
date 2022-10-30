import React from 'react'

import styles from './PizzaCard.module.scss'
import { plusIcon } from '../../assets/icons'

import Button from '../Button/Button'

const PizzaCard = ({
	title,
	price,
	imageUrl,
	sizes,
	types,
}) => {
	const typeNames = ['тонкое', 'традиционное']

	const [activeType, setActiveType] = React.useState(0)
	const [activeSize, setActiveSize] = React.useState(0)

	return (
		<div className={styles.wrapper}>
			<img
				className={styles.image}
				src={imageUrl}
				alt='Pizza preview'
			/>

			<h4 className={styles.title}>{title}</h4>

			<div className={styles.selector}>
				<ul className={styles.selector__block}>
					{types.map((typeId, index) => {
						return (
							<li
								key={typeId}
								className={`
									${styles.selector__item}
									${activeType === index ? styles.active : ''}
								`}
								onClick={() => setActiveType(index)}
							>
								{typeNames[typeId]}
							</li>
						)
					})}
				</ul>
				<ul className={styles.selector__block}>
					{sizes.map((size, index) => {
						return (
							<li
								key={size}
								className={`
									${styles.selector__item}
									${activeSize === index ? styles.active : ''}
								`}
								onClick={() => setActiveSize(index)}
							>
								{size} см.
							</li>
						)
					})}
				</ul>
			</div>

			<div className={styles.bottom}>
				<p className={styles.price}>от {price} ₽</p>
				<Button
					title='Добавить'
					icon={plusIcon}
					count={0}
					func={() => console.log('click')}
				/>
			</div>
		</div>
	)
}

export default PizzaCard
