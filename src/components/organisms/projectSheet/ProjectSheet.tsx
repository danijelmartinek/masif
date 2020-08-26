import React, { useState } from 'react';
import { View } from 'react-native';
import styled, { withTheme } from 'styled-components';
import Constants from 'expo-constants';

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '/screens/index';

import BottomSheet from '/components/atoms/bottomSheet/';
import BottomSheetType from 'reanimated-bottom-sheet';

import SelectedProjectInfo from '/components/molecules/selectedProjectInfo';
import ProjectList from '/components/molecules/projectList';


//---- types

import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from '/utils/dimensions';

import { SelectedTheme } from '/styles/types';

type Props = StackScreenProps<RootStackParamList, 'Main'>;
type PropsWithTheme = Props & {
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
                        <SelectedProjectInfo onCloseButtonPress={() => ref?.current.snapTo(0)} navigation={props.navigation} route={props.route}></SelectedProjectInfo>
                        <ProjectList navigation={props.navigation} route={props.route}></ProjectList>
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
