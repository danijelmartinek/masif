import React, { useState } from 'react';
import { View, Text, Button, ScrollView, StatusBar } from 'react-native';
import styled, { withTheme } from 'styled-components';
import { connect, ConnectedProps } from 'react-redux';
import { setTheme } from '/redux/actions';

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from './index';

import { Madoka } from 'react-native-textinput-effects';

import BasicLayout from '/components/molecules/basicLayout/';
import Badge from '/components/atoms/mtBadge/';
import ProjectColorSelect from '/components/molecules/projectColorSelect/';
import ProjectIconSelect from '/components/molecules/projectIconSelect/';

import { ProjectColorsType } from '/components/molecules/projectColorSelect/index.tsx';
import { ProjectIconType } from '/components/molecules/projectIconSelect/index.tsx';

import { providedColors, providedIcons } from '/styles/newProjectOptions.ts';
import { SelectedTheme, ThemeMode } from '/styles/types';

import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from '/utils/dimensions';

//---- store

const mapDispatch = {
	setTheme: (theme: ThemeMode) => setTheme(theme)
};
const connector = connect(null, mapDispatch);

//---- types

type NewProjectBadgeType = {
	primaryColor: string;
	secondaryColor: string;
	icon: string;
};

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = StackScreenProps<RootStackParamList, 'Main'>;
type PropsWithTheme = Props &
	PropsFromRedux & {
		theme: SelectedTheme;
	};
type StatusBarStyleType =
	| 'light-content'
	| 'dark-content'
	| 'default'
	| undefined;

//---- component

const NewProjectScreen = (props: PropsWithTheme) => {
	const [isInputError, setInputError] = useState<boolean>(false);

	const [statusBarTheme] = useState<StatusBarStyleType>(() => {
		if (props.theme.label === 'dark') {
			return 'light-content';
		} else {
			return 'dark-content';
		}
	});

	const selectedColorsPair = providedColors.find((colors) => colors.selected);
	const selectedIcon = providedIcons.find((icon) => icon.selected);

	const [newProjectBadge, setNewProjectBadge] = useState<NewProjectBadgeType>(
		{
			primaryColor: selectedColorsPair?.primary || '#ffffff',
			secondaryColor: selectedColorsPair?.secondary || '#000000',
			icon: selectedIcon?.type || ''
		}
	);

	const BadgeColorsChanged = (colors: ProjectColorsType) => {
		setNewProjectBadge({
			...newProjectBadge,
			...{
				primaryColor: colors.primary,
				secondaryColor: colors.secondary
			}
		});
	};

	const BadgeIconChanged = (icon: ProjectIconType) => {
		setNewProjectBadge({
			...newProjectBadge,
			...{
				icon: icon.type
			}
		});
	};

	const [newProjectName, onProjectNameChangeText] = React.useState('');

	const saveNewProject = () => {
		if (!newProjectName) {
			setInputError(true);
		} else {
			setInputError(false);
			console.log(newProjectName);
		}
	};

	return (
		<NewProjectScreenContainer>
			<StatusBar
				translucent
				backgroundColor="transparent"
				barStyle={statusBarTheme}
			/>
			<BasicLayout
				navigation={props.navigation}
				route={props.route}
				screenName={'Add Project'}
				headerActionButton={true}
				headerActionButtonSettings={[
					'Save',
					'#ffffff',
					props.theme.colors.semantic.success,
					0.5
				]}
				headerActionButtonOnPress={() => saveNewProject()}
			>
				<NewProjectContent>
					<BadgeWrapper>
						<Badge
							icon={newProjectBadge.icon}
							primaryColor={newProjectBadge.primaryColor}
							secondaryColor={newProjectBadge.secondaryColor}
							size={hp('15%')}
						></Badge>
					</BadgeWrapper>

					<NewProjectNameInput>
						<Madoka
							value={newProjectName}
							label={'Project Name'}
							onChangeText={(text) =>
								onProjectNameChangeText(text)
							}
							borderColor={props.theme.colors.textPrimary}
							inputPadding={hp('2%')}
							labelStyle={{
								color: props.theme.colors.textPrimary,
								textAlign: 'center',
                                marginLeft: -hp('4%'),
                                opacity: 0.5
							}}
							inputStyle={{
								color: props.theme.colors.textPrimary,
								textAlign: 'center'
							}}
						/>
					</NewProjectNameInput>

					{isInputError ? (
						<NewProjectNameInputError>
							Project name required
						</NewProjectNameInputError>
					) : null}

					<ProjectColorSelectWrapper>
						<ProjectColorSelectHeading>
							Project color pair
						</ProjectColorSelectHeading>
						<ProjectColorSelect
							colors={providedColors}
							borderSelectColor={props.theme.colors.textPrimary}
							activeOpacity={0.5}
							onColorSelect={(colors) =>
								BadgeColorsChanged(colors)
                            }
                            backgroundColor={props.theme.colors.tertiary}
						></ProjectColorSelect>
					</ProjectColorSelectWrapper>

					<ProjectIconSelectWrapper>
						<ProjectIconSelectHeading>
							Project icon
						</ProjectIconSelectHeading>
						<ProjectIconSelect
							icons={providedIcons}
							iconColor={props.theme.colors.textPrimary}
							iconColorActive={props.theme.colors.primary}
							iconBackgroundColorActive={
								props.theme.colors.textPrimary
                            }
                            backgroundColor={props.theme.colors.tertiary}
							activeOpacity={0.5}
							onIconSelect={(icon) => BadgeIconChanged(icon)}
						></ProjectIconSelect>
					</ProjectIconSelectWrapper>
				</NewProjectContent>
			</BasicLayout>
		</NewProjectScreenContainer>
	);
};

//---- styles

const NewProjectScreenContainer = styled(View)`
	flex: 1;
	width: ${wp('100%')}px;
	height: ${hp('100%')}px;
	background-color: ${(props) => props.theme.colors.primary};
`;

const NewProjectContent = styled(View)`
	align-items: center;
	justify-content: center;
`;

const BadgeWrapper = styled(View)`
	flex: 1;
	margin: ${hp('1%')}px 0;
`;

const NewProjectNameInput = styled(View)`
	flex: 1;
	width: ${wp('80%')}px;
	margin-top: ${hp('1%')}px;
`;

const NewProjectNameInputError = styled(Text)`
	color: ${(props) => props.theme.colors.semantic.error};
	margin: ${hp('1%')}px 0;
`;

const ProjectColorSelectWrapper = styled(View)`
	flex: 1;
	margin: ${hp('1%')}px 0;
`;

const ProjectColorSelectHeading = styled(Text)`
	${(props) => props.theme.fonts.size.delta};
	color: ${(props) => props.theme.colors.textPrimary};
	padding: ${hp('1%')}px;
	text-transform: uppercase;
	opacity: 0.5;
`;

const ProjectIconSelectWrapper = styled(View)`
	flex: 1;
	margin: ${hp('1%')}px 0;
`;

const ProjectIconSelectHeading = styled(Text)`
	${(props) => props.theme.fonts.size.delta};
	color: ${(props) => props.theme.colors.textPrimary};
	padding: ${hp('1%')}px;
	text-transform: uppercase;
	opacity: 0.5;
`;

//----

export default connector(withTheme(NewProjectScreen));
