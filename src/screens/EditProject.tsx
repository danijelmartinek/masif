import React, { useState } from 'react';
import { View, Text, StatusBar } from 'react-native';
import styled, { withTheme } from 'styled-components';
import { connect, ConnectedProps } from 'react-redux';
import { addProject, selectProject, setProjectTheme } from '/redux/actions';
import { getSelectedProject } from '/redux/selectors';

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from './index';

import { Madoka } from 'react-native-textinput-effects';

import BasicLayout from '/components/molecules/basicLayout/';
import Badge from '/components/atoms/mtBadge/';
import ProjectColorSelect from '/components/molecules/projectColorSelect/';
import ProjectIconSelect from '/components/molecules/projectIconSelect/';

import { ProjectColorsType } from '/components/molecules/projectColorSelect/index.tsx';
import { ProjectIconType } from '/components/molecules/projectIconSelect/index.tsx';

import { makeId } from '/utils/helpers';

import { providedColors as providedColorsE, providedIcons as providedIconsE } from '/styles/newProjectOptions.ts';
import { ProjectType } from '/redux/types';
import { SelectedTheme } from '/styles/types';

import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from '/utils/dimensions';

import { StoreStateType } from '/redux/types';

//---- store

const mapState = (state: StoreStateType) => ({
	SELECTED_PROJECT: getSelectedProject(state)
});
const mapDispatch = {
    addProject: (project: ProjectType) => addProject(project),
    selectProject: (index: number) => selectProject(index),
    setProjectTheme: () => setProjectTheme()
};
const connector = connect(mapState, mapDispatch);

//---- types

type EditProjectBadgeType = {
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

const EditProjectScreen = (props: PropsWithTheme) => {
    const [isInputError, setInputError] = useState<boolean>(false);

    const [oldSettings, setOldSettings] = useState<boolean>({
        oldColorPrimary: props.route.params.projectThemeOptions.colors.projectPrimary,
        oldColorSecondary: props.route.params.projectThemeOptions.colors.projectSecondary,
        oldIcon: props.route.params.projectThemeOptions.icon
    });

    const [providedColors, setProvidedColors] = useState(() => providedColorsE.map((colors) => {
        if(colors.primary === oldSettings.oldColorPrimary  && colors.secondary === oldSettings.oldColorSecondary) {
            colors.selected = true;
        } else {
            colors.selected = false;
        }
        return colors;
    }));
    const [providedIcons, setProvidedIcons] = useState(() => providedIconsE.map((icon) => {
        if(icon.type === oldSettings.oldIcon) {
            icon.selected = true;
        } else {
            icon.selected = false;
        }
        return icon;
    }))
  
	const [statusBarTheme] = useState<StatusBarStyleType>(() => {
		if (props.theme.label === 'dark') {
			return 'light-content';
		} else {
			return 'dark-content';
		}
    });

	const [editProjectBadge, setEditProjectBadge] = useState<EditProjectBadgeType>(
		{
			primaryColor: oldSettings.oldColorPrimary || '#ffffff',
			secondaryColor: oldSettings.oldColorSecondary || '#000000',
			icon: oldSettings.oldIcon || ''
		}
	);

	const BadgeColorsChanged = (colors: ProjectColorsType) => {
		setEditProjectBadge({
			...editProjectBadge,
			...{
				primaryColor: colors.primary,
				secondaryColor: colors.secondary
			}
		});
	};

	const BadgeIconChanged = (icon: ProjectIconType) => {
		setEditProjectBadge({
			...editProjectBadge,
			...{
				icon: icon.type
			}
		});
	};

	const [editProjectName, onProjectNameChangeText] = React.useState(props.route.params.name);

	const saveEditProject = () => {
		if (!editProjectName) {
			setInputError(true);
		} else {
			setInputError(false);
			props.addProject({
                _id: makeId(16),
                name: editProjectName,
                projectThemeOptions: {
                    colors: {
                        projectPrimary: editProjectBadge.primaryColor,
                        projectSecondary: editProjectBadge.secondaryColor
                    },
                    icon: editProjectBadge.icon
                },
                tasks: [],
                activities: [],
                graphPoints: [],
                createdAt: Date.now(),
                updatedAt: Date.now()
            });

            if(!props.SELECTED_PROJECT) {
                props.selectProject(0);
                props.setProjectTheme();
            }

            props.navigation.goBack();
		}
	};

	return (
		<EditProjectScreenContainer>
			<StatusBar
				translucent
				backgroundColor="transparent"
				barStyle={statusBarTheme}
			/>
			<BasicLayout
				navigation={props.navigation}
				route={props.route}
				screenName={'Edit Project'}
				headerActionButton={true}
				headerActionButtonSettings={[
					'Save',
					'#ffffff',
					props.theme.colors.semantic.success,
					0.5
				]}
				headerActionButtonOnPress={() => saveEditProject()}
			>
				<EditProjectContent>
					<BadgeWrapper>
						<Badge
							icon={editProjectBadge.icon}
							primaryColor={editProjectBadge.primaryColor}
							secondaryColor={editProjectBadge.secondaryColor}
							size={hp('15%')}
						></Badge>
					</BadgeWrapper>

					<EditProjectNameInput>
						<Madoka
							value={editProjectName}
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
					</EditProjectNameInput>

					{isInputError ? (
						<EditProjectNameInputError>
							Project name required
						</EditProjectNameInputError>
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
				</EditProjectContent>
			</BasicLayout>
		</EditProjectScreenContainer>
	);
};

//---- styles

const EditProjectScreenContainer = styled(View)`
	flex: 1;
	width: ${wp('100%')}px;
	height: ${hp('100%')}px;
	background-color: ${(props) => props.theme.colors.primary};
`;

const EditProjectContent = styled(View)`
	align-items: center;
	justify-content: center;
`;

const BadgeWrapper = styled(View)`
	flex: 1;
	margin: ${hp('1%')}px 0;
`;

const EditProjectNameInput = styled(View)`
	flex: 1;
	width: ${wp('80%')}px;
	margin-top: ${hp('1%')}px;
`;

const EditProjectNameInputError = styled(Text)`
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

export default connector(withTheme(EditProjectScreen));
