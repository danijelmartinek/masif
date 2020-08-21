import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components';

import Icon from '/components/atoms/icon/';

//---- types

type Props = {
	icon: string;
    title: string;
    size: number;
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
                size={props.size}
				active={props.active}
				backgroundColor={props.backgroundColor}
				activeBackgroundColor={props.activeBackgroundColor}
			>
				<Icon
                    type={props.icon}
                    size={props.size * 1.5}
					color={
						props.active ? props.activeTextColor : props.textColor
					}
				></Icon>
				<MtButtonText
                    size={props.size}
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
    size: number,
	active: boolean,
	backgroundColor: string,
	activeBackgroundColor: string
}>`
	flex-direction: row;
	align-items: center;
	justify-content: center;
	border-radius: 5px;
    width: ${(props) => props.size * 7.5}px;
    height: ${(props) => props.size * 2.5}px;
	background-color: ${(props) =>
		props.active ? props.activeBackgroundColor : props.backgroundColor};
`;

const MtButtonText = styled(Text)<{
    size: number,
	active: boolean,
	textColor: string,
	activeTextColor: string
}>`
	padding-left: ${(props) => props.size * 0.05}px;
	color: ${(props) =>
		props.active ? props.activeTextColor : props.textColor};
	font-size: ${(props) => props.size}px;
	font-weight: bold;
`;

//----

export default MtButton;
