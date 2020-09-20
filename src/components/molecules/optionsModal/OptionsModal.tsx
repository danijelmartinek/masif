import React, { useState, useRef, useImperativeHandle } from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback
} from 'react-native';
import styled, { withTheme } from 'styled-components';
import Constants from 'expo-constants';

import BottomSheet from '/components/atoms/bottomSheet/';
import BottomSheetType from 'reanimated-bottom-sheet';

import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from '/utils/dimensions';
import { hexToRGBA } from '/utils/colorFormat';
import { LinearGradient } from 'expo-linear-gradient';

//---- types

type PropsWithTheme = {
	ref: any;
};

//---- component

const OptionsModal = React.forwardRef((props: PropsWithTheme, ref) => {
	const [outerPressState, setOuterPressState] = useState<boolean>(false);
	const [contentState, setContentState] = useState<boolean>(false);

	const [options, setOptions] = useState([]);

	const [eventDataProps, setEventDataProps] = useState<any>(null);
	const sheetRef = useRef<BottomSheetType | null>(null);

	useImperativeHandle(ref, () => ({
		openOptions(data: any = null, opts = []) {
			setEventDataProps(data);
			setOptions(opts);

			sheetRef.current?.snapTo(1);
			setContentState(true);
			setOuterPressState(true);
			return true;
		},
		closeOptions() {
			sheetRef.current?.snapTo(0);
			setOuterPressState(false);
			return true;
		}
	}));

	return (
		<React.Fragment>
			{outerPressState ? (
				<TouchableWithoutFeedback
					onPress={() => ref?.current?.closeOptions()}
				>
					<OuterPressCloseHandler></OuterPressCloseHandler>
				</TouchableWithoutFeedback>
			) : null}
			<BottomSheet
				ref={sheetRef}
				snapPoints={[0, hp('35%') + options.length * hp('6%')]}
				initialSnap={0}
				enabledContentTapInteraction={false}
				onCloseEnd={() => {
					setContentState(false);
					ref?.current?.closeOptions();
				}}
			>
				{contentState ? (
					<OptionsSheetContainer pointerEvents={'box-none'}>
						<LinearGradient
							style={{ height: '100%' }}
							colors={[
								hexToRGBA(props.theme.colors.primary, 1),
								hexToRGBA(props.theme.colors.primary, 0.95),
								hexToRGBA(props.theme.colors.primary, 0.9),
								'transparent'
							]}
							start={{ x: 0, y: 1 }}
							end={{ x: 0, y: 0 }}
						>
							<OptionSheetWrapper>
								<OptionsSheetHeading>
									<OptionSheetHeadingText>
										Options
									</OptionSheetHeadingText>
								</OptionsSheetHeading>

								{options.map((option, i) => (
									<OptionSheetItem
										key={Math.random() * i}
										onPress={() =>
											option.f(
												ref?.current,
												eventDataProps
											)
										}
									>
										<OptionSheetItemText>
											{option.item}
										</OptionSheetItemText>
									</OptionSheetItem>
								))}

								<OptionsSheetClose>
									<CloseSheetItem
										onPress={() =>
											ref?.current?.closeOptions()
										}
									>
										<OptionSheetItemText>
											Cancel
										</OptionSheetItemText>
									</CloseSheetItem>
								</OptionsSheetClose>
							</OptionSheetWrapper>
						</LinearGradient>
					</OptionsSheetContainer>
				) : (
					<View></View>
				)}
			</BottomSheet>
		</React.Fragment>
	);
});

//---- styles

const OptionsSheetContainer = styled(View)`
	z-index: 999;
`;

const OuterPressCloseHandler = styled(View)`
	width: ${wp('100%')}px;
	height: ${hp('100%') + Constants.statusBarHeight}px;
	position: absolute;
	top: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0.01);
`;

const OptionSheetWrapper = styled(View)`
	width: ${wp('100%')}px;
	height: 100%;
	align-items: center;
	justify-content: center;
`;

const OptionSheetItem = styled(TouchableOpacity)`
	padding: ${hp('1.5%')}px ${wp('5%')}px;
`;

const OptionsSheetHeading = styled(View)`
	width: ${wp('100%')}px;
	position: absolute;
	top: ${hp('5%')}px; ;
`;

const OptionsSheetClose = styled(View)`
	width: ${wp('90%')}px;
	position: absolute;
	bottom: 0;
	border-top-width: 1px;
	border-color: ${(props) => hexToRGBA(props.theme.colors.textPrimary, 0.5)};
`;

const CloseSheetItem = styled(TouchableOpacity)`
	align-items: center;
	padding: ${hp('2.5%')}px;
`;

const OptionSheetHeadingText = styled(Text)`
	width: ${wp('100%')}px;
	${(props) => props.theme.fonts.size.alpha};
	color: ${(props) => props.theme.colors.textPrimary};
	text-align: center;
	font-weight: bold;
	text-transform: uppercase;
`;

const OptionSheetItemText = styled(Text)`
	${(props) => props.theme.fonts.size.beta};
	color: ${(props) => props.theme.colors.textPrimary};
`;

//----

export default withTheme(OptionsModal);
