// Copyright © 2020, Danijel Martinek. All rights reserved. 
// This project was created by Danijel Martinek (danijel@martinek.xyz) 

import React, { useState, useRef, useEffect, useContext } from 'react';
import {
	View,
	ScrollView,
	Text,
	NativeSyntheticEvent,
	NativeScrollEvent
} from 'react-native';
import styled, { withTheme } from 'styled-components';
import moment from 'moment';
import CounterContext from '/context/counter';
import { connect, ConnectedProps } from 'react-redux';
import { setSelectedActivityIndex } from '/redux/actions';

import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from '/utils/dimensions';
import {
	accumulateSessions,
	sortActivities,
	makeGraphPoints,
	accumulateCurrentDaySessions
} from '/utils/graphFunctions';
import { hexToRGBA } from '/utils/colorFormat';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '/screens/index';
import { StoreStateType } from '/redux/types';

import { SelectedTheme } from '/styles/types';

import MtGraph from '/components/atoms/mtGraph/';

import { MtGraphPointType } from '/components/atoms/mtGraph/types';
import { ProjectActivityType } from '/redux/types';

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = StackScreenProps<RootStackParamList, 'Main'>;
type PropsWithTheme = Props &
	PropsFromRedux & {
		theme: SelectedTheme;
	};

type MtGraphOptionsType = {
	visibleSegmentNum: number;
	segmentWidth: number;
};

type SelectIndicatorTypes = {
	options: MtGraphOptionsType;
};

import { getSelectedProject } from '/redux/selectors';

const mapState = (state: StoreStateType) => ({
	SELECTED_ACTIVITY_INDEX: state.SELECTED_ACTIVITY_INDEX,
	SELECTED_PROJECT: getSelectedProject(state)
});
const mapDispatch = {
	setSelectedActivityIndex: (index: number) => setSelectedActivityIndex(index)
};
const connector = connect(mapState, mapDispatch);

const OPTIONS: MtGraphOptionsType = {
	visibleSegmentNum: 5,
	segmentWidth: 50
};

const fillWithInterval = (count: number, interval: number) => {
	return Array(count)
		.fill(interval)
		.map((item, index) => index * interval);
};

const getGraphHeight = (
	maxHeightPercentage: number,
	scaleDownPrecentage: number
): string => {
	return `${
		maxHeightPercentage -
		maxHeightPercentage *
			(OPTIONS.visibleSegmentNum * (scaleDownPrecentage / 100))
	}%`;
};

const getSelectedOffset = (
	eventOffsetX: number,
	offsets: number[],
	segmNum: number,
	moveOffset: number = 0
): number => {
	let index: number = 0;

	const eox: number = Math.round(eventOffsetX);
	const segmentNumber = Math.floor(segmNum / 2);

	if (eox <= 0) {
		index = 0;
	} else if (eox >= offsets[offsets.length - 1]) {
		index = offsets.length - 1;
	} else {
		offsets.forEach((offx, ind) => {
			if (offsets[ind + 1]) {
				if (eox >= offx && eox < offsets[ind + 1]) {
					index = ind;
				}
			}
		});
	}

	return segmentNumber + index - moveOffset;
};

const MtGraphContainer = (props: PropsWithTheme) => {
	const { activeCounter } = useContext(CounterContext);
	const staticCurrentDayActivity = accumulateCurrentDaySessions(
		props.SELECTED_PROJECT?.sessions || []
	);

	const [activities, setActivities] = useState<ProjectActivityType[]>(
		sortActivities(
			accumulateSessions(props.SELECTED_PROJECT?.sessions || [])
		)
	);
	const [currentDayActivity, setCurrentDayActivity] = useState<
		ProjectActivityType
	>(accumulateCurrentDaySessions(props.SELECTED_PROJECT?.sessions || []));

	const [points, setPoints] = useState<MtGraphPointType[]>(
		makeGraphPoints([...activities, currentDayActivity])
	);

	const _mtGraphScroll = useRef<ScrollView>(null);

	const OFFSETS = fillWithInterval(
		Math.ceil((points.length * 50) / OPTIONS.segmentWidth) +
			Math.floor(OPTIONS.visibleSegmentNum / 2),
		wp(`${100 / OPTIONS.visibleSegmentNum}%`)
	);

	const calcMtGraphWidth = (
		segWidth: number,
		segNumber: number,
		lastPointX: number
	): number => {
		const visibleWidth: number = segWidth * segNumber;
		const ratio: number = lastPointX / visibleWidth;

		return wp(`${ratio * 100}%`);
	};

	const onGraphScroll = (
		event: NativeSyntheticEvent<NativeScrollEvent>
	): void => {
		if (
			getSelectedOffset(
				event.nativeEvent.contentOffset.x,
				OFFSETS,
				OPTIONS.visibleSegmentNum,
				2
			) !== props.SELECTED_ACTIVITY_INDEX
		) {
			props.setSelectedActivityIndex(
				activities[
					getSelectedOffset(
						event.nativeEvent.contentOffset.x,
						OFFSETS,
						OPTIONS.visibleSegmentNum,
						2
					)
				]
					? getSelectedOffset(
							event.nativeEvent.contentOffset.x,
							OFFSETS,
							OPTIONS.visibleSegmentNum,
							2
					  )
					: -1
			);
		}
	};

	useEffect(() => {
		setActivities(
			sortActivities(accumulateSessions(props.SELECTED_PROJECT?.sessions))
		);
		setTimeout(() => {
			_mtGraphScroll?.current?.scrollToEnd({ animated: true });
			props.setSelectedActivityIndex(-1);
		}, 1000);
	}, [props.SELECTED_PROJECT]);

	useEffect(() => {
		setCurrentDayActivity(
			accumulateCurrentDaySessions(props.SELECTED_PROJECT?.sessions)
		);
	}, [activities]);

	useEffect(() => {
		setTimeout(() => {
			_mtGraphScroll?.current?.scrollToEnd({ animated: true });
			props.setSelectedActivityIndex(-1);
		}, 1000);
	}, []);

	useEffect(() => {
		const refreshInterval = 5;
		if (Math.round(activeCounter) % refreshInterval === 0) {
			setCurrentDayActivity(() => {
				let upgradedActivity = { ...staticCurrentDayActivity };
				upgradedActivity.totalActivityTime =
					upgradedActivity.totalActivityTime + activeCounter;
				return upgradedActivity;
			});
		}
	}, [activeCounter]);

	useEffect(() => {
		setPoints(makeGraphPoints([...activities, currentDayActivity]));
	}, [currentDayActivity]);

	return (
		<MtGraphComponent>
			<ScrollView
				ref={_mtGraphScroll}
				horizontal={true}
				pinchGestureEnabled={false}
				decelerationRate="fast"
				snapToOffsets={OFFSETS}
				onScroll={onGraphScroll}
				snapToEnd={false}
			>
				{[...activities, currentDayActivity][0] ? (
					<React.Fragment>
						<MtGraphDistancer options={OPTIONS}></MtGraphDistancer>
						<MtGraphWrapper>
							<MtGraph
								color={
									props.theme.project.colors.projectSecondary
								}
								height={hp(getGraphHeight(50, 7))}
								width={calcMtGraphWidth(
									OPTIONS.segmentWidth,
									OPTIONS.visibleSegmentNum,
									points.length * 50
								)}
								points={points}
							></MtGraph>
						</MtGraphWrapper>
						<MtGraphDistancer options={OPTIONS}></MtGraphDistancer>
					</React.Fragment>
				) : (
					<View
						style={{ height: hp('100%'), width: wp('100%') }}
					></View>
				)}

				<DateIndicatorLine>
					{[0, 1].map((blank, i) => (
						<DateIndicator
							options={OPTIONS}
							key={i * Math.random()}
						>
							<DateIndicatorDay></DateIndicatorDay>
						</DateIndicator>
					))}
					{[...activities, currentDayActivity].map((point, i) =>
						moment(point.activityDate)
							.startOf('day')
							.toISOString() ===
						moment().startOf('day').toISOString() ? (
							<DateIndicator options={OPTIONS} key={i}>
								<CurrentDateIndicatorDay>
									<DateIndicatorDaySubtitle>
										{moment(point.activityDate).format(
											'ddd'
										)}
									</DateIndicatorDaySubtitle>
									<DateIndicatorDayTitle>
										{moment(point.activityDate).format(
											'DD'
										)}
									</DateIndicatorDayTitle>
									<DateIndicatorMonth>
										Current Day
									</DateIndicatorMonth>
								</CurrentDateIndicatorDay>
							</DateIndicator>
						) : (
							<DateIndicator options={OPTIONS} key={i}>
								<DateIndicatorDay>
									<DateIndicatorDaySubtitle>
										{moment(point.activityDate).format(
											'ddd'
										)}
									</DateIndicatorDaySubtitle>
									<DateIndicatorDayTitle>
										{moment(point.activityDate).format(
											'DD'
										)}
									</DateIndicatorDayTitle>
									{moment(point.activityDate).format('M') !==
									moment().format('M') ? (
										<DateIndicatorMonth>
											{moment(point.activityDate).format(
												'MMMM'
											)}
										</DateIndicatorMonth>
									) : (
										<DateIndicatorMonth></DateIndicatorMonth>
									)}
								</DateIndicatorDay>
							</DateIndicator>
						)
					)}
					{[0, 1].map((blank, i) => (
						<DateIndicator
							options={OPTIONS}
							key={i * Math.random()}
						>
							<DateIndicatorDay></DateIndicatorDay>
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
	background-color: ${(props) =>
		hexToRGBA(props.theme.colors.textPrimary, 0.1)};
	border: 2px solid ${(props) => props.theme.colors.textPrimary};
	border-radius: ${hp('0.75%')}px;
`;

const DateIndicatorLine = styled(View)`
	flex-direction: row;
	position: absolute;
	top: 0;
	height: ${hp('64%')}px;
	width: 100%;
`;

const DateIndicator = styled(View)`
	width: ${(props: SelectIndicatorTypes) =>
		wp(`${100 / props.options.visibleSegmentNum}%`)}px;
	height: 100%;
	border-right-width: 0.5px;
	border-right-color: ${(props) =>
		hexToRGBA(props.theme.colors.textPrimary, 0.1)};
	border-left-width: 0.5px;
	border-left-color: ${(props) =>
		hexToRGBA(props.theme.colors.textPrimary, 0.1)};
	justify-content: flex-end;
`;

const DateIndicatorDay = styled(View)`
	width: 100%;
	height: ${hp('14%')}px;
	background-color: ${(props) => props.theme.colors.primary};
	align-items: center;
	justify-content: center;
`;

const CurrentDateIndicatorDay = styled(View)`
	width: 100%;
	height: ${hp('13.4%')}px;
	background-color: ${(props) => props.theme.project.colors.projectPrimary};
	align-items: center;
	justify-content: center;
	border-radius: ${hp('0.75%')}px;
`;

const DateIndicatorDayTitle = styled(Text)`
	color: ${(props) => props.theme.colors.textPrimary};
	${(props) => props.theme.fonts.size.alpha};
`;

const DateIndicatorDaySubtitle = styled(Text)`
	color: ${(props) => props.theme.colors.textPrimary};
	${(props) => props.theme.fonts.size.gamma};
`;

const DateIndicatorMonth = styled(Text)`
	color: ${(props) => hexToRGBA(props.theme.colors.textPrimary, 0.5)};
	${(props) => props.theme.fonts.size.zeta};
`;

const MtGraphDistancer = styled(View)`
	width: ${(props: SelectIndicatorTypes) =>
		wp(`${2 * (100 / props.options.visibleSegmentNum)}%`)}px;
	height: 100%;
`;

export default connector(withTheme(MtGraphContainer));
