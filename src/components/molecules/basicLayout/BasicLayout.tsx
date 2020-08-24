import React, { FunctionComponentElement, ComponentElement } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TouchableOpacityComponent } from 'react-native';
import styled, { withTheme } from 'styled-components';
import Constants from 'expo-constants';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '/screens/';

import Spacer from '/components/atoms/spacer';

import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from '/utils/dimensions';

//---- types
import { SelectedTheme } from '/styles/types';

type ActionType = {
	onPress?: () => void;
	activeOpacity?: number;
	flex?: number | string;
	text?: string;
	textColor?: string;
	backgroundColor?: string;
};

type Props = StackScreenProps<RootStackParamList, keyof RootStackParamList>;
type PropsWithTheme = Props & {
	theme: SelectedTheme;
	screenName?: string;
	backButton?: boolean;
	headerActionButton?: boolean;
    headerActionButtonSettings?: [string, string, string, number];
    headerActionButtonOnPress?: () => void;
	topBar?: boolean;
	children?: FunctionComponentElement<any> | ComponentElement<any, any>;
	actions?: ActionType[];
};

//---- component

const BasicLayout = (props: PropsWithTheme) => {
	return (
		<LayoutContainer>
			<Spacer
				width={wp('100%')}
				height={Constants.statusBarHeight}
			></Spacer>
			{props.topBar ? (
				<TopBarContainer>
					{props.backButton ? (
						<BackButton onPress={() => props.navigation.goBack()}>
							<TextBack>BACK</TextBack>
						</BackButton>
					) : (
						<BackButtonDummy></BackButtonDummy>
					)}
					<ScreenHeader>
						{props.screenName ? props.screenName : props.route.name}
					</ScreenHeader>
					{props.headerActionButton ? (
						<HeaderActionButton
							onPress={props.headerActionButtonOnPress}
                            bgColor={props.headerActionButtonSettings ? props.headerActionButtonSettings[2] : '#ffffff'}
                            activeOpacity={props.headerActionButtonSettings ? props.headerActionButtonSettings[3] : 1}
						>
                            <HeaderActionButtonText color={props.headerActionButtonSettings ? props.headerActionButtonSettings[1] : '#000000'}>
                                {props.headerActionButtonSettings ? props.headerActionButtonSettings[0] : ''}
                            </HeaderActionButtonText>
						</HeaderActionButton>
					) : (
						<BackButtonDummy></BackButtonDummy>
					)}
				</TopBarContainer>
			) : null}
			<LayoutContent actionsEnabled={!!props.actions}>
				<ScrollView>{props.children}</ScrollView>
			</LayoutContent>
			{props.actions ? (
				<ActionsContainer>
					<ActionsWrapper>
						{props.actions.map((action, i) => (
							<ActionButton
								onPress={action.onPress || (() => true)}
								activeOpacity={action.activeOpacity || 1}
								bgColor={
									action.backgroundColor || 'transparent'
								}
								flex={action.flex || 1}
								key={Math.random() * i}
							>
								<ActionButtonText
									color={action.textColor || '#ffffff'}
								>
									{action.text || ''}
								</ActionButtonText>
							</ActionButton>
						))}
					</ActionsWrapper>
				</ActionsContainer>
			) : null}
		</LayoutContainer>
	);
};

//---- default props

BasicLayout.defaultProps = {
	screenName: '',
	backButton: true,
	headerActionButton: false,
    headerActionButtonSettings: ['', '#000000', '#ffffff', 1],
    headerActionButtonOnPress: () => true,
	topBar: true,
	children: null
};

//---- styles

const LayoutContainer = styled(View)`
	width: ${wp('100%')}px;
	height: ${hp('100%')}px;
`;

const TopBarContainer = styled(View)`
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	width: ${wp('100%')}px;
	height: ${hp('6%')}px;
	margin-bottom: ${hp('1%')}px;
`;

const BackButton = styled(TouchableOpacity)`
	width: ${wp('18%')}px;
	height: 100%;
	justify-content: center;
	align-items: flex-start;
	padding-left: ${hp('1.5%')}px;
`;

const BackButtonDummy = styled(TouchableOpacity)`
	width: ${wp('18%')}px;
	height: 100%;
`;

const TextBack = styled(Text)`
    ${(props) => props.theme.fonts.size.delta}
    color: ${(props) => props.theme.colors.textPrimary};
    font-weight: bold;
`;

const HeaderActionButton = styled(TouchableOpacity)<{
    bgColor: string
}>` 
    justify-content: center;
    align-items: center;
    border-radius: ${hp('0.5%')}px;
    padding: ${hp('1%')}px  ${hp('2%')}px; 
    background-color: ${(props) => props.bgColor};
`;

const HeaderActionButtonText = styled(Text)<{
    color: string,
}>`
    ${(props) => props.theme.fonts.size.delta}
    color: ${(props) => props.color};
    font-weight: bold;
`;

const ScreenHeader = styled(Text)`
    ${(props) => props.theme.fonts.size.beta}
    color: ${(props) => props.theme.colors.textPrimary};
    width: ${wp('64%')}px;
    text-align: center;
    align-self: center;
`;

const LayoutContent = styled(View)<{
	actionsEnabled: boolean;
}>`
	width: ${wp('100%')}px;
	height: ${(props) =>
		props.actionsEnabled
			? hp('85%') - Constants.statusBarHeight
			: hp('94%') - Constants.statusBarHeight}px;
`;

const ActionsContainer = styled(View)`
	position: absolute;
	align-items: center;
	justify-content: center;
	width: ${wp('100%')}px;
	height: ${hp('8%')}px;
	bottom: 0;
`;

const ActionsWrapper = styled(View)`
	width: 100%;
	height: 100%;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	padding: ${hp('1.5%')}px;
`;

const ActionButton = styled(TouchableOpacity)<{
	flex: number | string;
	bgColor: string;
}>`
    flex: ${(props) => props.flex}};
    padding: ${hp('1%')}px;
    background-color: ${(props) => props.bgColor};
    border-radius: ${hp('0.5%')}px;
`;

const ActionButtonText = styled(Text)<{
	color: string;
}>`
	align-self: center;
	text-transform: uppercase;
	color: ${(props) => props.color};
	${(props) => props.theme.fonts.size.gama}
`;

//----

export default withTheme(BasicLayout);
