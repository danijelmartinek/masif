import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styled, { withTheme } from 'styled-components';

import TaskItemInfo from '/components/atoms/taskItemInfo/';

import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from '/utils/dimensions';

import { SelectedTheme } from '/styles/types';

//---- types

export type TaskPriorityType = 'high' | 'medium' | 'low';

export type TaskPrioritySelectProps = {
	priority?: TaskPriorityType;
	title: string;
	activeOpacity?: number;
	onPress?: (priority: TaskPriorityType) => void;
};

type PropsWithTheme = TaskPrioritySelectProps & {
	theme: SelectedTheme;
};

//---- component

const TaskPrioritySelect = (props: PropsWithTheme) => {
    const [prioritySelected, setPrioritySelected] = React.useState<TaskPriorityType>(props.priority || 'low');
    
    React.useEffect(() => {
        if(props.priority && props.priority !== prioritySelected) {
            setPrioritySelected(props.priority);
        }
    })

	const handleOnPress = (selectedPriority: TaskPriorityType): void => {
		setPrioritySelected(selectedPriority);
		props.onPress ? props.onPress(selectedPriority) : null;
	};

	return (
		<PrioritySelectWrapper>
			<PrioritySelectHeading>{props.title}</PrioritySelectHeading>

			<TaskPrioritySelectItems>
				<PriorityItem
					activeOpacity={props.activeOpacity}
					selectBackgroundColor={
						prioritySelected === 'low'
							? props.theme.colors.semantic.success
							: props.theme.colors.tertiary
					}
					onPress={() => handleOnPress('low')}
				>
					<TaskItemInfo
						iconColor={props.theme.colors.textPrimary}
						iconSize={hp('2.5%')}
						textColor={
							prioritySelected === 'low'
								? props.theme.colors.textPrimary
								: props.theme.colors.semantic.success
						}
						textSize={props.theme.fonts.oSize.gamma.fontSize}
						text={'Low'}
					></TaskItemInfo>
				</PriorityItem>

				<PriorityItem
					activeOpacity={props.activeOpacity}
					selectBackgroundColor={
						prioritySelected === 'medium'
							? props.theme.colors.semantic.warning
							: props.theme.colors.tertiary
					}
					onPress={() => handleOnPress('medium')}
				>
					<TaskItemInfo
						iconColor={
							prioritySelected === 'medium'
								? props.theme.colors.primary
								: props.theme.colors.textPrimary
						}
						iconSize={hp('2.5%')}
						textColor={
							prioritySelected === 'medium'
								? props.theme.colors.primary
								: props.theme.colors.semantic.warning
						}
						textSize={props.theme.fonts.oSize.gamma.fontSize}
						text={'Medium'}
					></TaskItemInfo>
				</PriorityItem>

				<PriorityItem
					activeOpacity={props.activeOpacity}
					selectBackgroundColor={
						prioritySelected === 'high'
							? props.theme.colors.semantic.error
							: props.theme.colors.tertiary
					}
					onPress={() => handleOnPress('high')}
				>
					<TaskItemInfo
						iconColor={props.theme.colors.textPrimary}
						iconSize={hp('2.5%')}
						textColor={
							prioritySelected === 'high'
								? props.theme.colors.textPrimary
								: props.theme.colors.semantic.error
						}
						textSize={props.theme.fonts.oSize.gamma.fontSize}
						text={'High'}
					></TaskItemInfo>
				</PriorityItem>
			</TaskPrioritySelectItems>
		</PrioritySelectWrapper>
	);
};

//---- default props

TaskPrioritySelect.defaultProps = {
	priority: 'low',
	title: '',
	activeOpacity: 1
};

//---- styles

const PrioritySelectWrapper = styled(View)`
	flex: 6;
	justify-content: center;
	height: 100%;
`;

const TaskPrioritySelectItems = styled(View)`
	flex: 1;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
`;

const PriorityItem = styled(TouchableOpacity)<{
	selectBackgroundColor: string;
}>`
	width: ${wp('25%')}px;
	height: ${hp('6%')}px;
	align-items: center;
	justify-content: center;
	margin: ${hp('2.5%')}px;
	border-radius: ${hp('0.5%')}px;
	background-color: ${(props) => props.selectBackgroundColor};
`;

const PrioritySelectHeading = styled(Text)`
	${(props) => props.theme.fonts.size.delta};
	color: ${(props) => props.theme.colors.textPrimary};
	align-self: flex-start;
	padding-left: ${hp('2.2%')}px;
	text-transform: uppercase;
	opacity: 0.5;
`;
//----

export default withTheme(TaskPrioritySelect);
