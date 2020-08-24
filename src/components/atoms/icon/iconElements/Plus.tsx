import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

import { IconProps } from './../types';

const PlusIcon = (props: IconProps) => {
	return (
		<Svg
			width={props.size}
			height={props.size}
			viewBox="0 0 48 48"
			fill={props.color}
		>
			<Path d="M6 23.182a3.273 3.273 0 013.273-3.273h29.454A3.273 3.273 0 0142 23.182v1.636a3.273 3.273 0 01-3.273 3.273H9.273A3.273 3.273 0 016 24.818v-1.636z" />
			<Path d="M24.818 6a3.273 3.273 0 013.273 3.273v29.454A3.273 3.273 0 0124.818 42h-1.636a3.273 3.273 0 01-3.273-3.273V9.273A3.273 3.273 0 0123.182 6h1.636z" />
		</Svg>
	);
};

PlusIcon.defaultProps = {
	size: 25,
	color: '#000000'
};

export default PlusIcon;
