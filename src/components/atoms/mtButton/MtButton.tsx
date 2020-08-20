import React from 'react';
import { View, Button, StyleSheet, TouchableOpacity, Text } from 'react-native';
import styled, { withTheme } from 'styled-components';

import { SelectedTheme, ThemeMode } from '/styles/types';

import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from '/utils/dimensions';

//---- types

type Props = {
    title: string;
    active: boolean;
    backgroundColor: string;
    activeBackgroundColor: string;
    textColor: string;
    activeTextColor: string;
    activeOpacity: number;
}
type PropsWithTheme = Props & {
	theme: SelectedTheme;
};

//---- component

let active = false;

const MtButton = (props: PropsWithTheme) => {
    active = props.active;

	return (
        <TouchableOpacity activeOpacity={props.activeOpacity}>
            <MtButtonWrapper
                backgroundColor={props.backgroundColor}
                activeBackgroundColor={props.activeBackgroundColor}
            >
                <props.icon color={(active ? props.activeTextColor : props.textColor)}></props.icon>
                <MtButtonText
                    textColor={props.textColor}
                    activeTextColor={props.activeTextColor}
            >{props.title}</MtButtonText>
            </MtButtonWrapper>
        </TouchableOpacity>
	);
};

//---- default props

MtButton.defaultProps = {
    active: false,
    backgroundColor: '#0000ff',
    activeBackgroundColor: '#ff0000',
    textColor: '#ffffff',
    activeTextColor: '#000000',
    activeOpacity: 1,
    icon: View
}

//---- styles

const MtButtonWrapper = styled(View)`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: ${hp('1.2%')}px ${hp('3%')}px;
    border-radius: 5px;
    width: ${wp('28%')}px;
    background-color: ${(props) =>
		active ? props.activeBackgroundColor : props.backgroundColor};
`;

const MtButtonText = styled(Text)`
    padding-left: 10px;
    color: ${(props) =>
        active ? props.activeTextColor : props.textColor};
    ${(props) => props.theme.fonts.size.gamma};
    font-weight: bold;
`; 

//----

export default withTheme(MtButton);
