import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

const DirectionsIllustration = (props: React.SVGProps<SVGSVGElement>) => {
	return (
		<Svg
			{...props}
			width={props.width}
			height={props.height}
			viewBox="0 0 940 1020"
			fill="none"
		>
			<Path fill="#1D1D1D" d="M456 27.901h80V1005h-80z" />
			<Path fill="#1D1D1D" d="M436 5h120v45.801H436z" />
			<Path
				d="M437.5 259.5h421.261l60.41 58-60.41 58H437.5v-116z"
				fill="#FF922E"
				stroke="#FCFCFC"
				strokeWidth={15}
			/>
			<Path
				d="M437.5 581.5h290.932l42.286 58-42.286 58H437.5v-116zM552.5 214.5H87.856l-66.45-58 66.45-58H552.5v116z"
				fill="#004A8E"
				stroke="#FCFCFC"
				strokeWidth={15}
			/>
			<Path
				d="M552.5 536.5H218.09l-48.328-58 48.328-58H552.5v116z"
				fill="#002D56"
				stroke="#FCFCFC"
				strokeWidth={15}
			/>
		</Svg>
	);
};

DirectionsIllustration.defaultProps = {
	height: 500,
	width: 460
};

export default DirectionsIllustration;
