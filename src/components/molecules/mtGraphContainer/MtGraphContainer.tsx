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
		visibleSegmentNum: 5,
		segmentWidth: 50
	};

	const OFFSETS = fillWithInterval(
		Math.ceil(550 / OPTIONS.segmentWidth) + Math.floor(OPTIONS.visibleSegmentNum / 2),
		wp(`${100 / OPTIONS.visibleSegmentNum}%`)
    );

    const getSelectedOffset = (eventOffsetX: number, offsets: number[], segmNum: number): number => {
        let index: number = 0;

        const eox: number = Math.round(eventOffsetX);
        const segmentNumber = Math.floor(segmNum / 2);

        if(eox <= 0) {
            index = 0;
        } else if (eox >= offsets[offsets.length - 1]) {
            index = offsets.length - 1;
        } else {
            offsets.forEach((offx, ind) => {
                if(offsets[ind + 1]) {
                    if(eox >= offx && eox < offsets[ind + 1]) {
                        index = ind;
                    }
                }
            })
        }

        return segmentNumber + index;
    }

    const getGraphHeight = (maxHeightPercentage: number, scaleDownPrecentage: number): string => {
        return `${maxHeightPercentage - maxHeightPercentage * (OPTIONS.visibleSegmentNum * (scaleDownPrecentage / 100))}%`
    }

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
        // console.log(getSelectedOffset(event.nativeEvent.contentOffset.x, OFFSETS, OPTIONS.visibleSegmentNum))
        // console.log(OFFSETS);
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
                {/* <MtGraphDistancer options={OPTIONS}></MtGraphDistancer> */}
                <MtGraphWrapper>
                    <MtGraph
                        color="cyan"
                        height={hp(getGraphHeight(50, 10))}
                        width={calcMtGraphWidth(
                            OPTIONS.segmentWidth,
                            OPTIONS.visibleSegmentNum,
                            550
                        )}
                        points={points}
                    ></MtGraph>
                </MtGraphWrapper>
                {/* <MtGraphDistancer options={OPTIONS}></MtGraphDistancer> */}
                <DateIndicatorLine>
                    {points.map((point, i) => (
                        <DateIndicator options={OPTIONS} key={i}>
                            <DateIndicatorDay>
                                <DateIndicatorDaySubtitle>Tue</DateIndicatorDaySubtitle>
                                <DateIndicatorDayTitle>18</DateIndicatorDayTitle>
                            </DateIndicatorDay>
                        </DateIndicator>
                    ))}
                </DateIndicatorLine>
			</ScrollView>
			<SelectIndicator
				options={OPTIONS}
				pointerEvents="none"
			></SelectIndicator>
		</MtGraphComponent>
	);
};

const MtGraphComponent = styled(View)`
    max-height: ${hp('65%')}px;
    background-color: ${(props: PropsWithTheme) => props.theme.colors.primary};
    border: 2.5px solid transparent;
`;

const MtGraphWrapper = styled(View)`
    height: ${hp('50%')}px;
    align-items: flex-end;
    justify-content: flex-end;
`;

const SelectIndicator = styled(View)`
    position: absolute;
    top: ${hp('50.5%')}px;
	left: ${(props: SelectIndicatorTypes) =>
		wp(`${(100 - 100 / props.options.visibleSegmentNum) / 2}%`)}px;
	width: ${(props: SelectIndicatorTypes) =>
		wp(`${100 / props.options.visibleSegmentNum}%`)}px;
    height: ${hp('13.5%')}px;
    background-color: rgba(255, 255, 255, 0.2);
    border: 2px solid red;
    border-radius: 10px;
`;

const DateIndicatorLine = styled(View)`
    flex-direction: row;
    position: absolute;
    top: 0;
    height: ${hp('65%')}px;
    width: 100%;
`;

const DateIndicator = styled(View)`
    width: ${(props: SelectIndicatorTypes) =>
        wp(`${100 / props.options.visibleSegmentNum}%`)}px;
    height: 100%;
    border-right-width: 0.5px;
    border-right-color: rgba(255, 255, 255, 0.2);
    border-left-width: 0.5px;
    border-left-color: rgba(255, 255, 255, 0.2);
    justify-content: flex-end;
`;

const DateIndicatorDay = styled(View)`
    width: 100%;
    height: ${hp('15%')}px;
    background-color: blue;
    align-items: center;
    justify-content: center;
`;

const DateIndicatorDayTitle = styled(Text)`
    color: white;
    ${(props) => props.theme.fonts.size.alpha};
`;

const DateIndicatorDaySubtitle = styled(Text)`
    color: white;
    ${(props) => props.theme.fonts.size.gamma};
`;

// const MtGraphDistancer = styled(View)`
//     width: ${(props: SelectIndicatorTypes) =>
//         wp(`${100 / Math.floor(props.options.visibleSegmentNum / 2)}%`)}px;
//     height: 100%;
// `;

export default withTheme(MtGraphContainer);
