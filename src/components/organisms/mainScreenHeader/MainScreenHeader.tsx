import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import styled, { withTheme } from 'styled-components';
import Constants from 'expo-constants';

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '/screens/index';

import Spacer from '/components/atoms/spacer/';
import TimeCounter from '/components/molecules/timeCounter/';
import Icon from '/components/atoms/icon/';
import Badge from '../../atoms/mtBadge';
import ProjectSheet from '/components/organisms/projectSheet/';

//---- types

import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from '/utils/dimensions';

import { SelectedTheme } from '/styles/types';

//---- types

type Props = StackScreenProps<RootStackParamList, 'Main'>;
type PropsWithTheme = Props & {
	theme: SelectedTheme;
};

//---- component

const MainScreenHeader = (props: PropsWithTheme) => {
	const sheetRef = React.useRef(null);

	return (
		<HeaderContainer>
			<Spacer
				height={Constants.statusBarHeight}
				width={wp('100%')}
			></Spacer>
			<HeaderWrapper>
				<TimeCounter></TimeCounter>
				<MenuButtonsWrapper>
					<MenuButton onPress={() => sheetRef?.current.snapTo(1)}>
						{/* <Icon type={'camp_tent'} color={'white'} size={hp('6%')}></Icon> */}
						<Badge
							icon={props.theme.project.icon}
							size={hp('7%')}
							primaryColor={
								props.theme.project.colors.projectPrimary
							}
							secondaryColor={
								props.theme.project.colors.projectSecondary
							}
						></Badge>
					</MenuButton>
				</MenuButtonsWrapper>
			</HeaderWrapper>
			<ProjectSheet
				ref={sheetRef}
				navigation={props.navigation}
				route={props.route}
			></ProjectSheet>
		</HeaderContainer>
	);
};

//---- styles

const HeaderContainer = styled(View)`
	position: absolute;
	z-index: 100;
	top: 0;
	width: ${wp('100%')}px;
	height: ${hp('20%')}px;
`;

const HeaderWrapper = styled(View)`
	flex-direction: row;
`;

const MenuButtonsWrapper = styled(View)`
	width: 50%;
	flex-direction: row;
	justify-content: flex-end;
	align-items: flex-start;
`;

const MenuButton = styled(TouchableOpacity)`
	padding: ${hp('1.5%')}px;
	align-self: center;
`;

//----

export default withTheme(MainScreenHeader);

// Copyright © 2020, Danijel Martinek. All rights reserved. 
// This project was created by Danijel Martinek (danijel@martinek.xyz) 