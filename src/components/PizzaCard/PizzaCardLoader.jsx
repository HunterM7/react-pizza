import React from 'react';
import ContentLoader from 'react-content-loader';

const PizzaCardSkeleton = (props) => (
	<ContentLoader
		speed={2}
		width={280}
		height={470}
		viewBox='0 0 280 470'
		backgroundColor='#f2f2f2'
		foregroundColor='#ecebeb'
		{...props}
	>
		<circle cx='140' cy='130' r='120' />
		<rect x='0' y='270' rx='8' ry='8' width='280' height='30' />
		<rect x='0' y='316' rx='10' ry='10' width='280' height='86' />
		<rect x='0' y='428' rx='8' ry='8' width='90' height='30' />
		<rect x='130' y='420' rx='20' ry='20' width='150' height='46' />
	</ContentLoader>
);

export default PizzaCardSkeleton;
