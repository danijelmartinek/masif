import React from 'react';
import { View, Text } from 'react-native';
import styled, { withTheme } from 'styled-components';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Constants from 'expo-constants';

import Spacer from '/components/atoms/spacer/';
import Icon from '/components/atoms/icon/';
import Badge from '../../atoms/mtBadge';

import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from '/utils/dimensions';
import { hexToRGBA } from '/utils/colorFormat';

import { SelectedTheme } from '/styles/types';

//---- types

type PropsWithTheme = {
	theme: SelectedTheme;
};

//---- component

const SelectedProjectInfo = (props: PropsWithTheme) => {
	return (
		<SelectedProjectInfoContainer>
			<Spacer
				height={Constants.statusBarHeight}
				width={wp('100%')}
			></Spacer>
			<SelectedProjectBadge>
				<Badge icon={'hiking'} size={hp('10%')}></Badge>
			</SelectedProjectBadge>
			<SelectedProjectName>Lorem ipsum</SelectedProjectName>
			<SelectedProjectDetails>
				<SelectedProjectDetailsItem>
					<DetailHeading>Start Date</DetailHeading>
					<DetailInfo>19 / 03 / 2020</DetailInfo>
				</SelectedProjectDetailsItem>
				<SelectedProjectDetailsItem>
					<DetailHeading>Start Date</DetailHeading>
					<DetailInfo>19 / 03 / 2020</DetailInfo>
				</SelectedProjectDetailsItem>
				<SelectedProjectDetailsItem>
					<DetailHeading>Start Date</DetailHeading>
					<DetailInfo>19 / 03 / 2020</DetailInfo>
				</SelectedProjectDetailsItem>
			</SelectedProjectDetails>
			<ProjectSheetActionIcons>
				<ActionIcon1Wrapper>
					<Icon
						type={'edit'}
						color={props.theme.colors.textPrimary}
					></Icon>
				</ActionIcon1Wrapper>
				<ActionIcon2Wrapper>
					<Icon
						type={'close'}
						color={props.theme.colors.textPrimary}
					></Icon>
				</ActionIcon2Wrapper>
			</ProjectSheetActionIcons>
		</SelectedProjectInfoContainer>
	);
};

//---- default props

//---- styles

const SelectedProjectInfoContainer = styled(View)`
    align-items: center;
	justify-content: center;
	width: ${wp('100%')}px;
	height: ${hp('40%')}px;
	background-color: blue;
`;

const SelectedProjectBadge = styled(View)`
	align-items: center;
	justify-content: center;
	width: ${wp('100%')}px;
	height: ${hp('15%')}px;
`;

const SelectedProjectName = styled(Text)`
	${(props) => props.theme.fonts.size.beta};
	color: ${(props) => props.theme.colors.textPrimary};
	height: ${hp('5%')}px;
	font-weight: bold;
`;

const SelectedProjectDetails = styled(View)`
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
	width: ${wp('100%')}px;
	height: ${hp('20%') - Constants.statusBarHeight}px;
`;

const SelectedProjectDetailsItem = styled(View)`
	align-items: center;
	justify-content: center;
`;

const DetailHeading = styled(Text)`
	${(props) => props.theme.fonts.size.delta};
	color: ${(props) => hexToRGBA(props.theme.colors.textPrimary, 0.75)};
	font-weight: bold;
	text-transform: uppercase;
`;

const DetailInfo = styled(Text)`
	${(props) => props.theme.fonts.size.gamma};
	color: ${(props) => props.theme.colors.textPrimary};
	font-weight: bold;
`;

const ProjectSheetActionIcons = styled(View)`
	position: absolute;
	flex-direction: row;
	top: ${Constants.statusBarHeight}px;
	width: ${wp('100%')}px;
`;

const ActionIcon1Wrapper = styled(TouchableOpacity)`
	width: ${wp('50%')}px;
	align-items: flex-start;
	padding: ${wp('5%')}px;
`;

const ActionIcon2Wrapper = styled(TouchableOpacity)`
	width: ${wp('50%')}px;
	align-items: flex-end;
	padding: ${wp('5%')}px;
`;
//----

export default withTheme(SelectedProjectInfo);
