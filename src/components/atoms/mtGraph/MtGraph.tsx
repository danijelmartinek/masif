import * as React from 'react';
import { View } from 'react-native';

import Svg, { Path } from 'react-native-svg';

import { MtGraphPointType } from './types';
import generateMtGraph, { getMaxPoints } from './generate';

type PropsWithTheme = {
	color: string;
	height: number | string;
	width: number | string;
	points: MtGraphPointType[];
};

const MtGraph = (props: PropsWithTheme) => {
	const maxAxes = getMaxPoints(props.points);
	const closedPoints: MtGraphPointType[] = [
		...props.points,
		[// to finish graph to end, +25 because 25 start offset
			props.points[props.points.length - 1][0] + 25,
			props.points[props.points.length - 1][1]
		],
		[maxAxes.x + 25, -maxAxes.y],
		[0, -maxAxes.y]
    ];

	return (
		<View>
			<Svg
				height={props.height}
				width={props.width}
				preserveAspectRatio="none"
				viewBox={`25 -25 ${maxAxes.x} ${maxAxes.y + 25}`}
			>
				<Path
					d={generateMtGraph(closedPoints, true)}
					fill={props.color}
				></Path>
			</Svg>
		</View>
	);
};

export default MtGraph;
