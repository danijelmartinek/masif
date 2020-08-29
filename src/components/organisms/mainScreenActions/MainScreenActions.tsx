import React, { useState, useContext } from 'react';
import { View } from 'react-native';
import styled, { withTheme } from 'styled-components';
import CounterContext from '/context/counter';

import MtButton from '/components/atoms/mtButton/';

//---- types

import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from '/utils/dimensions';

import { SelectedTheme } from '/styles/types';

type PropsWithTheme = {
	theme: SelectedTheme;
};

//---- component

const MainScreenActions = (props: PropsWithTheme) => {
    const counter = useContext(CounterContext);
    const [actionStates, setActionStates] = useState<[boolean, boolean, boolean]>([false, false, false])

    const activityStart = () => {
        if(actionStates[2]) {
            counter.stopPause();
        } else {
            counter.startCounter();
        }
    }

    const activityPause = () => {
        counter.startPause();
    }

    const activityStop = () => {
        counter.stopCounter();
        setActionStates([false, false, false]);
    }

    const selectAction = (index: number) => {
        if(index === 0) {
            setActionStates([true, false, false]);
            activityStop();
        } else if(index === 1) {
            setActionStates([false, true, false]);
            activityStart();
        } else if(index === 2) {
            setActionStates([false, false, true]);
            activityPause();
        }
    }

    const getStartButtonText = () => {
        if(actionStates[1]) {
            return 'Active';
        } else if(actionStates[2]) {
            return 'Resume';
        } else {
            return 'Start';
        }
    }

    const getPauseButtonText = () => {
        if(actionStates[2]) {
            return 'Paused';
        }  else {
            return 'Pause';
        }
    }

	return (
		<ActionsContainer>
			<MtButton
                size={props.theme.fonts.oSize.gamma.fontSize}
				icon={'camp_tent'}
				activeOpacity={0.5}
				active={actionStates[0]}
                title="Stop"
                textColor={props.theme.colors.primary}
                backgroundColor={props.theme.colors.textPrimary}
                activeTextColor={props.theme.colors.textPrimary}
                activeBackgroundColor={props.theme.project.colors.projectPrimary}
                onPress={() => selectAction(0)}
                disabled={!actionStates[1] && !actionStates[2] ? true : false}
			></MtButton>
			<MtButton
                size={props.theme.fonts.oSize.gamma.fontSize}
				icon={'hiking'}
				activeOpacity={0.5}
				active={actionStates[1]}
                title={getStartButtonText()}
                textColor={props.theme.colors.primary}
                backgroundColor={props.theme.colors.textPrimary}
                activeTextColor={props.theme.colors.textPrimary}
                activeBackgroundColor={props.theme.project.colors.projectPrimary}
                onPress={() => selectAction(1)}
			></MtButton>
			<MtButton
                size={props.theme.fonts.oSize.gamma.fontSize}
				icon={'camp_fire'}
				activeOpacity={0.5}
				active={actionStates[2]}
                title={getPauseButtonText()}
                textColor={props.theme.colors.primary}
                backgroundColor={props.theme.colors.textPrimary}
                activeTextColor={props.theme.colors.textPrimary}
                activeBackgroundColor={props.theme.project.colors.projectPrimary}
                onPress={() => selectAction(2)}
                disabled={!actionStates[1] && !actionStates[2] ? true : false}
			></MtButton>
		</ActionsContainer>
	);
};

//---- styles

const ActionsContainer = styled(View)`
	width: ${wp('100%')}px;
	height: ${hp('10%')}px;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
	background-color: ${(props) => props.theme.colors.tertiary};
`;

//----

export default withTheme(MainScreenActions);
