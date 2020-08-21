import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';

//---- types

type Props = {
    height: number;
    width: number;
};

//---- component

const Spacer = (props: Props) => {
	return (
		<SpacerWrapper
            width={props.width}
            height={props.height}
        ></SpacerWrapper>
	);
};

//---- default props

Spacer.defaultProps = {
    height: 1,
    width: 1
};

//---- styles

const SpacerWrapper = styled(View)<{
    width: number,
    height: number
}>`
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
`;

//----

export default Spacer;
