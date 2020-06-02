import * as React from 'react';
import { View, Text, Button } from 'react-native';
import styled, { withTheme } from 'styled-components';
import { connect, ConnectedProps } from 'react-redux';
import { setTheme } from '/redux/actions';

import MtGraph from '/components/atoms/mtGraph/'

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from './index';

import { SelectedTheme, ThemeMode } from '/styles/types';

const mapDispatch = {
    setTheme: (theme: ThemeMode) => setTheme(theme)
}
const connector = connect(null, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>
type Props = StackScreenProps<RootStackParamList, 'Main'>;
type PropsWithTheme = Props & PropsFromRedux & {
    theme: SelectedTheme
}

const MainScreen = (props: PropsWithTheme) => {
    const toggleTheme = () => {
        if(props.theme.label === 'dark') {
            props.setTheme(ThemeMode.LIGHT);
        } else {
            props.setTheme(ThemeMode.DARK);
        }

    }
	return (
		<View
			style={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center',
				backgroundColor: props.theme.colors.primary,
			}}
		>
			<Text style={{color: props.theme.colors.textPrimary}}>Lorem Ipsum</Text>
            <Button title="Toggle Theme" onPress={() => toggleTheme()}></Button>
            <MtGraph></MtGraph>
		</View>
	);
};

export default connector(withTheme(MainScreen));
