import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import styled, { withTheme } from 'styled-components';
import Constants from 'expo-constants';

import Spacer from '/components/atoms/spacer/';
import TaskItem from '/components/molecules/taskItem/';

import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from '/utils/dimensions';

import { SelectedTheme } from '/styles/types';

import { PriorityVariants } from '/components/molecules/taskItem/'

//---- types

type PropsWithTheme = {
	theme: SelectedTheme;
};

//---- component

const MainScreenTaskList = (props: PropsWithTheme) => {
	return (
		<TasksContainer>
			<TasksHeader>
				<TasksTitle>Tasks</TasksTitle>
			</TasksHeader>
			<ScrollView>
				<TaskItem
					text={
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
					}
					priority={PriorityVariants['low']}
					checked={true}
				></TaskItem>
				<TaskItem
					text={'Etiam efficitur dui eget.'}
					priority={PriorityVariants['medium']}
					checked={false}
				></TaskItem>
				<TaskItem
					text={
						'Fusce dapibus nisl at risus accumsan, vel accumsan eros blandit.'
					}
					priority={PriorityVariants['low']}
					checked={false}
				></TaskItem>
                <TaskItem
					text={
						'Fusce dapibus nisl at risus accumsan, vel accumsan eros blandit.'
					}
					priority={PriorityVariants['high']}
					checked={true}
				></TaskItem>
                <TaskItem
					text={
						'Fusce dapibus nisl at risus accumsan, vel accumsan eros blandit.'
					}
					priority={PriorityVariants['low']}
					checked={false}
				></TaskItem>
                <TaskItem
					text={
						'Fusce dapibus nisl at risus accumsan, vel accumsan eros blandit.'
					}
					priority={PriorityVariants['low']}
					checked={false}
				></TaskItem>
                <Spacer height={hp('3%')} width={wp('100%')}></Spacer>
			</ScrollView>
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

//----

export default withTheme(MainScreenTaskList);
