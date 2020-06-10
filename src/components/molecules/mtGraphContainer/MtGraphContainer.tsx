import React, { useRef } from 'react';
import {
	View,
	Button,
	StyleSheet,
	ScrollView,
	Text,
	NativeSyntheticEvent,
	NativeScrollEvent
} from 'react-native';
import styled, { withTheme } from 'styled-components';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from '/utils/dimensions';

import { SelectedTheme } from '/styles/types';

import MtGraph from '/components/atoms/mtGraph/';
import { generateSessionPoints } from '/components/atoms/mtGraph/generate';

import { MtGraphPointType } from '/components/atoms/mtGraph/types';

type PropsWithTheme = {
	theme: SelectedTheme;
};

type MtGraphOptionsType = {
	visibleSegmentNum: number;
	segmentWidth: number;
};

type SelectIndicatorTypes = {
	options: MtGraphOptionsType;
};

const MtGraphContainer = (props: PropsWithTheme) => {
	const fillWithInterval = (count: number, interval: number) => {
		return Array(count)
			.fill(interval)
			.map((item, index) => index * interval);
	};

	const OPTIONS: MtGraphOptionsType = {
		visibleSegmentNum: 1,
		segmentWidth: 50
	};

	const OFFSETS = fillWithInterval(
		Math.ceil(550 / OPTIONS.segmentWidth),
		wp(`${100 / OPTIONS.visibleSegmentNum}%`)
	);

	const _mtGraphScroll = useRef<ScrollView>(null);

	type sessionType = {
		path: {
			peak: MtGraphPointType;
		};
	};

	let sessions: sessionType[] = [
		{
			path: {
				peak: [50, 83]
			}
		},

		{
			path: {
				peak: [100, 103]
			}
		},

		{
			path: {
				peak: [150, 128]
			}
		},

		{
			path: {
				peak: [200, 220]
			}
		},

		{
			path: {
				peak: [250, 178]
			}
		},

		{
			path: {
				peak: [300, 152]
			}
		},

		{
			path: {
				peak: [350, 258]
			}
		},

		{
			path: {
				peak: [400, 258]
			}
		},

		{
			path: {
				peak: [450, 271]
			}
		},

		{
			path: {
				peak: [500, 296]
			}
		},

		{
			path: {
				peak: [550, 320]
			}
		}
	];

	// setTimeout(() => {
	// 	_mtGraphScroll.current?.scrollTo({ x: 0, y: 0, animated: true });
	// 	// .scrollTo({x: 0, y: 0, animated: true})
	// }, 3000);

	const calcMtGraphWidth = (
		segWidth: number,
		segNumber: number,
		lastPointX: number
	): number => {
		const visibleWidth: number = segWidth * segNumber;
		const ratio: number = lastPointX / visibleWidth;

		return wp(`${ratio * 100}%`);
	};

	const onScrollRelease = (
		event: NativeSyntheticEvent<NativeScrollEvent>
	): void => {
		const offsetX = event.nativeEvent.contentOffset.x;
        const segmentMargin = wp(`${100 / OPTIONS.visibleSegmentNum}%`) / 2;
        
		const log: number | undefined = OFFSETS.find(
			(offset: number, index: number) => {
				if (
					OFFSETS[index] - segmentMargin <= offsetX &&
					offsetX < OFFSETS[index + 1] - segmentMargin
				) {
					return true;
				} else if (OFFSETS[index] >= offsetX) { //for last element, scrollView returns lower number than offset za last element
					return true;
				}
			}
		);

		const logIndex =
			OFFSETS.indexOf(!!log ? log : 0) +
            Math.floor(OPTIONS.visibleSegmentNum / 2);

            
	};

	let points: MtGraphPointType[] = [];

	sessions.forEach((s, index) => {
		let p: MtGraphPointType[] = [];

		if (index > 0) {
			p = generateSessionPoints(
				sessions[index - 1].path.peak,
				s.path.peak,
				{ min: 0.05, max: 0.15 },
				{ min: 2, max: 5 }
			);
			p.shift(); //removing duplicated points (point already included in previous log, added to generate midpoints)
		} else {
			p = [[0, 0, 0], [25, 0, 0], s.path.peak]; // aligning 1st point to visualy starting from 0 in app (because of graph offset of 25)
		}

		if (index === 0) {
			p[0][2] = 0; //remove bezier curve from first point
		} else if (index === sessions.length - 1) {
			p[p.length - 1][2] = 0; //remove bezier curve from last point
		} else {
			p[p.length - 1][2] = 0.025; //prevent too big bezier curve on main points
		}

		points = [...points, ...p];
	});

	return (
		<MtGraphComponent>
			<ScrollView
				ref={_mtGraphScroll}
				horizontal={true}
				pinchGestureEnabled={false}
				decelerationRate="fast"
				snapToOffsets={OFFSETS}
                onMomentumScrollEnd={onScrollRelease}
                snapToEnd={false}
			>
				<MtGraph
					color="cyan"
					height={hp('50%')}
					width={calcMtGraphWidth(
						OPTIONS.segmentWidth,
						OPTIONS.visibleSegmentNum,
						550
					)}
					points={points}
				></MtGraph>
			</ScrollView>
			<SelectIndicator
				options={OPTIONS}
				pointerEvents="none"
			></SelectIndicator>
		</MtGraphComponent>
	);
};

const MtGraphComponent = styled(View)`
	position: absolute;
	top: 0;
	max-height: ${hp('50%')}px;
	background-color: red;
`;

const SelectIndicator = styled(View)`
	position: absolute;
	left: ${(props: SelectIndicatorTypes) =>
		wp(`${(100 - 100 / props.options.visibleSegmentNum) / 2}%`)}px;
	width: ${(props: SelectIndicatorTypes) =>
		wp(`${100 / props.options.visibleSegmentNum}%`)}px;
	height: 100%;
	border: 2px solid purple;
`;

export default withTheme(MtGraphContainer);
