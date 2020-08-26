import React from 'react';
import { View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled from 'styled-components';

import Badge from '../../atoms/mtBadge';

//---- types

type Props = {
	width: number;
	color: string;
	primaryTextColor: string;
	secondaryTextColor: string;
	primaryTextSize: number;
	secondaryTextSize: number;
	primaryTextLineHeight: number;
	secondaryTextLineHeight: number;
	primaryText: string;
	secondaryText: string;
	badge: [string, string, string];
	activeOpacity?: number;
	onPress?: () => void;
};

//---- component

const ProjectListItem = (props: Props) => {
	return (
		<ProjectItem
			width={props.width}
			color={props.color}
			activeOpacity={props.activeOpacity}
			onPress={props.onPress}
		>
			<ProjectBadge>
				<Badge
					icon={props.badge[0]}
					primaryColor={props.badge[1]}
					secondaryColor={props.badge[2]}
				></Badge>
			</ProjectBadge>
			<ProjectInfo width={props.width}>
				<ProjectName
					primaryTextSize={props.primaryTextSize}
					primaryTextLineHeight={props.primaryTextLineHeight}
					primaryTextColor={props.primaryTextColor}
				>
					{props.primaryText}
				</ProjectName>
				<LastActivity
					secondaryTextSize={props.secondaryTextSize}
					secondaryTextLineHeight={props.secondaryTextLineHeight}
					secondaryTextColor={props.secondaryTextColor}
				>
					{props.secondaryText}
				</LastActivity>
			</ProjectInfo>
		</ProjectItem>
	);
};

//---- default props

ProjectListItem.defaultProps = {
	width: 100,
	color: '#ffffff',
	primaryTextColor: '#000000',
	secondaryTextColor: '#000000',
	primaryTextSize: 16,
	secondaryTextSize: 14,
	primaryTextLineHeight: 16,
	secondaryTextLineHeight: 14,
	primaryText: '',
	secondaryText: '',
	badge: ['hiking', '#004A8E', '#FF922E'],
	activeOpacity: 1
};

//---- styles

const ProjectItem = styled(TouchableOpacity)<{
	// selected: boolean,
	width: number;
	color: string;
}>`
	flex-direction: row;
	align-items: center;
	width: ${(props) => props.width * 0.96}px;
	padding: ${(props) => props.width * 0.02}px;
	margin: ${(props) => props.width * 0.02}px;
	border-radius: ${(props) => props.width * 0.01}px;
	background-color: ${(props) => props.color};
`;
// ${(props) =>
//     props.selected ? `margin: ${wp('1.5%')}px;` : `margin: ${wp('2%')}px;`};
// ${(props) => (props.selected ? `border: ${wp('0.5%')}px solid red;` : '')};

const ProjectBadge = styled(View)`
	flex: 1;
	align-items: center;
`;

const ProjectInfo = styled(View)<{
	width: number;
}>`
	width: ${(props) => (props.width * 0.96) / 2}px;
	flex: 4;
	justify-content: center;
`;

const ProjectName = styled(Text)<{
	primaryTextSize: number;
	primaryTextLineHeight: number;
	primaryTextColor: string;
}>`
	font-size: ${(props) => props.primaryTextSize}px;
	line-height: ${(props) => props.primaryTextLineHeight}px;
	font-weight: bold;
	color: ${(props) => props.primaryTextColor};
`;

const LastActivity = styled(Text)<{
	secondaryTextSize: number;
	secondaryTextLineHeight: number;
	secondaryTextColor: string;
}>`
	font-size: ${(props) => props.secondaryTextSize}px;
	line-height: ${(props) => props.secondaryTextLineHeight}px;
	color: ${(props) => props.secondaryTextColor};
`;

//----

export default ProjectListItem;
