import React, { FunctionComponentElement, ComponentElement } from 'react';
import { PanGestureHandler, TapGestureHandler } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';

//---- types

type Props = {
    snapPoints: number[];
    initialSnap?: number;
    enabledGestureInteraction?: boolean;
    enabledHeaderGestureInteraction?: boolean;
    enabledContentGestureInteraction?: boolean;
    enabledContentTapInteraction?: boolean;
    enabledManualSnapping?: boolean;
    enabledBottomClamp?: boolean;
    enabledBottomInitialAnimation?: boolean;
    enabledInnerScrolling?: boolean;
    callbackNode?: Animated.Value<number>;
    contentPosition?: Animated.Value<number>;
    headerPosition?: Animated.Value<number>;
    overdragResistanceFactor?: number;
    springConfig?: object;
    innerGestureHandlerRefs?: [React.RefObject<PanGestureHandler>, React.RefObject<PanGestureHandler>, React.RefObject<TapGestureHandler>];
    simultaneousHandlers?: React.RefObject<any> | React.RefObject<any>[];
    onOpenStart?: (() => void);
    onOpenEnd?: (() => void);
    onCloseStart?: (() => void);
    onCloseEnd?: (() => void);
    callbackThreshold?: number;
    borderRadius?: number;
    children?: FunctionComponentElement<any> | ComponentElement<any, any>;
    renderHeader?: FunctionComponentElement<any> | ComponentElement<any, any>;
};

//---- component

const Sheet = React.forwardRef<BottomSheet, Props>((props, ref) => {
	return (
		<BottomSheet
            ref={ref}
            snapPoints={props.snapPoints}
            initialSnap={props.initialSnap}
            enabledGestureInteraction={props.enabledGestureInteraction}
            enabledHeaderGestureInteraction={props.enabledHeaderGestureInteraction}
            enabledContentGestureInteraction={props.enabledContentGestureInteraction}
            enabledContentTapInteraction={props.enabledContentTapInteraction}
            enabledManualSnapping={props.enabledManualSnapping}
            enabledBottomClamp={props.enabledBottomClamp}
            enabledBottomInitialAnimation={props.enabledBottomInitialAnimation}
            enabledInnerScrolling={props.enabledInnerScrolling}
            callbackNode={props.callbackNode}
            contentPosition={props.contentPosition}
            headerPosition={props.headerPosition}
            overdragResistanceFactor={props.overdragResistanceFactor}
            springConfig={props.springConfig}
            innerGestureHandlerRefs={props.innerGestureHandlerRefs}
            simultaneousHandlers={props.simultaneousHandlers}
            onOpenStart={props.onOpenStart}
            onOpenEnd={props.onOpenEnd}
            onCloseStart={props.onCloseStart}
            onCloseEnd={props.onCloseEnd}
            callbackThreshold={props.callbackThreshold}
            borderRadius={props.borderRadius}
            renderContent={() => props.children}
            renderHeader={() => props.renderHeader}
        />
	);
});

//----

export default Sheet;