import React, { useState, useRef, useContext } from 'react';
import { View, Text } from 'react-native';
import styled, { withTheme } from 'styled-components';
import { connect, ConnectedProps } from 'react-redux';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import CounterContext from '/context/counter';
import OptionsModalContext from '/context/optionsModal';

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '/screens/index';

import Icon from '/components/atoms/icon/';
import ProjectListItem from '/components/atoms/projectListItem';

import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from '/utils/dimensions';
import { hexToRGBA } from '/utils/colorFormat';
import { humanFormat } from '/utils/time';

import { SelectedTheme } from '/styles/types';
import { StoreStateType, ProjectType } from '/redux/types';
import { removeProject, selectProject, setProjectTheme } from '/redux/actions';

//---- store

const mapDispatch = {
    removeProject: (projectId: string) => removeProject(projectId),
	selectProject: (index: number) => selectProject(index),
	setProjectTheme: () => setProjectTheme()
};
const mapState = (state: StoreStateType) => ({
	ALL_PROJECTS: state.ALL_PROJECTS
});
const connector = connect(mapState, mapDispatch);

//---- types

type PropsFromRedux = ConnectedProps<typeof connector>;
type Props = StackScreenProps<RootStackParamList, 'Main'>;
type PropsWithTheme = Props &
	PropsFromRedux & {
		theme: SelectedTheme;
	};

//---- component

const ProjectList = (props: PropsWithTheme) => {
    const optionsModal = useContext(OptionsModalContext);

	const { isEnabled } = useContext(CounterContext);
    const [projectActive, setProjectActive] = useState(false);
    
	React.useEffect(() => {
		if (isEnabled) {
			setProjectActive(true);
		} else {
			setProjectActive(false);
		}
	}, [isEnabled]);

	const getLastProjectActivity = (project: ProjectType): string => {
		if (project.sessions[0]) {
			return `Last activity - ${humanFormat(project.sessions[project.sessions.length - 1].endTime)}`;
		} else {
			return `No activity yet`;
		}
	};

	const handleProjectSelect = (index: number) => {
		if (!projectActive) {
			props.selectProject(index);
			props.setProjectTheme();
		}
    };
    
    const options = [
        {
            item: 'Edit',
            f: (optionsRef, data) => {
                props.navigation.navigate('EditProject', data);
                optionsRef.closeOptions();
            }
        },
        {
            item: 'Delete',
            f: (optionsRef, data) => {
                props.removeProject(data._id);
                optionsRef.closeOptions();
            }
        }
    ];

	return (
        <React.Fragment>
            <ProjectListContainer>
                <ProjectListHeader>
                    <ProjectListTitle>Projects</ProjectListTitle>
                    <ProjectListAdd
                        onPress={() => props.navigation.navigate('NewProject')}
                    >
                        <Icon
                            type={'plus'}
                            color={props.theme.colors.textPrimary}
                        ></Icon>
                    </ProjectListAdd>
                </ProjectListHeader>

                <InfoLabel>long press project for options</InfoLabel>

                <ProjectListWrapper disabled={projectActive}>
                    {props.ALL_PROJECTS?.map((project, i) => (
                        <ProjectListItem
                            key={Math.random() * i}
                            primaryText={project.name}
                            secondaryText={getLastProjectActivity(project)}
                            badge={[
                                project.projectThemeOptions.icon,
                                project.projectThemeOptions.colors.projectPrimary,
                                project.projectThemeOptions.colors.projectSecondary
                            ]}
                            width={wp('100%')}
                            color={props.theme.colors.tertiary}
                            primaryTextColor={props.theme.colors.textPrimary}
                            secondaryTextColor={hexToRGBA(
                                props.theme.colors.textPrimary,
                                0.5
                            )}
                            primaryTextSize={props.theme.fonts.oSize.gamma.fontSize}
                            primaryTextLineHeight={
                                props.theme.fonts.oSize.gamma.lineHeight
                            }
                            secondaryTextSize={
                                props.theme.fonts.oSize.delta.fontSize
                            }
                            secondaryTextLineHeight={
                                props.theme.fonts.oSize.delta.lineHeight
                            }
                            activeOpacity={projectActive ? 1 : 0.5}
                            onPress={() => handleProjectSelect(i)}
                            onLongPress={() => !projectActive ? optionsModal.openOptions(project, options) : true}
                        ></ProjectListItem>
                    ))}
                </ProjectListWrapper>
            </ProjectListContainer>
        </React.Fragment>
	);
};

//---- default props

//---- styles

const ProjectListContainer = styled(View)`
	width: ${wp('100%')}px;
	height: ${hp('60%')}px;
`;

const ProjectListWrapper = styled(ScrollView)<{
	disabled: boolean;
}>`
	width: ${wp('100%')}px;
	height: ${hp('50%')}px;
	margin-bottom: ${Constants.statusBarHeight}px;
	opacity: ${(props) => (props.disabled ? 0.5 : 1)};
`;

const ProjectListHeader = styled(View)`
	flex-direction: row;
	align-items: center;
	justify-content: center;
	width: ${wp('100%')}px;
	height: ${hp('8%')}px;
`;

const ProjectListTitle = styled(Text)`
	width: ${wp('90%')}px;
	${(props) => props.theme.fonts.size.beta};
	color: ${(props) => props.theme.colors.textPrimary};
	padding: ${hp('2%')}px;
`;

const ProjectListAdd = styled(TouchableOpacity)`
	width: ${wp('10%')}px;
	align-items: center;
	justify-content: center;
	padding-right: ${wp('2%')}px;
`;

const InfoLabel = styled(Text)`
    ${(props) => props.theme.fonts.size.zeta};
    margin-left: ${wp('3.75%')}px;
    color: ${(props) => hexToRGBA(props.theme.colors.textPrimary, 0.25)};
    text-transform: uppercase;
`;

//----

export default connector(withTheme(ProjectList));
