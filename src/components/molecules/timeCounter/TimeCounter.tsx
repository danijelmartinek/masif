import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import styled, { withTheme } from 'styled-components';
import CounterContext from '/context/counter';

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
	const { ActiveCounterRef, PauseCounterRef } = useContext(CounterContext);

	const formatDoubleDigit = (a: number) => {
		return String(a).length === 2 ? a : `0${a}`;
	};

	const returnTime = (counterRef: any) => {
		let hh = ActiveCounterRef.hours
			? String(formatDoubleDigit(ActiveCounterRef.hours)) + ':'
			: '';
		return (
			hh +
			String(formatDoubleDigit(counterRef.minutes)) +
			':' +
			String(formatDoubleDigit(counterRef.seconds))
		);
	};

	return (
		<TimeCounterContainer>
			{/* <CounterIndicator><Text style={{color: "white"}}>i</Text></CounterIndicator> */}
			<CounterWrapper>
				<ActivityTime>{returnTime(ActiveCounterRef)}</ActivityTime>
				<PauseTime>{returnTime(PauseCounterRef)}</PauseTime>
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
    margin-top: ${-hp('1.5%')}px;
	padding-left: ${hp('1%')}px;
`;

const ActivityTime = styled(Text)`
    ${(props) => props.theme.fonts.size.mega}
	color: white;
`;

const PauseTime = styled(Text)`
    ${(props) => props.theme.fonts.size.alpha}
    margin-top: ${-hp('2%')}px;
    margin-left: ${wp('1%')}px;
	color: white;
`;

//----

export default withTheme(TimeCounter);
