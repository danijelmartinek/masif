import React, { useState } from 'react';
import { View, Text, Button, ScrollView, StatusBar } from 'react-native';
import styled, { withTheme } from 'styled-components';
import { connect, ConnectedProps } from 'react-redux';
import { setTheme, setProjectTheme } from '/redux/actions';
import Constants from 'expo-constants';

import Main from './Main';

import MainScreenTaskList from '/components/organisms/mainScreenTaskList/';
import MainScreenActions from '/components/organisms/mainScreenActions/';
import MainScreenHeader from '/components/organisms/mainScreenHeader/'

import MtGraphContainer from '/components/molecules/mtGraphContainer/';

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from './index';

import { SelectedTheme, ThemeMode } from '/styles/types';
import { StoreStateType } from '/redux/types'

import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from '/utils/dimensions';


const mapState = (state: StoreStateType) => ({
    DEFAULT_THEME: state.DEFAULT_THEME,
    THEME_OPTIONS: state.THEME_OPTIONS,
    ALL_PROJECTS: state.ALL_PROJECTS,
    SELECTED_PROJECT_ID: state.SELECTED_PROJECT
})

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
    
    React.useEffect(()=> {
        if(props.SELECTED_PROJECT_ID) {
            props.navigation.navigate('Main');
        } else {
            props.navigation.navigate('Hello');
        }
    }, [])

	const toggleTheme = () => {
		// if (props.theme.label === 'dark') {
		// 	props.setTheme(ThemeMode.LIGHT);
		// 	setStatusBarTheme('dark-content');
		// } else {
		// 	props.setTheme(ThemeMode.DARK);
		// 	setStatusBarTheme('light-content');
        // }
        
        // props.setProjectTheme();
        // console.log(props.ALL_PROJECTS);
	};

	return (
        <View
        style={{
            flex: 1,
            width: wp('100%'),
            height: hp('100%') + Constants.statusBarHeight,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: props.theme.colors.primary,
            position: 'absolute'
        }}>
		</View>
	);
};

//---- styles


//----

export default connector(withTheme(MainScreen));
