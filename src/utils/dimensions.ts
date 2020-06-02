import { Dimensions, PixelRatio } from 'react-native';

/**
 * Converts width percentage string to DP number.
 *
 * @param widthPercent - width in percentage to convert to DP
 * @returns width in DP
 */
const widthPercentageToDP = (widthPercent: string): number => {
	const screenWidth: number = Dimensions.get('window').width;

	const elemWidth: number = parseFloat(widthPercent);
	return Math.round(
		PixelRatio.roundToNearestPixel((screenWidth * elemWidth) / 100)
	);
};

/**
 * Converts height percentage string to DP number.
 *
 * @param heightPercent - width in percentage to convert to DP
 * @returns height in DP
 */
const heightPercentageToDP = (heightPercent: string): number => {
	const screenHeight: number = Dimensions.get('window').height;

	const elemHeight: number = parseFloat(heightPercent);
	return Math.round(
		PixelRatio.roundToNearestPixel((screenHeight * elemHeight) / 100)
	);
};

export { widthPercentageToDP, heightPercentageToDP };
