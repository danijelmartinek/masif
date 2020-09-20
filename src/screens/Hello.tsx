import React, { useState } from 'react';
import { View, Text, StatusBar } from 'react-native';
import styled, { withTheme } from 'styled-components';
import { connect, ConnectedProps } from 'react-redux';
import { setTheme, setProjectTheme } from '/redux/actions';
import Constants from 'expo-constants';

import DirectionsIllustration from '/components/atoms/illustration/Directions';
import MasifLogo from '/components/atoms/illustration/MasifLogo';
import MtButton from '/components/atoms/mtButton/';

import { LinearGradient } from 'expo-linear-gradient';

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from './index';

import { SelectedTheme, ThemeMode } from '/styles/types';
import { StoreStateType } from '/redux/types';

import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from '/utils/dimensions';
import { hexToRGBA } from '/utils/colorFormat';

const mapState = (state: StoreStateType) => ({
	DEFAULT_THEME: state.DEFAULT_THEME,
	THEME_OPTIONS: state.THEME_OPTIONS,
	ALL_PROJECTS: state.ALL_PROJECTS,
	SELECTED_PROJECT_ID: state.SELECTED_PROJECT
});

const mapDispatch = {
	setTheme: (theme: ThemeMode) => setTheme(theme),
	setProjectTheme: () => setProjectTheme()
};
const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = StackScreenProps<RootStackParamList, 'Initial'>;
type PropsWithTheme = Props &
	PropsFromRedux & {
		theme: SelectedTheme;
	};
type StatusBarStyleType =
	| 'light-content'
	| 'dark-content'
	| 'default'
	| undefined;

const MainScreen = (props: PropsWithTheme) => {
	const [statusBarTheme, setStatusBarTheme] = useState<StatusBarStyleType>(
		'light-content'
	);

	React.useEffect(() => {
		if (props.SELECTED_PROJECT_ID) {
			props.navigation.navigate('Main');
		}
	}, [props.SELECTED_PROJECT_ID]);

	return (
		<View
			style={{
				flex: 1,
				width: wp('100%'),
				height: hp('100%') + Constants.statusBarHeight,
				backgroundColor: props.theme.colors.primary,
				position: 'absolute',
				alignItems: 'center'
			}}
		>
			<StatusBar
				translucent
				backgroundColor="transparent"
				barStyle={statusBarTheme}
			/>
			<DirectionsIllustrationContainer>
				<DirectionsIllustration
					height={hp('40%')}
				></DirectionsIllustration>
				<LinearGradient
					style={{
						height: hp('40%'),
						width: wp('100%'),
                        position: 'absolute',
                        bottom: 0
					}}
					colors={[
						hexToRGBA(props.theme.colors.primary, 0.95),
						hexToRGBA(props.theme.colors.primary, 0.75),
						hexToRGBA(props.theme.colors.primary, 0.15),
					]}
					start={{ x: 0, y: 1 }}
					end={{ x: 0, y: 0 }}
				></LinearGradient>
			</DirectionsIllustrationContainer>
			<LogoContainer>
				<MasifLogo height={hp('30%')}></MasifLogo>
			</LogoContainer>
			<WelcomeText>Welcome!</WelcomeText>
			<ButtonContainer>
				<ButtonLabelText>Please create new project</ButtonLabelText>
				<MtButton
					size={props.theme.fonts.oSize.gamma.fontSize}
					activeOpacity={0.5}
					title={'CREATE PROJECT'}
					textColor={props.theme.colors.textPrimary}
					backgroundColor={'#002D56'}
					onPress={() => props.navigation.navigate('NewProject')}
					fullWidth={true}
				></MtButton>
			</ButtonContainer>
		</View>
	);
};

//---- styles

const DirectionsIllustrationContainer = styled(View)`
	height: ${hp('30%')}px;
	width: ${wp('100%')}px;
	position: absolute;
	bottom: 0;
	align-items: center;
	justify-content: center;
`;

const LogoContainer = styled(View)`
	height: ${hp('40%')}px;
	width: ${wp('100%')}px;
	align-items: center;
	justify-content: center;
`;

const WelcomeText = styled(Text)`
	${(props) => props.theme.fonts.size.mega}
	color: ${(props) => props.theme.colors.textPrimary};
	height: ${hp('10%')}px;
	width: ${wp('100%')}px;
	align-items: center;
	justify-content: center;
	text-align: center;
	font-weight: bold;
`;

const ButtonContainer = styled(View)`
	height: ${hp('20%')}px;
	width: ${wp('80%')}px;
	align-items: center;
	justify-content: center;
`;

const ButtonLabelText = styled(Text)`
	color: ${(props) => props.theme.colors.textPrimary};
	padding: ${hp('1.5%')}px;
	opacity: 0.5;
`;

//----

export default connector(withTheme(MainScreen));
