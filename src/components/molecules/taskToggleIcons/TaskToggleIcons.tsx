import React, { useRef } from 'react';
import {
	View,
	Button,
	StyleSheet,
	ScrollView,
	Text,
	NativeSyntheticEvent,
	NativeScrollEvent
} from 'react-native';
import styled, { withTheme } from 'styled-components';

import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp
} from '/utils/dimensions';

import { SelectedTheme } from '/styles/types';

type PropsWithTheme = {
	theme: SelectedTheme;
};

const MtGraphContainer = (props: PropsWithTheme) => {
	return (
		<View>
			
		</View>
	);
};
export default withTheme(MtGraphContainer);
