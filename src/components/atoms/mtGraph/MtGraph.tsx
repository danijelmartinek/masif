// Copyright © 2020, Danijel Martinek. All rights reserved. 
// This project was created by Danijel Martinek (danijel@martinek.xyz) 

import React, { useState, useEffect } from 'react';
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

    const [propPoints, setPropPoints] = useState<MtGraphPointType[]>(props.points)

    const [maxAxes, setMaxAxes] = useState(getMaxPoints(props.points));

    const getClosedPoints = (): MtGraphPointType[] => {
        return [
            ...propPoints,
            [// to finish graph to end, +25 because 25 start offset
                propPoints[propPoints.length - 1][0] + 25,
                propPoints[propPoints.length - 1][1]
            ],
            [maxAxes.x + 25, -maxAxes.y],
            [0, -maxAxes.y]
        ];
    }

    const [closedPoints, setClosedPoints] = useState<MtGraphPointType[]>(getClosedPoints());
    
    useEffect(() => {
        if(JSON.stringify(props.points) !== JSON.stringify(propPoints)) {
            setPropPoints(props.points);
        }
    }, [props.points])

    useEffect(() => {
        setMaxAxes(getMaxPoints(props.points));
        setClosedPoints(getClosedPoints());
    }, [propPoints])

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
