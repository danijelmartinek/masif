import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components';

import Icon from '/components/atoms/icon/';

import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from '/utils/dimensions';

//---- types

type Props = {
	icon: string;
	title: string;
	active: boolean;
	backgroundColor: string;
	activeBackgroundColor: string;
	textColor: string;
	activeTextColor: string;
	activeOpacity: number;
};

//---- component

const MtButton = (props: Props) => {
	return (
		<TouchableOpacity activeOpacity={props.activeOpacity}>
			<MtButtonWrapper
				active={props.active}
				backgroundColor={props.backgroundColor}
				activeBackgroundColor={props.activeBackgroundColor}
			>
				<Icon
					type={props.icon}
					color={
						props.active ? props.activeTextColor : props.textColor
					}
				></Icon>
				<MtButtonText
					active={props.active}
					textColor={props.textColor}
					activeTextColor={props.activeTextColor}
				>
					{props.title}
				</MtButtonText>
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
	icon: ''
};

//---- styles

const MtButtonWrapper = styled(View)<{
	active: boolean;
	backgroundColor: string;
	activeBackgroundColor: string;
}>`
	flex-direction: row;
	align-items: center;
	justify-content: center;
	padding: ${hp('1.2%')}px ${hp('3%')}px;
	border-radius: 5px;
	width: ${wp('28%')}px;
	background-color: ${(props) =>
		props.active ? props.activeBackgroundColor : props.backgroundColor};
`;

const MtButtonText = styled(Text)<{
	active: boolean;
	textColor: string;
	activeTextColor: string;
}>`
	padding-left: ${wp('0.5%')}px;
	color: ${(props) =>
		props.active ? props.activeTextColor : props.textColor};
	${(props) => props.theme.fonts.size.gamma};
	font-weight: bold;
`;

//----

export default MtButton;
