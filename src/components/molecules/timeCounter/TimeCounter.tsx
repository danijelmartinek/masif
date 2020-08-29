import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import styled, { withTheme } from 'styled-components';
import CounterContext from '/context/counter';
import moment from 'moment';

import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from '/utils/dimensions';
import { hexToRGBA } from '/utils/colorFormat';

import { SelectedTheme } from '/styles/types';

//---- types

type PropsWithTheme = {
	theme: SelectedTheme;
};

//---- component

const TimeCounter = (props: PropsWithTheme) => {
	const { activeCounter, pauseCounter } = useContext(CounterContext);

	// const formatDoubleDigit = (a: number) => {
	// 	return String(a).length === 2 ? a : `0${a}`;
	// };

	// const returnTime = (counterRef: any) => {
	// 	let hh = ActiveCounterRef.hours
	// 		? String(formatDoubleDigit(ActiveCounterRef.hours)) + ':'
	// 		: '';
	// 	return (
	// 		hh +
	// 		String(formatDoubleDigit(counterRef.minutes)) +
	// 		':' +
	// 		String(formatDoubleDigit(counterRef.seconds))
	// 	);
	// };

	return (
		<TimeCounterContainer>
			{/* <CounterIndicator><Text style={{color: "white"}}>i</Text></CounterIndicator> */}
			<CounterWrapper>
				<ActivityTime>
                    <ActiveHoursAndMinutes>{moment("1900-01-01 00:00:00").add(activeCounter, 'seconds').format("HH:mm")}</ActiveHoursAndMinutes>
                    <ActiveSeconds>{moment("1900-01-01 00:00:00").add(activeCounter, 'seconds').format("ss")}</ActiveSeconds>
                </ActivityTime>
                <PauseTime>
                    <PauseHoursAndMinutes>{moment("1900-01-01 00:00:00").add(pauseCounter, 'seconds').format("HH:mm")}</PauseHoursAndMinutes>
                    <PauseSeconds>{moment("1900-01-01 00:00:00").add(pauseCounter, 'seconds').format("ss")}</PauseSeconds>
                </PauseTime>
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

const ActivityTime = styled(View)`
    flex-direction: row;
`;

const PauseTime = styled(View)`
    flex-direction: row;
    margin-top: ${-hp('2%')}px;
    margin-left: ${hp('0.5%')}px;
`;

const ActiveHoursAndMinutes = styled(Text)`
    ${(props) => props.theme.fonts.size.giga}
    color: white;
`;

const ActiveSeconds = styled(Text)`
    ${(props) => props.theme.fonts.size.alpha}
    color: ${(props) => hexToRGBA(props.theme.colors.textPrimary, 0.5)};
    align-self: flex-end;
    margin-left: ${wp('1%')}px;
    margin-bottom: ${hp('1.75%')}px;
`;

const PauseHoursAndMinutes = styled(Text)`
    ${(props) => props.theme.fonts.size.alpha}
    color: white;
`;

const PauseSeconds = styled(Text)`
    ${(props) => props.theme.fonts.size.gamma}
    color: ${(props) => hexToRGBA(props.theme.colors.textPrimary, 0.5)};
    align-self: flex-end;
    margin-left: ${wp('1%')}px;
    margin-bottom: ${hp('0.5%')}px;
`;
//----

export default withTheme(TimeCounter);
