import React, { useState } from 'react';
import { View, Text } from 'react-native';
import styled, { withTheme } from 'styled-components';
import Constants from 'expo-constants';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '/screens/index';

import Spacer from '/components/atoms/spacer/';
import TimeCounter from '/components/molecules/timeCounter/';
import Icon from '/components/atoms/icon/';
import Badge from '../../atoms/mtBadge';

import BottomSheet from '/components/atoms/bottomSheet/';
import BottomSheetType from 'reanimated-bottom-sheet';

import SelectedProjectInfo from '/components/molecules/selectedProjectInfo';
import ProjectList from '/components/molecules/projectList';

import { hexToRGBA } from '/utils/colorFormat';

//---- types

import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from '/utils/dimensions';

import { SelectedTheme } from '/styles/types';

type PropsWithTheme = StackScreenProps<RootStackParamList, 'Main'> & {
	theme: SelectedTheme;
};

//---- component

const ProjectSheet = React.forwardRef<BottomSheetType, PropsWithTheme>(
	(props, ref) => {
		const [selected, setSelected] = useState(false);

		return (
			<ProjectSheetContainer pointerEvents={'box-none'}>
				<BottomSheet
					ref={ref}
					snapPoints={[0, hp('100%') + Constants.statusBarHeight]}
					initialSnap={1}
                    enabledContentTapInteraction={false}
				>
					<ProjectSheetWrapper>
                        <SelectedProjectInfo></SelectedProjectInfo>
                        <ProjectList></ProjectList>
					</ProjectSheetWrapper>
				</BottomSheet>
			</ProjectSheetContainer>
		);
	}
);

//---- styles

const ProjectSheetContainer = styled(View)`
	position: absolute;
	height: ${hp('100%') + Constants.statusBarHeight}px;
	width: ${wp('100%')}px;
`;

const ProjectSheetWrapper = styled(View)`
    height: ${hp('100%') + Constants.statusBarHeight}px;
    width: ${wp('100%')}px;
    background-color: ${(props) => props.theme.colors.primary};
`;

//----

export default withTheme(ProjectSheet);
