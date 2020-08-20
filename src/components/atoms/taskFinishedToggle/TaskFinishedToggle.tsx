import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

import Icon from '/components/atoms/icon/';

import { hexToRGBA } from '/utils/colorFormat';

//---- types

type Props = {
	checked: boolean;
	size: number;
	taskCheckOpacity: number;
	flagColor: string;
	taskCheckColor: string;
	text: string;
};

//---- component

const TaskFinishedToggle = (props: Props) => {
	return (
		<TaskFinishedToggleWrapper borderColor={props.taskCheckColor}>
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
	text: ''
};

//---- styles

const TaskFinishedToggleWrapper = styled(View)<{
	borderColor: string;
}>`
	flex: 1;
	align-items: center;
	justify-content: center;
	height: 100%;
	border-right-width: 1px;
	border-right-color: ${(props) => hexToRGBA(props.borderColor, 0.5)};
`;

//----

export default TaskFinishedToggle;
