import React from 'react';
import { View } from 'react-native';
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

//---- types

export enum PriorityVariants {
	high,
	medium,
	low
}

type PropsWithTheme = {
	theme: SelectedTheme;
	checked: boolean;
	text: string;
	priority: PriorityVariants;
};

//---- component

const TaskItem = (props: PropsWithTheme) => {
	return (
		<TaskItemWrapper>
			<TaskFinishedToggle
				checked={props.checked}
                flagColor={'blue'}
                borderColor={hexToRGBA(props.theme.colors.textPrimary, 0.5)}
				taskCheckOpacity={0.5}
				taskCheckColor={props.theme.colors.textPrimary}
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
					PriorityVariants[props.priority] === 'high'
						? 'red'
						: PriorityVariants[props.priority] === 'medium'
						? 'yellow'
						: 'green'
				}
				textSize={props.theme.fonts.oSize.gamma.fontSize}
				text={PriorityVariants[props.priority]}
			></TaskItemInfo>
		</TaskItemWrapper>
	);
};

//---- default props

TaskItem.defaultProps = {
	checked: false,
	text: '',
	priority: 'low'
};

//---- styles

const TaskItemWrapper = styled(View)`
	flex-direction: row;
	width: ${wp('100%')}px;
	height: ${hp('5%')}px;
	margin: ${hp('1%')}px 0px;
`;

//----

export default withTheme(TaskItem);
