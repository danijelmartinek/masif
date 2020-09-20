import React, { useState } from 'react';
import { View, StatusBar } from 'react-native';
import { withTheme } from 'styled-components';
import { connect, ConnectedProps } from 'react-redux';
import { setTheme, setProjectTheme } from '/redux/actions';

import MainScreenTaskList from '/components/organisms/mainScreenTaskList/';
import MainScreenActions from '/components/organisms/mainScreenActions/';
import MainScreenHeader from '/components/organisms/mainScreenHeader/'

import MtGraphContainer from '/components/molecules/mtGraphContainer/';

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from './index';

import { SelectedTheme, ThemeMode } from '/styles/types';
import { StoreStateType } from '/redux/types'

const mapState = (state: StoreStateType) => ({
    DEFAULT_THEME: state.DEFAULT_THEME,
    THEME_OPTIONS: state.THEME_OPTIONS,
    ALL_PROJECTS: state.ALL_PROJECTS
})

const mapDispatch = {
    setTheme: (theme: ThemeMode) => setTheme(theme),
    setProjectTheme: () => setProjectTheme()
};
const connector = connect(mapState, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = StackScreenProps<RootStackParamList, 'Main'>;
type PropsWithTheme = Props &
	PropsFromRedux & {
		theme: SelectedTheme;
	};

const MainScreen = (props: PropsWithTheme) => {

    const [statusBarTheme, setStatusBarTheme] = useState<StatusBarStyleType>(
		'light-content'
	);

	return (
		<View
			style={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: props.theme.colors.primary,
				position: 'absolute'
			}}
		>
			<StatusBar
				translucent
				backgroundColor="transparent"
				barStyle={statusBarTheme}
			/>
            <MainScreenHeader navigation={props.navigation} route={props.route}></MainScreenHeader>
			<MtGraphContainer></MtGraphContainer>
            
            <MainScreenActions></MainScreenActions>
            <MainScreenTaskList></MainScreenTaskList>
		</View>
	);
};

//----

export default connector(withTheme(MainScreen));
