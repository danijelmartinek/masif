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
						<SelectedProjectInfo>
							<Spacer
								height={Constants.statusBarHeight}
								width={wp('100%')}
							></Spacer>
							<SelectedProjectBadge>
								<Badge icon={'hiking'} size={hp('10%')}></Badge>
							</SelectedProjectBadge>
							<SelectedProjectName>
								Lorem ipsum
							</SelectedProjectName>
							<SelectedProjectDetails>
								<SelectedProjectDetailsItem>
									<DetailHeading>Start Date</DetailHeading>
									<DetailInfo>19 / 03 / 2020</DetailInfo>
								</SelectedProjectDetailsItem>
								<SelectedProjectDetailsItem>
									<DetailHeading>Start Date</DetailHeading>
									<DetailInfo>19 / 03 / 2020</DetailInfo>
								</SelectedProjectDetailsItem>
								<SelectedProjectDetailsItem>
									<DetailHeading>Start Date</DetailHeading>
									<DetailInfo>19 / 03 / 2020</DetailInfo>
								</SelectedProjectDetailsItem>
							</SelectedProjectDetails>
							<ProjectSheetActionIcons>
								<ActionIcon1Wrapper>
									<Icon
										type={'edit'}
										color={props.theme.colors.textPrimary}
									></Icon>
								</ActionIcon1Wrapper>
								<ActionIcon2Wrapper
									onPress={() => ref?.current.snapTo(0)}
								>
									<Icon
										type={'close'}
										color={props.theme.colors.textPrimary}
									></Icon>
								</ActionIcon2Wrapper>
							</ProjectSheetActionIcons>
						</SelectedProjectInfo>

                        
                        <ProjectListHeader>
                            <ProjectListTitle>Projects</ProjectListTitle>
                            <ProjectListAdd>
                                <Icon
                                    type={'plus'}
                                    color={props.theme.colors.textPrimary}
                                ></Icon>
                            </ProjectListAdd>
                        </ProjectListHeader>

						<ProjectList>
							<ProjectItem
								onPress={() => setSelected(!selected)}
								selected={selected}
							>
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
                            <ProjectItem
								onPress={() => setSelected(!selected)}
								selected={selected}
							>
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
                            <ProjectItem
								onPress={() => setSelected(!selected)}
								selected={selected}
							>
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
                            <ProjectItem
								onPress={() => setSelected(!selected)}
								selected={selected}
							>
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
                            <ProjectItem
								onPress={() => setSelected(!selected)}
								selected={selected}
							>
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
                            <ProjectItem
								onPress={() => setSelected(!selected)}
								selected={selected}
							>
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
                            <ProjectItem
								onPress={() => setSelected(!selected)}
								selected={selected}
							>
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
                            <ProjectItem
								onPress={() => setSelected(!selected)}
								selected={selected}
							>
								<ProjectBadge>
									<Badge icon={'hiking'}></Badge>
								</ProjectBadge>
								<ProjectInfo>
									<ProjectName>Lorem ipsum End</ProjectName>
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

const ProjectItem = styled(TouchableOpacity)<{
	selected: boolean;
}>`
	flex-direction: row;
	align-items: center;
	width: ${wp('96%')}px;
	padding: ${wp('2%')}px 0px;
	border-radius: 5px;
	background-color: #1d1d1d;

	${(props) =>
		props.selected ? `margin: ${wp('1.5%')}px;` : `margin: ${wp('2%')}px;`};
	${(props) => (props.selected ? `border: ${wp('0.5%')}px solid red;` : '')};
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

const SelectedProjectInfo = styled(View)`
    align-items: center;
	justify-content: center;
	width: ${wp('100%')}px;
	height: ${hp('40%')}px;
	background-color: blue;
`;

const SelectedProjectBadge = styled(View)`
	align-items: center;
	justify-content: center;
	width: ${wp('100%')}px;
	height: ${hp('15%')}px;
`;

const SelectedProjectName = styled(Text)`
	${(props) => props.theme.fonts.size.beta};
	color: ${(props) => props.theme.colors.textPrimary};
	height: ${hp('5%')}px;
	font-weight: bold;
`;

const SelectedProjectDetails = styled(View)`
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
	width: ${wp('100%')}px;
	height: ${hp('20%') - Constants.statusBarHeight}px;
`;

const SelectedProjectDetailsItem = styled(View)`
	align-items: center;
	justify-content: center;
`;

const DetailHeading = styled(Text)`
	${(props) => props.theme.fonts.size.delta};
	color: ${(props) => hexToRGBA(props.theme.colors.textPrimary, 0.75)};
	font-weight: bold;
	text-transform: uppercase;
`;

const DetailInfo = styled(Text)`
	${(props) => props.theme.fonts.size.gamma};
	color: ${(props) => props.theme.colors.textPrimary};
	font-weight: bold;
`;

const ProjectSheetActionIcons = styled(View)`
	position: absolute;
	flex-direction: row;
	top: ${Constants.statusBarHeight}px;
	width: ${wp('100%')}px;
`;

const ActionIcon1Wrapper = styled(TouchableOpacity)`
	width: ${wp('50%')}px;
	align-items: flex-start;
	padding: ${wp('5%')}px;
`;

const ActionIcon2Wrapper = styled(TouchableOpacity)`
	width: ${wp('50%')}px;
	align-items: flex-end;
	padding: ${wp('5%')}px;
`;

//----

export default withTheme(ProjectSheet);
