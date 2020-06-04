import { MtGraphPointType, RangeType } from './types';
import svgPath, { getMaxPoints, flipYpoints, bezierCommand } from './lib/path'
import generatePoints from './lib/generatePoints';
import addSmoothingToPoints from './lib/smoothPoints'

export default function generateMtGraph(
	points: MtGraphPointType[],
	reverse: boolean
): string {
    let maxAxes = getMaxPoints(points);
    
    if(reverse) {
        points = flipYpoints(maxAxes.y, points);
    }

    return svgPath(points, bezierCommand);
}

const generateSessionPoints = (startPoint: MtGraphPointType, endPoint: MtGraphPointType, smoothingRange: RangeType, midpointRange: RangeType) => {
    const newPoints = generatePoints(startPoint, endPoint, midpointRange);

    return addSmoothingToPoints(newPoints, smoothingRange);
}

export {
    getMaxPoints,
    generateSessionPoints
}
