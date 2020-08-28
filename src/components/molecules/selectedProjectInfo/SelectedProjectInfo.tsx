import React from 'react';
import { View, Text } from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import styled, { withTheme } from 'styled-components';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import moment from 'moment';

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '/screens/index';

import Spacer from '/components/atoms/spacer/';
import Icon from '/components/atoms/icon/';
import Badge from '../../atoms/mtBadge';

import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from '/utils/dimensions';
import { hexToRGBA } from '/utils/colorFormat';

import { SelectedTheme } from '/styles/types';
import { StoreStateType, ProjectType } from '/redux/types';
import { selectProject, setProjectTheme } from '/redux/actions';
import { getSelectedProject } from '/redux/selectors';

//---- store

const mapDispatch = {
	selectProject: (index: number) => selectProject(index),
	setProjectTheme: () => setProjectTheme()
};
const mapState = (state: StoreStateType) => ({
	SELECTED_PROJECT: getSelectedProject(state)
});
const connector = connect(mapState, mapDispatch);

//---- types

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = StackScreenProps<RootStackParamList, 'Main'>;
type PropsWithTheme = Props &
	PropsFromRedux & {
		theme: SelectedTheme;
		onCloseButtonPress?: () => void;
	};
//---- component

const SelectedProjectInfo = (props: PropsWithTheme) => {
	const getDurationSum = (): string => {
		if (props.SELECTED_PROJECT?.activities[0]) {
			return `Ø`;
		} else {
			return `Ø`;
		}
	};

	const getStartDate = (): string => {
		if (props.SELECTED_PROJECT?.activities[0]) {
			return moment(
				props.SELECTED_PROJECT.activities[0].startTime
			).format('DD/MM/YYYY');
		} else {
			return `Ø`;
		}
	};

	const getTasksCount = (): string => {
		if (props.SELECTED_PROJECT?.tasks[0]) {
			const taskCount: number = props.SELECTED_PROJECT.tasks.length;
			const checkedTasks: number = props.SELECTED_PROJECT.tasks.filter(
				(task) => task.checked === true
			).length;

			return `${checkedTasks} / ${taskCount}`;
		} else {
			return `Ø`;
		}
	};

	return (
		<SelectedProjectInfoContainer>
			<Spacer
				height={Constants.statusBarHeight}
				width={wp('100%')}
			></Spacer>
			<SelectedProjectBadge>
				<Badge
					icon={props.theme.project.icon}
					size={hp('10%')}
					primaryColor={props.theme.colors.textPrimary}
					secondaryColor={props.theme.project.colors.projectSecondary}
					iconColor={props.theme.project.colors.projectPrimary}
				></Badge>
			</SelectedProjectBadge>
            <SelectedProjectName>{props.SELECTED_PROJECT?.name}</SelectedProjectName>
			<SelectedProjectDetails>
				<SelectedProjectDetailsItem>
					<DetailHeading>Start Date</DetailHeading>
					<DetailInfo>{getStartDate()}</DetailInfo>
				</SelectedProjectDetailsItem>
				<SelectedProjectDetailsItem>
					<DetailHeading>Duration</DetailHeading>
					<DetailInfo>{getDurationSum()}</DetailInfo>
				</SelectedProjectDetailsItem>
				<SelectedProjectDetailsItem>
					<DetailHeading>Tasks</DetailHeading>
					<DetailInfo>{getTasksCount()}</DetailInfo>
				</SelectedProjectDetailsItem>
			</SelectedProjectDetails>
			<ProjectSheetActionIcons>
				{props.SELECTED_PROJECT?._id ? (
					<ActionIcon1Wrapper
						onPress={() =>
							props.navigation.navigate('ProjectTasks', {
								projectId: props.SELECTED_PROJECT?._id
							})
						}
					>
						<Icon
							type={'flag'}
							color={props.theme.colors.textPrimary}
						></Icon>
					</ActionIcon1Wrapper>
				) : (
					<ActionIcon1Wrapper></ActionIcon1Wrapper>
				)}
				<ActionIcon2Wrapper
					onPress={() =>
						props.onCloseButtonPress
							? props.onCloseButtonPress()
							: null
					}
				>
					<Icon
						type={'close'}
						color={props.theme.colors.textPrimary}
					></Icon>
				</ActionIcon2Wrapper>
			</ProjectSheetActionIcons>
		</SelectedProjectInfoContainer>
	);
};

//---- default props

//---- styles

const SelectedProjectInfoContainer = styled(View)`
	align-items: center;
	justify-content: center;
	width: ${wp('100%')}px;
	height: ${hp('40%')}px;
    background-color: ${(props) => props.theme.project.colors.projectPrimary}
    border-bottom-left-radius: ${hp('2%')}px;
    border-bottom-right-radius: ${hp('2%')}px;
`;

const SelectedProjectBadge = styled(View)`
	align-items: center;
	justify-content: center;
	width: ${wp('100%')}px;
	height: ${hp('15%')}px;
`;

const SelectedProjectName = styled(Text)`
	${(props) => props.theme.fonts.size.beta};
	color: ${(props) => props.theme.colors.textPrimary};
	height: ${hp('5%')}px;
	font-weight: bold;
`;

const SelectedProjectDetails = styled(View)`
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
	width: ${wp('100%')}px;
	height: ${hp('20%') - Constants.statusBarHeight}px;
`;

const SelectedProjectDetailsItem = styled(View)`
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
	${(props) => props.theme.fonts.size.gamma};
	color: ${(props) => props.theme.colors.textPrimary};
	font-weight: bold;
`;

const ProjectSheetActionIcons = styled(View)`
	position: absolute;
	flex-direction: row;
	top: ${Constants.statusBarHeight}px;
	width: ${wp('100%')}px;
`;

const ActionIcon1Wrapper = styled(TouchableOpacity)`
	width: ${wp('50%')}px;
	align-items: flex-start;
	padding: ${wp('5%')}px;
`;

const ActionIcon2Wrapper = styled(TouchableOpacity)`
	width: ${wp('50%')}px;
	align-items: flex-end;
	padding: ${wp('5%')}px;
`;
//----

export default connector(withTheme(SelectedProjectInfo));
