import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import styled, { withTheme } from 'styled-components';
import Constants from 'expo-constants';

import MtButton from '/components/atoms/mtButton/';

import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from '/utils/dimensions';

import { SelectedTheme } from '/styles/types';

type PropsWithTheme = {
	theme: SelectedTheme;
	checked: boolean;
};

const MainScreenActions = (props: PropsWithTheme) => {
	return (
		<ActionsContainer>
			<MtButton
				icon={'camp_tent'}
				activeOpacity={0.5}
				active={false}
				title="Stop"
			></MtButton>
			<MtButton
				icon={'hiking'}
				activeOpacity={0.5}
				active={false}
				title="Start"
			></MtButton>
			<MtButton
				icon={'camp_fire'}
				activeOpacity={0.5}
				active={false}
				title="Pause"
			></MtButton>
		</ActionsContainer>
	);
};

const ActionsContainer = styled(View)`
	width: ${wp('100%')}px;
	height: ${hp('10%')}px;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
	background-color: ${(props) => props.theme.colors.primary};
`;

export default withTheme(MainScreenActions);
