import {
    MtGraphPointType,
    RangeType
} from './../types';

export const randomSmoothing = (min: number, max: number): number => {
	// min and max included
	let num = Math.random() * (max - min) + min;
	return Math.round((num + Number.EPSILON) * 100) / 100;
};

export default function addSmoothingToPoints(
    points: MtGraphPointType[],
    smoothingRange: RangeType
): MtGraphPointType[] {
	return points.map((p: MtGraphPointType) => [
		p[0],
		p[1],
		randomSmoothing(smoothingRange.min, smoothingRange.max)
	]);
}
