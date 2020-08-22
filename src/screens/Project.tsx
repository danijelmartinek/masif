import React, { useState } from 'react';
import { View, Text, Button, ScrollView, StatusBar } from 'react-native';
import styled, { withTheme } from 'styled-components';
import { connect, ConnectedProps } from 'react-redux';
import { setTheme } from '/redux/actions';

import Constants from 'expo-constants';

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from './index';

import Sheet from '/components/atoms/bottomSheet/';

import { SelectedTheme, ThemeMode } from '/styles/types';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from '/utils/dimensions';

const mapDispatch = {
	setTheme: (theme: ThemeMode) => setTheme(theme)
};
const connector = connect(null, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = StackScreenProps<RootStackParamList, 'Main'>;
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

	const toggleTheme = () => {
		if (props.theme.label === 'dark') {
			props.setTheme(ThemeMode.LIGHT);
			setStatusBarTheme('dark-content');
		} else {
			props.setTheme(ThemeMode.DARK);
			setStatusBarTheme('light-content');
		}
    };
    
    const sheetRef = React.useRef(null);

	return (
		<View
			style={{
                flex: 1,
                width: '100%',
                height: '100%',
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
            <Button
            title="Open Bottom Sheet"
            onPress={() => sheetRef?.current.snapTo(1)}
            />
            <Sheet ref={sheetRef} snapPoints={[0, hp('100%') + Constants.statusBarHeight]}>
                <ProjectsSheetContainer
                >
                    <Text>Swipe down to close</Text>
                </ProjectsSheetContainer>
            </Sheet>
            <Text>Project Page</Text>
		</View>
	);
};

//---- styles

const ProjectsSheetContainer = styled(View)`
    height: ${hp('100%') + Constants.statusBarHeight};
    width: ${wp('100%')};
    background-color: white;
`;

//----

export default connector(withTheme(MainScreen));
