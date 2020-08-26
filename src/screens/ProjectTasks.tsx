import React, { useState } from 'react';
import {
	View,
	Text,
	Button,
	ScrollView,
	StatusBar,
	TouchableOpacity
} from 'react-native';
import styled, { withTheme } from 'styled-components';
import { connect, ConnectedProps } from 'react-redux';
import { setTheme } from '/redux/actions';

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from './index';

import BasicLayout from '/components/molecules/basicLayout/';

import TaskItem from '/components/molecules/taskItem/';
import Spacer from '/components/atoms/spacer/';

import TaskAdd from '/components/organisms/taskAdd/';

import { SelectedTheme, ThemeMode } from '/styles/types';

import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from '/utils/dimensions';

import { TaskPrioritySelectProps, TaskPriorityType } from '/components/molecules/taskPrioritySelect/index';

//---- store

const mapDispatch = {
	setTheme: (theme: ThemeMode) => setTheme(theme)
};
const connector = connect(null, mapDispatch);

//---- types

type ProjectTaskType = {
    text: string;
    priority: TaskPriorityType;
    checked: boolean;
};

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = StackScreenProps<RootStackParamList, 'Main'>;
type PropsWithTheme = Props &
	PropsFromRedux & {
		theme: SelectedTheme;
	};
type StatusBarStyleType =
	| 'light-content'
	| 'dark-content'
	| 'default'
	| undefined;

//---- component

const projectTaskList: ProjectTaskType[] = [
    {
        text: 'Lorem Ipsum',
        priority: 'low',
        checked: false
    },
    {
        text: 'Example Task',
        priority: 'medium',
        checked: true
    },
    {
        text: 'Some very long text to test long sentences in task component',
        priority: 'high',
        checked: false
    }
]

const ProjectTaskScreen = (props: PropsWithTheme) => {
    const [projectTasks, changeProjectTasks] = React.useState<ProjectTaskType[]>(projectTaskList);
    
	const prioritySelectSettings: TaskPrioritySelectProps = {
		activeOpacity: 0.75,
		title: 'Select Priority'
	};

	const [statusBarTheme] = useState<StatusBarStyleType>(() => {
		if (props.theme.label === 'dark') {
			return 'light-content';
		} else {
			return 'dark-content';
		}
    });
    
    const changeCheckedState = (index: number) => {
        let tempProjectTasks: ProjectTaskType[] = [...projectTasks];
        tempProjectTasks[index].checked = !tempProjectTasks[index].checked;
        
        changeProjectTasks(tempProjectTasks);
    }

    const onTaskAdd = (task: {text: string, priority: TaskPriorityType}) => {
        let tempProjectTasks: ProjectTaskType[] = [...projectTasks];
        tempProjectTasks.unshift({
            text: task.text,
            priority: task.priority,
            checked: false
        })
        
        changeProjectTasks(tempProjectTasks);

        return true;
    }

	return (
		<ProjectTaskScreenContainer>
			<StatusBar
				translucent
				backgroundColor="transparent"
				barStyle={statusBarTheme}
			/>
			<BasicLayout
				navigation={props.navigation}
				route={props.route}
				screenName={'Project Tasks'}
			>
				<ProjectTaskScreenContent>
					<TaskAdd
						title={'New Task'}
						inputLabel={'Task Title'}
						buttonLabel={'Add'}
                        prioritySelectOptions={prioritySelectSettings}
                        onTaskAddOrChange={(task) => onTaskAdd(task)}
					></TaskAdd>

					<Spacer width={wp('100%')} height={hp('2.5%')}></Spacer>

					<TaskScreenHeading>Tasks</TaskScreenHeading>
					<TaskItemList>
                        {projectTasks.map((task, i) => (
                            <TaskItem
                                key={Math.random() * i}
                                text={task.text}
                                priority={task.priority}
                                checked={task.checked}
                                activeOpacity={0.5}
                                checkActiveOpacity={0.5}
                                onPress={() => console.log('press')}
                                onLongPress={() => console.log('long press')}
                                onCheckPress={() => changeCheckedState(i)}
                            ></TaskItem>
                        ))}
					</TaskItemList>
				</ProjectTaskScreenContent>
			</BasicLayout>
		</ProjectTaskScreenContainer>
	);
};

//---- styles

const ProjectTaskScreenContainer = styled(View)`
	flex: 1;
	width: ${wp('100%')}px;
	height: ${hp('100%')}px;
	background-color: ${(props) => props.theme.colors.primary};
`;

const ProjectTaskScreenContent = styled(View)`
	flex: 1;
	align-items: center;
	justify-content: center;
`;

const TaskScreenHeading = styled(Text)`
	${(props) => props.theme.fonts.size.beta};
	color: ${(props) => props.theme.colors.textPrimary};
	margin: ${hp('1%')}px ${hp('2.5%')}px;
	align-self: flex-start;
`;

const TaskItemList = styled(View)`
	margin: ${hp('1%')}px;
`;

//----

export default connector(withTheme(ProjectTaskScreen));
