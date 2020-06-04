import * as React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import styled, { withTheme } from 'styled-components';

import Svg, { Path } from 'react-native-svg';

import { SelectedTheme } from '/styles/types';
import { MtGraphPointType, SvgLineSegmentType, MaxAxesPoints } from './types';
import generateMtGraph, { getMaxPoints, generateSessionPoints } from './generate'

type PropsWithTheme = {
	theme: SelectedTheme;
};

const MtGraph = (props: PropsWithTheme) => {

    type sessionType = {
        path: {
            peak: MtGraphPointType
        }
    }

	let sessions: sessionType[] = [
        {
            path: {
                peak: [50, 83],
            }
        },
    
        {
            path: {
                peak: [100, 103],
            }
        },
    
        {
            path: {
                peak: [150, 128],
            }
        },
    
        {
            path: {
                peak: [200, 220],
            }
        },
    
        {
            path: {
                peak: [250, 178],
            }
        },
    
        {
            path: {
                peak: [300, 152],
            }
        },
    
        {
            path: {
                peak: [350, 258],
            }
        },
    
        {
            path: {
                peak: [400, 258],
            }
        },
    
        {
            path: {
                peak: [450, 271],
            }
        },
    
        {
            path: {
                peak: [500, 296],
            }
        },
    
        {
            path: {
                peak: [550, 320],
            }
        },
    ]

    let points: MtGraphPointType[] = [] 

    sessions.forEach((s, index) => {
        let p: MtGraphPointType[] = []

        if(index > 0) {
            p = generateSessionPoints(sessions[index - 1].path.peak, s.path.peak, {min: 0.05, max: 0.15}, {min: 2, max: 5});
            p.shift(); //removing duplicated points (point already included in previous log, added to generate midpoints)
        } else {
            p = generateSessionPoints([0, 0], s.path.peak, {min: 0.05, max: 0.15}, {min: 2, max: 5})
        }
    
        if(index === 0) {
            p[0][2] = 0; //remove bezier curve from first point 
        } else if(index === sessions.length - 1) {
            p[p.length - 1][2] = 0; //remove bezier curve from last point 
        } else {
            p[p.length - 1][2] = 0.025; //prevent too big bezier curve on main points
        }
    
        points = [...points, ...p];
    })

    const maxAxes = getMaxPoints(points);

    points = [...points, [maxAxes.x, -maxAxes.y], [0, -maxAxes.y]]
	


	return (
		<View style={[StyleSheet.absoluteFill, { alignItems: 'flex-start' }]}>
			<Svg
				height="350"
				width="366%"
				preserveAspectRatio="none"
				viewBox={`0 -25 ${maxAxes.x} ${maxAxes.y + 25}`}
			>
				<Path d={generateMtGraph(points, true)} fill="red"></Path>
			</Svg>
		</View>
	);
};

export default withTheme(MtGraph);
