import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled, { withTheme } from 'styled-components';

import TaskFinishedToggle from '/components/atoms/taskFinishedToggle';
import TaskItemText from '/components/atoms/taskItemText/';
import TaskItemInfo from '/components/atoms/taskItemInfo/';

import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from '/utils/dimensions';
import { hexToRGBA } from '/utils/colorFormat';

import { SelectedTheme } from '/styles/types';
import { TaskPriorityType } from '/components/molecules/taskPrioritySelect/index';

//---- types

type PropsWithTheme = {
	theme: SelectedTheme;
	checked?: boolean;
	text: string;
	priority: TaskPriorityType;
	activeOpacity?: number;
	checkActiveOpacity?: number;
	onPress?: () => void;
	onLongPress?: () => void;
	onCheckPress?: () => void;
};

//---- component

const TaskItem = (props: PropsWithTheme) => {
	return (
		<TaskItemWrapper
			onPress={props.onPress}
			onLongPress={props.onLongPress}
			activeOpacity={props.activeOpacity}
		>
			<TaskFinishedToggle
				onPress={props.onCheckPress}
				checked={props.checked}
				flagColor={'blue'}
				borderColor={hexToRGBA(props.theme.colors.textPrimary, 0.5)}
				taskCheckOpacity={0.5}
				taskCheckColor={props.theme.colors.textPrimary}
				activeOpacity={props.checkActiveOpacity}
			></TaskFinishedToggle>

			<TaskItemText
				text={props.text}
				textColor={props.theme.colors.textPrimary}
				textSize={props.theme.fonts.oSize.gamma.fontSize}
				padding={hp('1.5%')}
			></TaskItemText>

			<TaskItemInfo
				iconColor={props.theme.colors.textPrimary}
				iconSize={hp('2.5%')}
				textColor={
					props.priority === 'high'
						? 'red'
						: props.priority === 'medium'
						? 'yellow'
						: 'green'
				}
				textSize={props.theme.fonts.oSize.gamma.fontSize}
				text={props.priority}
			></TaskItemInfo>
		</TaskItemWrapper>
	);
};

//---- default props

TaskItem.defaultProps = {
	checked: false,
	text: '',
	priority: 'low',
	activeOpacity: 1,
	checkActiveOpacity: 1
};

//---- styles

const TaskItemWrapper = styled(TouchableOpacity)`
	flex-direction: row;
	width: 100%;
	height: ${hp('5%')}px;
	margin: ${hp('1%')}px 0px;
`;

//----

export default withTheme(TaskItem);
