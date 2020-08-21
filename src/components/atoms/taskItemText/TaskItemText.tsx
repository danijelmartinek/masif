import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components';

//---- types

type Props = {
    textColor: string;
    textSize: number;
    padding: number;
    text: string;
};

//---- component

const TaskItemText = (props: Props) => {
	return (
		<TaskItemTextWrapper>
            <TaskItemTextElem numberOfLines={1} color={props.textColor} size={props.textSize} padding={props.padding}>
                {props.text}
            </TaskItemTextElem>
        </TaskItemTextWrapper>
	);
};

//---- default props

TaskItemText.defaultProps = {
    textColor: '#ffffff',
    textSize: 16,
    padding: 0,
    text: ''
};

//---- styles

const TaskItemTextWrapper = styled(View)`
    flex: 6;
    justify-content: center;
    height: 100%;
`;

const TaskItemTextElem = styled(Text)<{
    color: string,
    size: number,
    padding: number
}>`
    padding: ${(props) => props.padding}px;
    font-weight: bold;
    font-size: ${(props) => props.size}px;
    color: ${(props) => props.color};
`;

//----

export default TaskItemText;
