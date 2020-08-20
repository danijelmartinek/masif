import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import styled, { withTheme } from 'styled-components';
import Constants from 'expo-constants';

import TaskItem from '/components/molecules/taskItem/';

import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from '/utils/dimensions';

import { SelectedTheme } from '/styles/types';

type PropsWithTheme = {
	theme: SelectedTheme;
	checked: boolean;
};

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
					priority={'low'}
					checked={true}
				></TaskItem>
				<TaskItem
					text={'Etiam efficitur dui eget.'}
					priority={'high'}
					checked={false}
				></TaskItem>
				<TaskItem
					text={
						'Fusce dapibus nisl at risus accumsan, vel accumsan eros blandit.'
					}
					priority={'medium'}
					checked={false}
				></TaskItem>
				<TasksItemDistancer height={hp('5%')}></TasksItemDistancer>
			</ScrollView>
		</TasksContainer>
	);
};

const TasksContainer = styled(View)`
	width: ${wp('100%')}px;
	height: ${hp('30%') + Constants.statusBarHeight}px;
`;

const TasksItemDistancer = styled(View)`
	width: ${wp('100%')}px;
	height: ${(props) => props.height}px;
`;

const TasksHeader = styled(View)`
	flex-direction: row;
	align-items: center;
	width: ${wp('100%')}px;
	height: ${hp('5%')}px;
`;

const TasksTitle = styled(Text)`
	margin-left: ${wp('2.5%')}px;
	color: ${(props: PropsWithTheme) => props.theme.colors.textPrimary};
	${(props) => props.theme.fonts.size.beta};
`;

export default withTheme(MainScreenTaskList);
