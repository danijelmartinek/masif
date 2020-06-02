import * as React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import styled, { withTheme } from 'styled-components';

import Svg, { Path } from 'react-native-svg';

import { SelectedTheme } from '/styles/types';

type PropsWithTheme = {
	theme: SelectedTheme;
};

const MtGraph = (props: PropsWithTheme) => {
	const points: MtGraphPointType[] = [
		[0, 0, 0.11],
		[25, 48.56, 0.08],
		[50, 83, 0.025],
		[62.5, 87.88, 0.14],
		[75, 91.8, 0.12],
		[100, 103, 0.025],
		[112.5, 105.08, 0.1],
		[118.75, 108.39, 0.13],
		[121.88, 108.53, 0.07],
		[125, 111.5, 0.08],
		[150, 128, 0.025],
		[175, 174, 0.11],
		[200, 220, 0.025],
		[225, 184.72, 0.13],
		[250, 178, 0.025],
		[262.5, 163.24, 0.15],
		[275, 157.07, 0.09],
		[300, 152, 0.025],
		[325, 228.32, 0.11],
		[331.25, 236.1, 0.06],
		[337.5, 238.11, 0.07],
		[350, 258, 0.025],
		[400, 258, 0.025],
		[425, 266.71, 0.08],
		[450, 271, 0.025],
		[475, 274.13, 0.12],
		[481.25, 284.95, 0.08],
		[487.5, 288.56, 0.14],
		[500, 296, 0.025],
		[506.25, 296.75, 0.1],
		[512.5, 297.04, 0.12],
		[525, 299.72, 0.08],
		[537.5, 307.63, 0.12],
		[543.75, 316.6, 0.06],
        [550, 320, 0],
        [550, 0, 0]
	];

	type MtGraphPointType = {
		0: number;
		1: number;
		2: number;
	};

	type SvgPointType = {
		0: number;
		1: number;
	};

	type SvgLineSegmentType = {
		length: number;
		angle: number;
    };
    
    const getMaxPoints = (points) => {
        let Xaxis = points.map(p => p[0])
        let Yaxis = points.map(p => p[1])
        
        return {
            x: Math.max.apply(null, Xaxis),
            y: Math.max.apply(null, Yaxis)
        }
    }
    let dimensions = getMaxPoints(points)

	const line = (
		pointA: MtGraphPointType,
		pointB: MtGraphPointType
	): SvgLineSegmentType => {
		const lengthX: number = pointB[0] - pointA[0];
		const lengthY: number = pointB[1] - pointA[1];

		return {
			length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
			angle: Math.atan2(lengthY, lengthX)
		};
	};

	const controlPoint = (
		current: MtGraphPointType,
		previous: MtGraphPointType | undefined,
		next: MtGraphPointType | undefined,
		reverse: boolean,
		smoothing: number = 0
	): SvgPointType => {
		// When 'current' is the first or last point of the array
		// 'previous' or 'next' don't exist.
		// Replace with 'current'
		const p: MtGraphPointType = previous || current;
		const n: MtGraphPointType = next || current;

		// Properties of the opposed-line
		const o: SvgLineSegmentType = line(p, n);

		// If is end-control-point, add PI to the angle to go backward
		const angle: number = o.angle + (reverse ? Math.PI : 0);
		const length: number = o.length * smoothing;

		// The control point position is relative to the current point
		const x: number = current[0] + Math.cos(angle) * length;
		const y: number = current[1] + Math.sin(angle) * length;
		return [x, y];
	};

	const bezierCommand = (
		point: MtGraphPointType,
		i: number,
		a: MtGraphPointType[],
		smoothing: number
	): string => {
		let roundThreeDec = (num: number): number =>
			Math.round(num * 1000) / 1000;

		// start control point
		const cps: SvgPointType = controlPoint(
			a[i - 1],
			a[i - 2],
			point,
			false,
			smoothing
		);

		// end control point
		const cpe: SvgPointType = controlPoint(
			point,
			a[i - 1],
			a[i + 1],
			true,
			smoothing
		);

		return `C ${roundThreeDec(cps[0])},${roundThreeDec(
			cps[1]
		)} ${roundThreeDec(cpe[0])},${roundThreeDec(cpe[1])} ${roundThreeDec(
			point[0]
		)},${roundThreeDec(point[1])}`;
	};

	type SvgCommandFunction = typeof bezierCommand;

	const svgPath = (
		points: MtGraphPointType[],
		command: SvgCommandFunction
	) => {
		// build the d attributes by looping over the points
		const d: string = points.reduce(
			(
				acc: string | undefined,
				point: MtGraphPointType,
				i: number,
				a: MtGraphPointType[]
			) =>
				i === 0
					? `M ${point[0]},${point[1]}`
					: `${acc} ${command(point, i, a, point[2])}`,
			''
		);
		return <Path d={`${d} Z`} fill="red" />;
    };
    
    const flipYpoints = (maxY, points) => {
        // substracting max height value (graph height) with Y for every point
        return points.map(p => [p[0], maxY - p[1], p[2]]);
    }

	return (
		<View
			style={[
				StyleSheet.absoluteFill,
				{ alignItems: 'flex-start' }
			]}
		>
			<Svg height="350" width="200%" preserveAspectRatio="none" viewBox={`0 -25 550 350`}>
				{svgPath(flipYpoints(320, points), bezierCommand)}
			</Svg>
		</View>
	);
};

export default withTheme(MtGraph);
