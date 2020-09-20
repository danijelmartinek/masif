// Copyright © 2020, Danijel Martinek. All rights reserved. 
// This project was created by Danijel Martinek (danijel@martinek.xyz) 

import React, { FunctionComponent } from 'react';
import { connect, ConnectedProps } from 'react-redux'
import { ThemeProvider } from "styled-components/native";

import { StoreStateType } from '/redux/types'

const mapState = (state: StoreStateType) => ({
    DEFAULT_THEME: state.DEFAULT_THEME,
    THEME_OPTIONS: state.THEME_OPTIONS
})
const connector = connect(mapState);

type Props = ConnectedProps<typeof connector>;

const Theme: FunctionComponent<Props> = (props) => {
    return (
        <ThemeProvider theme={props.DEFAULT_THEME}>
            {props.children}
        </ThemeProvider>
    )
}

export default connector(Theme);