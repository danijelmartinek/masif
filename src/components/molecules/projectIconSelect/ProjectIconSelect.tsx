import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import styled, { withTheme } from 'styled-components';

import Icon from '/components/atoms/icon/';

import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from '/utils/dimensions';

import { SelectedTheme } from '/styles/types';

//---- types

export type ProjectIconType = {
    type: string;
	selected: boolean;
};

type PropsWithTheme = {
	theme: SelectedTheme;
	icons: ProjectIconType[];
	onIconSelect?: ({
		type,
		selected
    }: ProjectIconType) => void | undefined;
    iconColor?: string;
    backgroundColor?: string;
    iconColorActive?: string;
    iconBackgroundColorActive?: string;
	activeOpacity?: number;
};

//---- component

const ProjectIconSelect = (props: PropsWithTheme) => {
	const [iconSelectItems, changeIconSelectItems] = useState<
		ProjectIconType[]
	>(props.icons);

	const changeSelectedIcon = (index: number): void => {
		let selectedIcon: ProjectIconType | null = null;
		const changedSelectIcon = iconSelectItems.map((icon, i) => {
			if (index === i) {
				icon.selected = true;
				selectedIcon = { ...icon };
			} else {
				icon.selected = false;
			}

			return icon;
		});
		changeIconSelectItems(changedSelectIcon);

		if (props.onIconSelect && selectedIcon) {
			props.onIconSelect(selectedIcon);
		}
	};

	return (
		<ProjectIconSelectContainer
            backgroundColor={props.backgroundColor}
            horizontal={true}
		>
			{iconSelectItems.map((icon, i) => (
				<ProjectIconItem
                    onPress={() => changeSelectedIcon(i)}
                    activeOpacity={props.activeOpacity}
                    iconBackgroundColorActive={icon.selected ? props.iconBackgroundColorActive : 'transparent'}
                    key={Math.random() * i}
                >
                    <Icon type={icon.type} color={icon.selected ? props.iconColorActive : props.iconColor} size={hp('5%')}></Icon>
                </ProjectIconItem>
			))}
		</ProjectIconSelectContainer>
	);
};

//---- default props

ProjectIconSelect.defaultProps = {
	icon: [],
	onColorSelect: undefined,
    iconColor: '#000000',
    backgroundColor: 'transparent',
    iconColorActive: '#ffffff',
    iconBackgroundColorActive: '#000000',
	activeOpacity: 1
};

//---- styles

const ProjectIconSelectContainer = styled(ScrollView)<{
	backgroundColor: string | undefined
}>`
	width: ${wp('100%')}px;
	height: ${hp('7.5%')}px;
	flex-direction: row;
	background-color: ${(props) => props.backgroundColor};
`;

const ProjectIconItem = styled(TouchableOpacity)<{
    iconBackgroundColorActive: string | undefined
}>`
	flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: ${hp('5.5%')}px;
    border-radius: ${hp('0.5%')}px;
    margin: ${hp('1%')}px;
    overflow: hidden;
    background-color: ${(props) => props.iconBackgroundColorActive};
`;

//----

export default withTheme(ProjectIconSelect);
