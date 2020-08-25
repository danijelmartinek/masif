import React, { useState } from 'react';
import {
	View,
	Text,
	Button,
	ScrollView,
	StatusBar,
	TouchableOpacity
} from 'react-native';
import styled, { withTheme } from 'styled-components';
import { connect, ConnectedProps } from 'react-redux';
import { setTheme } from '/redux/actions';

import { Madoka } from 'react-native-textinput-effects';

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from './index';

import BasicLayout from '/components/molecules/basicLayout/';
import TaskItemInfo from '/components/atoms/taskItemInfo/';
import MtButton from '/components/atoms/mtButton/';
import TaskItem from '/components/molecules/taskItem/';
import Spacer from '/components/atoms/spacer/';

import { SelectedTheme, ThemeMode } from '/styles/types';
import { PriorityVariants } from '/components/molecules/taskItem/';

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

const ProjectTaskScreen = (props: PropsWithTheme) => {
	const [statusBarTheme] = useState<StatusBarStyleType>(() => {
		if (props.theme.label === 'dark') {
			return 'light-content';
		} else {
			return 'dark-content';
		}
	});

	const [prioritySelect, setPrioritySelect] = useState<boolean[]>([
		true,
		false,
		false
    ]);
    
    const [newProjectName, onProjectNameChangeText] = React.useState('');

    const [taskAddInputDisabled, setTaskAddInputDisabled] = React.useState<boolean>(true);

	return (
		<ProjectTaskScreenContainer>
			<StatusBar
				translucent
				backgroundColor="transparent"
				barStyle={statusBarTheme}
			/>
			<BasicLayout
				navigation={props.navigation}
				route={props.route}
				screenName={'Project Tasks'}
				headerActionButtonOnPress={() => saveNewProject()}
			>
				<ProjectTaskScreenContent>
					<TaskAddWrapper>
                        
                        <TaskScreenHeading>
                            New Task
                        </TaskScreenHeading>

                        <ProjectTaskTextInput>
                            <Madoka
                                value={newProjectName}
                                label={'Task Title'}
                                onChangeText={(text) =>{
                                    text ? setTaskAddInputDisabled(false) : setTaskAddInputDisabled(true);
                                    onProjectNameChangeText(text);
                                }}
                                borderColor={props.theme.colors.textPrimary}
                                inputPadding={hp('2%')}
                                labelStyle={{
                                    color: props.theme.colors.textPrimary,
                                    marginLeft: -hp('2%'),
                                    opacity: 0.5
                                }}
                                inputStyle={{
                                    color: props.theme.colors.textPrimary
                                }}
                            />
                        </ProjectTaskTextInput>

                        <PrioritySelectHeading>
							Priority
						</PrioritySelectHeading>

						<TaskPrioritySelect>
							<PriorityItem
								selectBackgroundColor={
									prioritySelect[0]
										? props.theme.colors.semantic.success
										: props.theme.colors.tertiary
                                }
                                onPress={() => setPrioritySelect([true, false, false])}
							>
								<TaskItemInfo
									iconColor={props.theme.colors.textPrimary}
									iconSize={hp('2.5%')}
									textColor={
										prioritySelect[0]
											? props.theme.colors.textPrimary
											: props.theme.colors.semantic
													.success
									}
									textSize={
										props.theme.fonts.oSize.gamma.fontSize
									}
									text={'Low'}
								></TaskItemInfo>
							</PriorityItem>

							<PriorityItem
								selectBackgroundColor={
									prioritySelect[1]
										? props.theme.colors.semantic.warning
										: props.theme.colors.tertiary
                                }
                                onPress={() => setPrioritySelect([false, true, false])}
							>
								<TaskItemInfo
									iconColor={prioritySelect[1] ? props.theme.colors.primary : props.theme.colors.textPrimary}
									iconSize={hp('2.5%')}
									textColor={
										prioritySelect[1]
											? props.theme.colors.primary
											: props.theme.colors.semantic
													.warning
									}
									textSize={
										props.theme.fonts.oSize.gamma.fontSize
									}
									text={'Medium'}
								></TaskItemInfo>
							</PriorityItem>

							<PriorityItem
								selectBackgroundColor={
									prioritySelect[2]
										? props.theme.colors.semantic.error
										: props.theme.colors.tertiary
                                }
                                onPress={() => setPrioritySelect([false, false, true])}
							>
								<TaskItemInfo
									iconColor={props.theme.colors.textPrimary}
									iconSize={hp('2.5%')}
									textColor={
										prioritySelect[2]
											? props.theme.colors.textPrimary
											: props.theme.colors.semantic.error
									}
									textSize={
										props.theme.fonts.oSize.gamma.fontSize
									}
									text={'High'}
								></TaskItemInfo>
							</PriorityItem>
						</TaskPrioritySelect>
                        <AddButtonWrapper>
                            <MtButton
                                size={props.theme.fonts.oSize.gamma.fontSize}
                                backgroundColor={props.theme.colors.semantic.success}
                                activeOpacity={0.5}
                                active={false}
                                title={'Add'}
                                fullWidth={true}
                                disabled={taskAddInputDisabled}
                            ></MtButton>
                        </AddButtonWrapper>
					</TaskAddWrapper>
                    
                    <Spacer width={wp('100%')} height={hp('2.5%')}></Spacer>
                    
                    <TaskScreenHeading>
                        Tasks
                    </TaskScreenHeading>

                    <TaskItemList>
                        <TaskItem
                            text={
                                'Fusce dapibus nisl at risus accumsan, vel accumsan eros blandit.'
                            }
                            priority={PriorityVariants['medium']}
                            checked={true}
                            activeOpacity={0.5}
                            onPress={() => console.log('press')}
                            onLongPress={() => console.log('long press')}
                            onCheckPress={() => console.log('check press')}
                        ></TaskItem>
                        <TaskItem
                            text={
                                'Lorem ipsum'
                            }
                            priority={PriorityVariants['high']}
                            checked={false}
                            activeOpacity={0.5}
                            onPress={() => console.log('press')}
                            onLongPress={() => console.log('long press')}
                            onCheckPress={() => console.log('check press')}
                        ></TaskItem>
                    </TaskItemList>
				</ProjectTaskScreenContent>
			</BasicLayout>
		</ProjectTaskScreenContainer>
	);
};

//---- styles

const ProjectTaskScreenContainer = styled(View)`
	flex: 1;
	width: ${wp('100%')}px;
	height: ${hp('100%')}px;
	background-color: ${(props) => props.theme.colors.primary};
`;

const ProjectTaskScreenContent = styled(View)`
    flex: 1;
	align-items: center;
	justify-content: center;
`;

const ProjectTaskTextInput = styled(View)`
    flex: 1;
    width: ${wp('92%')}px;
`;

const TaskAddWrapper = styled(View)`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

const TaskScreenHeading = styled(Text)`
    ${(props) => props.theme.fonts.size.beta};
    color: ${(props) => props.theme.colors.textPrimary};
    margin: ${hp('1%')}px ${hp('2.5%')}px;
    align-self: flex-start;
`;

const TaskPrioritySelect = styled(View)`
    flex: 1;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
`;

const PriorityItem = styled(TouchableOpacity)<{
	selectBackgroundColor: string;
}>`
	width: ${wp('25%')}px;
	height: ${hp('6%')}px;
	align-items: center;
	justify-content: center;
	margin: ${hp('2.5%')}px;
	border-radius: ${hp('0.5%')}px;
	background-color: ${(props) => props.selectBackgroundColor};
`;

const PrioritySelectHeading = styled(Text)`
	${(props) => props.theme.fonts.size.delta};
    color: ${(props) => props.theme.colors.textPrimary};
    align-self: flex-start;
	padding-left: ${hp('2.2%')}px;
	text-transform: uppercase;
	opacity: 0.5;
`;

const AddButtonWrapper = styled(View)`
    flex: 1;
    width: ${wp('92%')}px;
    margin: ${hp('1%')}px 0;
`;

const TaskItemList = styled(View)`
    margin: ${hp('1%')}px;
`;

//----

export default connector(withTheme(ProjectTaskScreen));
