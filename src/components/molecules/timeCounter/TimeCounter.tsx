import React from 'react';
import { View, Text } from 'react-native';
import styled, { withTheme } from 'styled-components';

import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from '/utils/dimensions';

import { SelectedTheme } from '/styles/types';

//---- types

type PropsWithTheme = {
	theme: SelectedTheme;
};

//---- component

const TimeCounter = (props: PropsWithTheme) => {
	return (
		<TimeCounterContainer>
            {/* <CounterIndicator><Text style={{color: "white"}}>i</Text></CounterIndicator> */}
            <CounterWrapper>
                <ActivityTime>00:00</ActivityTime>
                <PauseTime>00</PauseTime>
            </CounterWrapper>
		</TimeCounterContainer>
	);
};

//---- styles

const TimeCounterContainer = styled(View)`
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 50%;
    height: 100%;
`;

// const CounterIndicator = styled(View)`
//     flex: 1;
// `;

const CounterWrapper = styled(View)`
    flex: 4;
    flex-direction: column;
    height: 100%;
    padding-left: ${hp('1%')}px;
`;

const ActivityTime = styled(Text)`
    color: white;
    font-size: ${hp('5%')}px;
`;

const PauseTime = styled(Text)`
    color: white;
    font-size: ${hp('2.5%')}px;
`;

//----

export default withTheme(TimeCounter);
