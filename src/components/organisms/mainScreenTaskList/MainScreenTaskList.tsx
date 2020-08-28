import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import styled, { withTheme } from 'styled-components';
import Constants from 'expo-constants';

import { connect, ConnectedProps } from 'react-redux';
import { toggleTaskState } from '/redux/actions';
import { getSelectedProject } from '/redux/selectors';

import Spacer from '/components/atoms/spacer/';
import TaskItem from '/components/molecules/taskItem/';

import BottomSheet from '/components/atoms/bottomSheet/';

import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from '/utils/dimensions';
import { hexToRGBA } from '/utils/colorFormat';
import { LinearGradient } from 'expo-linear-gradient';

import { SelectedTheme } from '/styles/types';
import { StoreStateType, ProjectTaskType } from '/redux/types';

//---- store

const mapState = (state: StoreStateType) => ({
	SELECTED_PROJECT: getSelectedProject(state),
	ALL_PROJECTS: state.ALL_PROJECTS
});
const mapDispatch = {
	toggleTaskState: (
		taskId: string,
		projectId: string,
		taskChecked: boolean
	) => toggleTaskState(taskId, projectId, taskChecked)
};
const connector = connect(mapState, mapDispatch);

//---- types

type PropsFromRedux = ConnectedProps<typeof connector>;
type PropsWithTheme = PropsFromRedux & {
	theme: SelectedTheme;
};

//---- component

const MainScreenTaskList = (props: PropsWithTheme) => {
	const [projectTasks, changeProjectTasks] = React.useState<
		ProjectTaskType[]
	>(props.SELECTED_PROJECT?.tasks || []);

	const ref = React.useRef();

	React.useEffect(() => {
		if (
			props.SELECTED_PROJECT &&
			props.SELECTED_PROJECT?.tasks !== projectTasks
		) {
			changeProjectTasks(props.SELECTED_PROJECT?.tasks);
		}
	}, [props.ALL_PROJECTS, props.SELECTED_PROJECT]);

	const changeCheckedState = (index: number) => {
		const taskId: string = props.SELECTED_PROJECT?.tasks[index]?._id
			? props.SELECTED_PROJECT?.tasks[index]?._id
			: '';
		const projectId: string = props.SELECTED_PROJECT
			? props.SELECTED_PROJECT._id
			: '';
		props.toggleTaskState(
			taskId,
			projectId,
			!props.SELECTED_PROJECT?.tasks[index].checked
		);
	};

	return (
		<TasksContainer>
			<TasksHeader>
				<TasksTitle>Tasks</TasksTitle>
			</TasksHeader>
			<ScrollView>
				{projectTasks.map((task, i) => (
					<TaskItem
						key={Math.random() * i}
						text={task.text}
						priority={task.priority}
						checked={task.checked}
						activeOpacity={0.5}
						checkActiveOpacity={0.5}
						onPress={() => console.log('press')}
						onLongPress={() => ref?.current.snapTo(1)}
						onCheckPress={() => changeCheckedState(i)}
					></TaskItem>
				))}
				{!projectTasks[0] ? <ListEmpty>No tasks</ListEmpty> : null}
				<Spacer height={hp('3%')} width={wp('100%')}></Spacer>
			</ScrollView>
			<BottomSheet
				ref={ref}
				snapPoints={[0, hp('40%') + 1 * hp('6%')]}
                initialSnap={0}
                enabledContentTapInteraction={false}
			>
				<LinearGradient
					style={{ height: '100%' }}
					colors={[
						hexToRGBA(props.theme.colors.primary, 1),
						hexToRGBA(props.theme.colors.primary, 0.9),
                        hexToRGBA(props.theme.colors.primary, 0.8),
						'transparent'
					]}
					start={{ x: 0, y: 1 }}
					end={{ x: 0, y: 0 }}
				>
					<OptionSheetWrapper>
						<OptionSheetItem>
							<OptionSheetItemText>Delete</OptionSheetItemText>
						</OptionSheetItem>

						<OptionsSheetClose>
                            <CloseSheetItem onPress={() => ref?.current.snapTo(0)}>
                                <OptionSheetItemText>Cancel</OptionSheetItemText>
                            </CloseSheetItem>
                        </OptionsSheetClose>
					</OptionSheetWrapper>
				</LinearGradient>
			</BottomSheet>
		</TasksContainer>
	);
};

//---- styles

const TasksContainer = styled(View)`
	width: ${wp('100%')}px;
	height: ${hp('25%') + Constants.statusBarHeight}px;
`;

const TasksHeader = styled(View)`
	flex-direction: row;
	align-items: center;
	width: ${wp('100%')}px;
	height: ${hp('5%')}px;
`;

const TasksTitle = styled(Text)`
	margin-left: ${wp('2.5%')}px;
	color: ${(props) => props.theme.colors.textPrimary};
	${(props) => props.theme.fonts.size.beta};
`;

const ListEmpty = styled(Text)`
	width: ${wp('100%')}px;
	${(props) => props.theme.fonts.size.delta};
	color: ${(props) => props.theme.colors.textPrimary};
	text-transform: uppercase;
	padding: ${hp('2%')}px;
	text-align: left;
`;

const OptionSheetWrapper = styled(View)`
	width: ${wp('100%')}px;
	height: 100%;
	align-items: center;
    justify-content: center;
`;

const OptionSheetItem = styled(TouchableOpacity)`
	padding: ${hp('1.5%')}px ${wp('5%')}px;
`;

const OptionsSheetClose = styled(View)`
    width: ${wp('90%')}px;
    position: absolute;
	bottom: ${Constants.statusBarHeight}px;
	border-top-width: 1px;
	border-color: ${(props) => hexToRGBA(props.theme.colors.textPrimary, 0.5)};
`;

const CloseSheetItem = styled(TouchableOpacity)`
	align-items: center;
	padding: ${hp('2.5%')}px;
`;

const OptionSheetItemText = styled(Text)`
	${(props) => props.theme.fonts.size.beta};
	color: ${(props) => props.theme.colors.textPrimary};
	font-weight: bold;
`;

//----

export default connector(withTheme(MainScreenTaskList));
