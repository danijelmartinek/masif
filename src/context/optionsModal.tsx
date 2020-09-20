// Copyright © 2020, Danijel Martinek. All rights reserved. 
// This project was created by Danijel Martinek (danijel@martinek.xyz) 

import React, { useRef } from 'react';
import OptionsModal from '/components/molecules/optionsModal/';

const OptionsModalContext = React.createContext({});

export const OptionsModalProvider = (props: any) => {
    const optionsModalRef = useRef(null);

    const openOptions = (data: any = null, items: any = []) => {
        optionsModalRef?.current?.openOptions(data, items);
    }

    const closeOptions = () => {
        optionsModalRef?.current?.closeOptions();
    }

	return (
        <OptionsModalContext.Provider value={{openOptions, closeOptions}}>
            {props.children}
            <OptionsModal ref={optionsModalRef}></OptionsModal>
        </OptionsModalContext.Provider>
	);
};

export const OptionsModalConsumer = OptionsModalContext.Consumer;

export default OptionsModalContext;
