import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import styled, { withTheme } from 'styled-components';
import Constants from 'expo-constants';

import Spacer from '/components/atoms/spacer/';
import TimeCounter from '/components/molecules/timeCounter/';
import Icon from '/components/atoms/icon/';

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

const MainScreenHeader = (props: PropsWithTheme) => {
	return (
		<HeaderContainer>
            <Spacer height={Constants.statusBarHeight} width={wp('100%')}></Spacer>
            <HeaderWrapper>
                <TimeCounter></TimeCounter>
                <MenuButtonsWrapper>
                    <MenuButton>
                        <Icon type={'camp_tent'} color={'white'} size={hp('6%')}></Icon>
                    </MenuButton>
                    <MenuButton>
                        <Icon type={'hamburger'} color={'white'} size={hp('6%')}></Icon>
                    </MenuButton>
                </MenuButtonsWrapper> 
            </HeaderWrapper>
		</HeaderContainer>
	);
};

//---- styles

const HeaderContainer = styled(View)`
    position: absolute;
    z-index: 100;
    top: 0;
	width: ${wp('100%')}px;
	height: ${hp('20%')}px;
`;

const HeaderWrapper = styled(View)`
    flex-direction: row;
`;

const MenuButtonsWrapper = styled(View)`
    width: 50%;
    flex-direction: row;
    justify-content: flex-end;
`;

const MenuButton = styled(TouchableOpacity)`
    padding: ${hp('1.5%')}px;
`;

//----

export default withTheme(MainScreenHeader);
