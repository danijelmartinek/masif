import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import styled, { withTheme } from 'styled-components';

import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from '/utils/dimensions';

import { SelectedTheme } from '/styles/types';

//---- types

export type ProjectColorsType = {
	primary: string;
	secondary: string;
	selected: boolean;
};

type PropsWithTheme = {
	theme: SelectedTheme;
	colors: ProjectColorsType[];
	onColorSelect?: ({
		primary,
		secondary,
		selected
	}: ProjectColorsType) => void | undefined;
	backgroundColor?: string;
	borderSelectColor?: string;
	activeOpacity?: number;
};

//---- component

const ProjectColorSelect = (props: PropsWithTheme) => {
	const [colorsSelectItems, changeColorsSelectItems] = useState<
		ProjectColorsType[]
	>(props.colors);

	const changeSelectedColor = (index: number): void => {
		let selectedColors: ProjectColorsType | null = null;
		const changedSelectColors = colorsSelectItems.map((colors, i) => {
			if (index === i) {
				colors.selected = true;
				selectedColors = { ...colors };
			} else {
				colors.selected = false;
			}

			return colors;
		});
		changeColorsSelectItems(changedSelectColors);

		if (props.onColorSelect && selectedColors) {
			props.onColorSelect(selectedColors);
		}
	};

	return (
		<ProjectColorSelectContainer
			horizontal={true}
			backgroundColor={props.backgroundColor}
		>
			{colorsSelectItems.map((colors, i) => (
				<ProjectColorItem
					key={Math.random() * i}
					selected={colors.selected}
					onPress={() => changeSelectedColor(i)}
                    borderSelectColor={props.borderSelectColor}
                    activeOpacity={props.activeOpacity}
				>
					<ProjectColor color={colors.primary}></ProjectColor>
					<ProjectColor color={colors.secondary}></ProjectColor>
				</ProjectColorItem>
			))}
		</ProjectColorSelectContainer>
	);
};

//---- default props

ProjectColorSelect.defaultProps = {
	colors: [],
	onColorSelect: undefined,
	backgroundColor: 'transparent',
	borderSelectColor: '#000000',
	activeOpacity: 1
};

//---- styles

const ProjectColorSelectContainer = styled(ScrollView)<{
	backgroundColor: string | undefined
}>`
	width: ${wp('100%')}px;
	height: ${hp('8%')}px;
	flex-direction: row;
	background-color: ${(props) => props.backgroundColor};
`;

const ProjectColorItem = styled(TouchableOpacity)<{
	selected: boolean,
	borderSelectColor: string | undefined
}>`
	flex: 1;
	flex-direction: row;
	border-radius: ${hp('0.5%')}px;
	overflow: hidden;
	margin: ${(props) => (props.selected ? hp('1%') : hp('1.5%'))}px;
	${(props) =>
		props.selected
			? `border: ${hp('0.5%')}px solid ${props.borderSelectColor};`
			: ``}
`;

const ProjectColor = styled(View)<{
	color: string
}>`
	width: ${wp('9%')}px;
	background-color: ${(props) => props.color};
`;

//----

export default withTheme(ProjectColorSelect);
