import * as React from 'react';
import { View, Text, Button, ScrollView, StatusBar } from 'react-native';
import styled, { withTheme } from 'styled-components';
import { connect, ConnectedProps } from 'react-redux';
import { setTheme } from '/redux/actions';
import Hiking from '/components/atoms/icons/Hiking.tsx';
import Camp_tent from '/components/atoms/icons/Camp_tent.tsx';
import Flag from '/components/atoms/icons/Flag.tsx';
import TaskCheck from '/components/atoms/icons/Task_check.tsx';
import Flame from '/components/atoms/icons/Flame.tsx';

import Constants from 'expo-constants';

import MtButton from '/components/atoms/mtButton/';

import MtGraphContainer from '/components/molecules/mtGraphContainer/';

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from './index';

import { SelectedTheme, ThemeMode } from '/styles/types';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from '/utils/dimensions';

const mapDispatch = {
    setTheme: (theme: ThemeMode) => setTheme(theme)
}
const connector = connect(null, mapDispatch)

type PropsFromRedux = ConnectedProps<typeof connector>
type Props = StackScreenProps<RootStackParamList, 'Main'>;
type PropsWithTheme = Props & PropsFromRedux & {
    theme: SelectedTheme
}

const MainScreen = (props: PropsWithTheme) => {
    const toggleTheme = () => {
        if(props.theme.label === 'dark') {
            props.setTheme(ThemeMode.LIGHT);
        } else {
            props.setTheme(ThemeMode.DARK);
        }

    }
	return (
		<View
			style={{
				flex: 1,
				alignItems: 'center',
				justifyContent: 'center',
                backgroundColor: props.theme.colors.primary,
                position: 'absolute'
			}}
		>
            <StatusBar translucent backgroundColor="transparent" barStyle={'light-content'} />
            <MtGraphContainer></MtGraphContainer>
			{/* <Text style={{color: props.theme.colors.textPrimary}}>Lorem Ipsum</Text>
            <Button title="Toggle Theme" onPress={() => toggleTheme()}></Button> */}
            <ActionsContainer>
                <MtButton icon={Camp_tent} activeOpacity={1} active={false} title="Stop"></MtButton>
                <MtButton icon={Hiking} activeOpacity={1} active={false} title="Stop"></MtButton>
                <MtButton icon={Camp_tent} activeOpacity={1} active={false} title="Stop"></MtButton>
            </ActionsContainer>
            <TasksContainer>
                <TasksHeader>
                    <TasksTitle>Tasks</TasksTitle>
                </TasksHeader>
                <ScrollView>
                    <TaskItem>
                        <TaskItemFlag>
                            <Flag flagColor="orange" text="" size={hp('3%')}></Flag>
                        </TaskItemFlag>
                        <TaskItemTextWrapper>
                            <TaskItemText numberOfLines={1}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </TaskItemText>
                        </TaskItemTextWrapper>
                        <TaskItemInfo>
                            <Flame color="#ffffff" size={hp('2%')}></Flame>
                            <PriorityText color={'red'}>High</PriorityText>
                        </TaskItemInfo>
                    </TaskItem>
                    <TaskItem>
                        <TaskItemFlag>
                            <TaskCheck size={hp('3%')} opacity={0.5}></TaskCheck>
                        </TaskItemFlag>
                        <TaskItemTextWrapper>
                            <TaskItemText numberOfLines={1}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </TaskItemText>
                        </TaskItemTextWrapper>
                        <TaskItemInfo>
                            <Flame color="#ffffff" size={hp('2%')}></Flame>
                            <PriorityText color={'yellow'}>Medium</PriorityText>
                        </TaskItemInfo>
                    </TaskItem>
                    <TaskItem>
                        <TaskItemFlag>
                            <Flag flagColor="orange" text="" size={hp('3%')}></Flag>
                        </TaskItemFlag>
                        <TaskItemTextWrapper>
                            <TaskItemText numberOfLines={1}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </TaskItemText>
                        </TaskItemTextWrapper>
                        <TaskItemInfo>
                            <Flame color="#ffffff" size={hp('2%')}></Flame>
                            <PriorityText color={'green'}>Low</PriorityText>
                        </TaskItemInfo>
                    </TaskItem>
                    <TaskItem>
                        <TaskItemFlag>
                            <Flag flagColor="orange" text="" size={hp('3%')}></Flag>
                        </TaskItemFlag>
                        <TaskItemTextWrapper>
                            <TaskItemText numberOfLines={1}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </TaskItemText>
                        </TaskItemTextWrapper>
                        <TaskItemInfo>
                            <Flame color="#ffffff" size={hp('2%')}></Flame>
                            <PriorityText color={'green'}>Low</PriorityText>
                        </TaskItemInfo>
                    </TaskItem>
                    <TaskItem>
                        <TaskItemFlag>
                            <Flag flagColor="orange" text="" size={hp('3%')}></Flag>
                        </TaskItemFlag>
                        <TaskItemTextWrapper>
                            <TaskItemText numberOfLines={1}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            </TaskItemText>
                        </TaskItemTextWrapper>
                        <TaskItemInfo>
                            <Flame color="#ffffff" size={hp('2%')}></Flame>
                            <PriorityText color={'green'}>Low</PriorityText>
                        </TaskItemInfo>
                    </TaskItem>
                    <TasksItemDistancer height={hp('5%')}></TasksItemDistancer>
                </ScrollView>
            </TasksContainer>
		</View>
	);
};

//---- styles

const ActionsContainer = styled(View)`
    width: ${wp('100%')}px;
    height: ${hp('10%')}px;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    background-color: ${(props) => props.theme.colors.primary};
`;

const TasksContainer = styled(View)`
    width: ${wp('100%')}px;
    height: ${hp('30%') + Constants.statusBarHeight}px;
`;

const TasksItemDistancer = styled(View)`
    width: ${wp('100%')}px;
    height: ${(props) => props.height}px;
`;

const TasksHeader = styled(View)`
    flex-direction: row;
    align-items: center;
    width: ${wp('100%')}px;
    height: ${hp('3%') + Constants.statusBarHeight}px;
`;

const TasksTitle = styled(Text)`
    margin-left: ${wp('2.5%')}px;
    color: ${(props: PropsWithTheme) => props.theme.colors.textPrimary};
    ${(props) => props.theme.fonts.size.beta};
`;

const TaskItem = styled(View)`
    flex-direction: row;
    width: ${wp('100%')}px;
    height: ${hp('5%')}px;
    margin: ${hp('1%')}px 0px;
`;

const TaskItemFlag = styled(View)`
    flex: 1;
    align-items: center;
    justify-content: center;
    height: 100%;
    border-right-width: 1px;
    border-right-color: rgba(255, 255, 255, 0.2);
`;

const TaskItemTextWrapper = styled(View)`
    flex: 8;
    align-items: center;
    justify-content: center;
    height: ${hp('5%')}px;
`;

const TaskItemText = styled(Text)`
    padding: ${hp('2%')}px;
    font-weight: bold;
    ${(props) => props.theme.fonts.size.gamma};
    color: ${(props: PropsWithTheme) => props.theme.colors.textPrimary};
`;

const TaskItemInfo = styled(View)`
    flex: 2;
    flex-direction: row;
    align-items: center;
    height: 100%;
`;

const PriorityText = styled(Text)`
    ${(props) => props.theme.fonts.size.delta};
    color: ${(props: PropsWithTheme) => props.color};
    padding: ${hp('0.25%')}px;
`;

//----

export default connector(withTheme(MainScreen));
