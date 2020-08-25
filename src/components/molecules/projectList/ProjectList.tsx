import React from 'react';
import { View, Text } from 'react-native';
import styled, { withTheme } from 'styled-components';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import Constants from 'expo-constants';

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '/screens/index';

import Icon from '/components/atoms/icon/';
import ProjectListItem from '/components/atoms/projectListItem';

import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from '/utils/dimensions';
import { hexToRGBA } from '/utils/colorFormat';

import { SelectedTheme } from '/styles/types';

//---- types

type Props = StackScreenProps<RootStackParamList, 'Main'>;
type PropsWithTheme = Props & {
		theme: SelectedTheme;
	};

//---- component

const ProjectList = (props: PropsWithTheme) => {
	return (
		<ProjectListContainer>
			<ProjectListHeader>
				<ProjectListTitle>Projects</ProjectListTitle>
				<ProjectListAdd onPress={() => props.navigation.navigate('ProjectTasks')}>
					<Icon
						type={'plus'}
						color={props.theme.colors.textPrimary}
					></Icon>
				</ProjectListAdd>
			</ProjectListHeader>

			<ProjectListWrapper>
				<ProjectListItem
                    primaryText='Lorem ipsum'
                    secondaryText={'activity a while ago'}
                    badge={['task_check', 'red', 'blue']}
                    width={wp('100%')}
                    color={props.theme.colors.tertiary}
                    primaryTextColor={props.theme.colors.textPrimary}
                    secondaryTextColor={hexToRGBA(props.theme.colors.textPrimary, 0.5)}
                    primaryTextSize={props.theme.fonts.oSize.gamma.fontSize}
                    primaryTextLineHeight={props.theme.fonts.oSize.gamma.lineHeight}
                    secondaryTextSize={props.theme.fonts.oSize.delta.fontSize}
                    secondaryTextLineHeight={props.theme.fonts.oSize.delta.lineHeight}
                    activeOpacity={0.5}
                ></ProjectListItem>
			</ProjectListWrapper>
		</ProjectListContainer>
	);
};

//---- default props

//---- styles

const ProjectListContainer = styled(View)`
    width: ${wp('100%')}px;
    height: ${hp('60%')}px;
`;

const ProjectListWrapper = styled(ScrollView)`
    width: ${wp('100%')}px;
    height: ${hp('50%')}px;
    margin-bottom: ${Constants.statusBarHeight}px;
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
    padding-right: ${hp('2%')}px;
`;

//----

export default withTheme(ProjectList);
