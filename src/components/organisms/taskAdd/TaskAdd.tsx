import React, { useState } from 'react';
import { View, Text } from 'react-native';
import styled, { withTheme } from 'styled-components';

import { Madoka } from 'react-native-textinput-effects';

import MtButton from '/components/atoms/mtButton/';
import TaskPrioritySelect from '/components/molecules/taskPrioritySelect/';

import { TaskPrioritySelectProps, TaskPriorityType } from '/components/molecules/taskPrioritySelect/index';

import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from '/utils/dimensions';

import { SelectedTheme } from '/styles/types';

//---- types

type TaskInfoType = {
	text: string;
	priority: TaskPriorityType;
};

type PropsWithTheme = {
	theme: SelectedTheme;
	title?: string;
	inputLabel?: string;
	buttonLabel?: string;
	prioritySelectOptions: TaskPrioritySelectProps;
    taskInfo?: TaskInfoType;
    onTaskAddOrChange?: (task: {text: string, priority: TaskPriorityType}) => boolean;
};

//---- component

const TaskAdd = (props: PropsWithTheme) => {
	const [taskDetails, setTaskDetails] = React.useState<TaskInfoType>(
		props.taskInfo || {
			text: '',
			priority: 'low'
		}
	);

	const [newTaskName, onTaskNameChangeText] = React.useState(
		taskDetails.text
	);

	const onPriorityEntityChange = async (text: string, priority: TaskPriorityType) => {
		setTaskDetails({
			text: text,
			priority: priority
		});
		onTaskNameChangeText(text);
    };
    
    const onTaskAddOrChange = () => {
        const saved = props.onTaskAddOrChange ? props.onTaskAddOrChange({
			text: taskDetails.text,
			priority: taskDetails.priority
        }) : null
        
        if(saved) {
            setTaskDetails({
                text: '',
                priority: 'low'
            });
            onTaskNameChangeText('');
        }
    }

	return (
		<TaskAddWrapper>
			<TaskScreenHeading>{props.title}</TaskScreenHeading>

			<ProjectTaskTextInput>
				<Madoka
					value={newTaskName}
					label={props.inputLabel}
					onChangeText={(text) =>
						onPriorityEntityChange(text, taskDetails.priority)
					}
					borderColor={props.theme.colors.textPrimary}
					inputPadding={hp('2%')}
					labelStyle={{
						color: props.theme.colors.textPrimary,
						marginLeft: -hp('2%'),
						opacity: 0.5
					}}
					inputStyle={{
						color: props.theme.colors.textPrimary
					}}
				/>
			</ProjectTaskTextInput>

			<TaskPrioritySelect
				{...props.prioritySelectOptions}
				priority={taskDetails.priority}
				onPress={(item) =>
					onPriorityEntityChange(taskDetails.text, item)
				}
			></TaskPrioritySelect>

			<AddButtonWrapper>
				<MtButton
					size={props.theme.fonts.oSize.gamma.fontSize}
					backgroundColor={props.theme.colors.semantic.success}
					activeOpacity={0.5}
					active={false}
					title={props.buttonLabel}
					fullWidth={true}
					disabled={
                        !taskDetails.text ||
						(JSON.stringify(taskDetails) ===
						JSON.stringify(props.taskInfo))
                    }
                    onPress={() => onTaskAddOrChange()}
				></MtButton>
			</AddButtonWrapper>
		</TaskAddWrapper>
	);
};

//---- default props

TaskAdd.defaultProps = {
	title: '',
	inputLabel: '',
	buttonLabel: '',
	prioritySelectOptions: {},
	taskInfo: {
		text: '',
		priority: 'low'
	}
};

//---- styles

const TaskAddWrapper = styled(View)`
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

const ProjectTaskTextInput = styled(View)`
	flex: 1;
	width: ${wp('92%')}px;
`;

const AddButtonWrapper = styled(View)`
	flex: 1;
	width: ${wp('92%')}px;
	margin: ${hp('1%')}px 0;
`;

//----

export default withTheme(TaskAdd);
