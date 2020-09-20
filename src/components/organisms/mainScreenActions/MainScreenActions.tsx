import React, { useState, useContext } from 'react';
import { View, Text } from 'react-native';
import styled, { withTheme } from 'styled-components';
import CounterContext from '/context/counter';
import { connect, ConnectedProps } from 'react-redux';
import { setSelectedActivityIndex, addSessionToProject } from '/redux/actions';

import { DateTime, Duration } from 'luxon';

import MtButton from '/components/atoms/mtButton/';

//---- types

import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from '/utils/dimensions';
import { accumulateSessions, sortActivities } from '/utils/graphFunctions';
import { makeId } from '/utils/helpers';
import { hexToRGBA } from '/utils/colorFormat';

import { SelectedTheme } from '/styles/types';
import { ProjectSessionType, ProjectActivityType } from '/redux/types';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '/screens/index';
import { StoreStateType } from '/redux/types';
import { getSelectedProject } from '/redux/selectors';

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = StackScreenProps<RootStackParamList, 'Main'>;
type PropsWithTheme = Props &
	PropsFromRedux & {
		theme: SelectedTheme;
	};

const mapState = (state: StoreStateType) => ({
	SELECTED_ACTIVITY_INDEX: state.SELECTED_ACTIVITY_INDEX,
	SELECTED_PROJECT: getSelectedProject(state)
});
const mapDispatch = {
	setSelectedActivityIndex: (index: number) =>
		setSelectedActivityIndex(index),
	addSessionToProject: (projectId: string, session: ProjectSessionType) =>
		addSessionToProject(projectId, session)
};
const connector = connect(mapState, mapDispatch);

//---- component

const MainScreenActions = (props: PropsWithTheme) => {
	const [activities, setActivities] = useState<ProjectActivityType[]>(
		sortActivities(accumulateSessions(props.SELECTED_PROJECT?.sessions || []))
	);

	const counter = useContext(CounterContext);
	const [actionStates, setActionStates] = useState<
		[boolean, boolean, boolean]
	>([false, false, false]);

	const activityStart = () => {
		if (actionStates[2]) {
			counter.stopPause();
		} else {
			counter.startCounter();
		}
	};

	const activityPause = () => {
		counter.startPause();
	};

	const activityStop = () => {
		counter.stopCounter((session) => {
			if (session.activeTime > 0) {
				props.addSessionToProject(props.SELECTED_PROJECT._id, {
					...session,
					_id: makeId(16),
					createdAt: new Date(),
					updatedAt: new Date()
				});
			}
		});
		setActionStates([false, false, false]);
	};

	const selectAction = (index: number) => {
		if (index === 0) {
			setActionStates([true, false, false]);
			activityStop();
		} else if (index === 1) {
			setActionStates([false, true, false]);
			activityStart();
		} else if (index === 2) {
			setActionStates([false, false, true]);
			activityPause();
		}
	};

	const getStartButtonText = () => {
		if (actionStates[1]) {
			return 'Active';
		} else if (actionStates[2]) {
			return 'Resume';
		} else {
			return 'Start';
		}
	};

	const getPauseButtonText = () => {
		if (actionStates[2]) {
			return 'Paused';
		} else {
			return 'Pause';
		}
	};

	// React.useEffect(() => {
	//     console.log(counter.activeCounter);
	// })

	return (
		<React.Fragment>
			{props.SELECTED_ACTIVITY_INDEX === -1 ? (
				<ActionsContainer>
					<MtButton
						size={props.theme.fonts.oSize.gamma.fontSize}
						icon={'camp_tent'}
						activeOpacity={0.5}
						active={actionStates[0]}
						title="Stop"
						textColor={props.theme.colors.primary}
						backgroundColor={props.theme.colors.textPrimary}
						activeTextColor={props.theme.colors.textPrimary}
						activeBackgroundColor={
							props.theme.project.colors.projectPrimary
						}
						onPress={() => selectAction(0)}
						disabled={
							!actionStates[1] && !actionStates[2] ? true : false
						}
					></MtButton>
					<MtButton
						size={props.theme.fonts.oSize.gamma.fontSize}
						icon={'hiking'}
						activeOpacity={0.5}
						active={actionStates[1]}
						title={getStartButtonText()}
						textColor={props.theme.colors.primary}
						backgroundColor={props.theme.colors.textPrimary}
						activeTextColor={props.theme.colors.textPrimary}
						activeBackgroundColor={
							props.theme.project.colors.projectPrimary
						}
						onPress={() => selectAction(1)}
					></MtButton>
					<MtButton
						size={props.theme.fonts.oSize.gamma.fontSize}
						icon={'camp_fire'}
						activeOpacity={0.5}
						active={actionStates[2]}
						title={getPauseButtonText()}
						textColor={props.theme.colors.primary}
						backgroundColor={props.theme.colors.textPrimary}
						activeTextColor={props.theme.colors.textPrimary}
						activeBackgroundColor={
							props.theme.project.colors.projectPrimary
						}
						onPress={() => selectAction(2)}
						disabled={
							!actionStates[1] && !actionStates[2] ? true : false
						}
					></MtButton>
				</ActionsContainer>
			) : (
				<ActionsContainer>
					<SelectedActivityItem>
						<DetailHeading>Start Time</DetailHeading>
						<DetailInfo>
							{activities[props.SELECTED_ACTIVITY_INDEX]
								? DateTime.fromISO(
										activities[
											props.SELECTED_ACTIVITY_INDEX
										].startTime
								  ).toFormat('hh:mm')
								: 'none'}
						</DetailInfo>
					</SelectedActivityItem>
					<SelectedActivityItem>
						<DetailHeading>Duration</DetailHeading>
						<DetailInfo>
							{activities[props.SELECTED_ACTIVITY_INDEX]
								? Duration.fromObject({
										seconds:
											activities[
												props.SELECTED_ACTIVITY_INDEX
											].totalActivityTime
								  }).toFormat('hh:mm')
								: 'none'}
						</DetailInfo>
					</SelectedActivityItem>
					<SelectedActivityItem>
						<DetailHeading>Pause Time</DetailHeading>
						<DetailInfo>
							{activities[props.SELECTED_ACTIVITY_INDEX]
								? Duration.fromObject({
										seconds:
											activities[
												props.SELECTED_ACTIVITY_INDEX
											].totalActivityPauseTime
								  }).toFormat('hh:mm')
								: 'none'}
						</DetailInfo>
					</SelectedActivityItem>
				</ActionsContainer>
			)}
		</React.Fragment>
	);
};

//---- styles

const ActionsContainer = styled(View)`
	width: ${wp('100%')}px;
	height: ${hp('10%')}px;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
	background-color: ${(props) => props.theme.colors.tertiary};
`;

const SelectedActivityItem = styled(View)`
	flex: 1;
	align-items: center;
	justify-content: center;
`;

const DetailHeading = styled(Text)`
	${(props) => props.theme.fonts.size.delta};
	color: ${(props) => hexToRGBA(props.theme.colors.textPrimary, 0.75)};
	font-weight: bold;
	text-transform: uppercase;
`;

const DetailInfo = styled(Text)`
	${(props) => props.theme.fonts.size.beta};
	color: ${(props) => props.theme.colors.textPrimary};
	font-weight: bold;
`;

//----

export default connector(withTheme(MainScreenActions));
