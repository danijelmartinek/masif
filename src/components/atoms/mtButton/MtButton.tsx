import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components';

import Icon from '/components/atoms/icon/';

//---- types

type Props = {
	icon: string;
    title?: string;
    size: number;
	active: boolean;
	backgroundColor: string;
	activeBackgroundColor: string;
	textColor: string;
	activeTextColor: string;
    activeOpacity: number;
    fullWidth: boolean;
    disabled: boolean;
    onPress?: () => void;
};

//---- component

const MtButton = (props: Props) => {
	return (
		<TouchableOpacity activeOpacity={props.activeOpacity} disabled={props.disabled} style={{opacity: props.disabled ? 0.25 : 1}} onPress={props.onPress}>
			<MtButtonWrapper
                size={props.size}
				active={props.active}
				backgroundColor={props.disabled ? 'gray' : props.backgroundColor}
                activeBackgroundColor={props.disabled ? 'gray' : props.activeBackgroundColor}
                fullWidth={props.fullWidth}
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
	backgroundColor: 'transparent',
	activeBackgroundColor: '#ff0000',
	textColor: '#ffffff',
	activeTextColor: '#000000',
	activeOpacity: 1,
    icon: '',
    fullWidth: false,
    disabled: false
};

//---- styles

const MtButtonWrapper = styled(View)<{
    fullWidth: boolean,
    size: number,
	active: boolean,
	backgroundColor: string,
	activeBackgroundColor: string
}>`
	flex-direction: row;
	align-items: center;
	justify-content: center;
	border-radius: 5px;
    width: ${(props) => props.fullWidth ? '100%' : props.size * 7.5 + 'px'};
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
