import React from 'react';
import { View } from 'react-native';
import styled, { withTheme } from 'styled-components';

import MtButton from '/components/atoms/mtButton/';

//---- types

import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from '/utils/dimensions';

import { SelectedTheme } from '/styles/types';

type PropsWithTheme = {
	theme: SelectedTheme;
};

//---- component

const MainScreenActions = (props: PropsWithTheme) => {
	return (
		<ActionsContainer>
			<MtButton
                size={props.theme.fonts.oSize.gamma.fontSize}
				icon={'camp_tent'}
				activeOpacity={0.5}
				active={false}
				title="Stop"
			></MtButton>
			<MtButton
                size={props.theme.fonts.oSize.gamma.fontSize}
				icon={'hiking'}
				activeOpacity={0.5}
				active={false}
				title="Start"
			></MtButton>
			<MtButton
                size={props.theme.fonts.oSize.gamma.fontSize}
				icon={'camp_fire'}
				activeOpacity={0.5}
				active={false}
				title="Pause"
			></MtButton>
		</ActionsContainer>
	);
};

//---- styles

const ActionsContainer = styled(View)`
	width: ${wp('100%')}px;
	height: ${hp('10%')}px;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
	background-color: ${(props) => props.theme.colors.primary};
`;

//----

export default withTheme(MainScreenActions);
