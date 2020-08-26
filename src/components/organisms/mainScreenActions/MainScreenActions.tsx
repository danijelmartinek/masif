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
                textColor={props.theme.colors.primary}
                backgroundColor={props.theme.colors.textPrimary}
                activeTextColor={props.theme.colors.textPrimary}
                activeBackgroundColor={props.theme.project.colors.projectPrimary}
			></MtButton>
			<MtButton
                size={props.theme.fonts.oSize.gamma.fontSize}
				icon={'hiking'}
				activeOpacity={1}
				active={true}
                title={'Start'}
                textColor={props.theme.colors.primary}
                backgroundColor={props.theme.colors.textPrimary}
                activeTextColor={props.theme.colors.textPrimary}
                activeBackgroundColor={props.theme.project.colors.projectPrimary}
			></MtButton>
			<MtButton
                size={props.theme.fonts.oSize.gamma.fontSize}
				icon={'camp_fire'}
				activeOpacity={0.5}
				active={false}
                title="Pause"
                textColor={props.theme.colors.primary}
                backgroundColor={props.theme.colors.textPrimary}
                activeTextColor={props.theme.colors.textPrimary}
                activeBackgroundColor={props.theme.project.colors.projectPrimary}
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
	background-color: ${(props) => props.theme.colors.tertiary};
`;

//----

export default withTheme(MainScreenActions);
