import * as React from 'react';
import Svg, { Path, Text } from 'react-native-svg';

import { IconProps } from './../types';

const FlagIcon = (props: IconProps) => {
	return (
		<Svg {...props} width={props.size} height={props.size} viewBox="0 0 50 50" fill="none">
			<Path fill={props.flagColor} d="M45 0h5v50h-5zM0 0h45v25H0z" />
			<Text
				fill={props.textColor}
				fontSize="150%"
				fontWeight="bold"
				x="50%"
				y="38%"
				textAnchor="middle"
			>
				{props.text}
			</Text>
		</Svg>
	);
};

FlagIcon.defaultProps = {
    size: 25,
	flagColor: '#ffffff',
    textColor: '#000000',
    text: ''
};

export default FlagIcon;
