import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';

import Icon from '/components/atoms/icon/';

//---- types

type Props = {
	checked: boolean;
	size: number;
	taskCheckOpacity: number;
	flagColor: string;
    taskCheckColor: string;
    borderColor: string;
    text: string;
    activeOpacity?: number;
    onPress?: () => void;
};

//---- component

const TaskFinishedToggle = (props: Props) => {
	return (
		<TaskFinishedToggleWrapper borderColor={props.borderColor} activeOpacity={props.activeOpacity} onPress={props.onPress}>
			{props.checked ? (
				<Icon
					type={'task_check'}
					size={props.size}
					opacity={props.taskCheckOpacity}
					color={props.taskCheckColor}
				></Icon>
			) : (
				<Icon
					type={'flag'}
					flagColor={props.flagColor}
					text={props.text}
					size={props.size}
				></Icon>
			)}
		</TaskFinishedToggleWrapper>
	);
};

//---- default props

TaskFinishedToggle.defaultProps = {
	checked: false,
	size: 25,
	taskCheckOpacity: 1,
	flagColor: '#ffffff',
    taskCheckColor: '#ffffff',
    borderColor: '#ffffff',
    text: '',
    activeOpacity: 1
};

//---- styles

const TaskFinishedToggleWrapper = styled(TouchableOpacity)<{
	borderColor: string;
}>`
	flex: 1;
	align-items: center;
	justify-content: center;
	height: 100%;
	border-right-width: 1px;
	border-right-color: ${(props) => props.borderColor};
`;

//----

export default TaskFinishedToggle;
