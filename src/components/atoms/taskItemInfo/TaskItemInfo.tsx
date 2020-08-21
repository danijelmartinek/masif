import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';

import Icon from '/components/atoms/icon/';

//---- types

type Props = {
	iconColor: string;
	iconSize: number;
	textColor: string;
	textSize: number;
	text: string;
};

//---- component

const TaskItemInfo = (props: Props) => {
	return (
		<TaskItemInfoWrapper>
			<Icon
				type={'flame'}
				color={props.iconColor}
				size={props.iconSize}
			></Icon>
			<PriorityText
				color={props.textColor}
				size={props.textSize}
				iconSize={props.iconSize}
			>
				{props.text}
			</PriorityText>
		</TaskItemInfoWrapper>
	);
};

//---- default props

TaskItemInfo.defaultProps = {
	iconColor: '#ffffff',
	iconSize: 25,
	textColor: '#ffffff',
	textSize: 16,
	text: ''
};

//---- styles

const TaskItemInfoWrapper = styled(View)`
	flex: 2;
	flex-direction: row;
	align-items: center;
	height: 100%;
`;

const PriorityText = styled(Text)<{
	size: number,
	iconSize: number,
	color: string
}>`
	font-size: ${(props) => props.size}px;
	color: ${(props) => props.color};
	margin-left: ${(props) => props.size * 0.15}px;
`;

//----

export default TaskItemInfo;
