import React, {useState} from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import styled, { withTheme } from 'styled-components';
import Constants from 'expo-constants';

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '/screens/index';

import Spacer from '/components/atoms/spacer/';
import TimeCounter from '/components/molecules/timeCounter/';
import Icon from '/components/atoms/icon/';
import Badge from '../../atoms/mtBadge';

import BottomSheet from '/components/atoms/bottomSheet/';
import BottomSheetType from 'reanimated-bottom-sheet';

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
					<View
						style={{
							height: '100%',
							width: '100%',
							backgroundColor: '#0D0D0D'
						}}
					>
						<Spacer
							height={Constants.statusBarHeight}
							width={wp('100%')}
						></Spacer>
						<ProjectList>
							<ProjectItem onPress={() => setSelected(!selected)} selected={selected}>
								<ProjectBadge>
									<Badge icon={'hiking'}></Badge>
								</ProjectBadge>
								<ProjectInfo>
									<ProjectName>Lorem ipsum</ProjectName>
									<LastActivity>
										Last activity 4 days ago
									</LastActivity>
								</ProjectInfo>
							</ProjectItem>
						</ProjectList>
					</View>
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

const ProjectList = styled(ScrollView)`
	height: ${hp('75%')}px;
	width: ${wp('100%')}px;
`;

const ProjectItem = styled(TouchableOpacity)<{
    selected: boolean
}>`
	flex-direction: row;
	align-items: center;
	width: ${wp('96%')}px;
	padding: ${wp('2%')}px 0px;
	border-radius: 5px;
    background-color: #1d1d1d;

    ${(props) => props.selected ? `margin: ${wp('1.5%')}px;` : `margin: ${wp('2%')}px;`};
    ${(props) => props.selected ? `border: ${wp('0.5%')}px solid red;` : ''};
`;

const ProjectBadge = styled(View)`
	flex: 1;
	align-items: center;
`;

const ProjectInfo = styled(View)`
	width: ${wp('50%')}px;
	flex: 4;
	justify-content: center;
`;

const ProjectName = styled(Text)`
	${(props) => props.theme.fonts.size.gamma};
	font-weight: bold;
	color: ${(props) => props.theme.colors.textPrimary};
`;

const LastActivity = styled(Text)`
	${(props) => props.theme.fonts.size.delta};
	color: ${(props) => hexToRGBA(props.theme.colors.textPrimary, 0.5)};
`;

//----

export default withTheme(ProjectSheet);
