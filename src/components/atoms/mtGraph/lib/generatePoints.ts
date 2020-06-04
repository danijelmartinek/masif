import {
    MtGraphPointType,
    RangeType
} from './../types';

//make midpoint between 2 points
export const makePoint = (
    leftIndex: MtGraphPointType,
    rightIndex: MtGraphPointType
): MtGraphPointType | false => {
    const deltaX = (rightIndex[0] - leftIndex[0]) / 2;
    const deltaY = (rightIndex[1] - leftIndex[1]) / 2;

    // checking if Y from leftIndex is same as Y from rightIndex
    if (Math.round(deltaY) == 0) {
        return false;
    }

    //getting random number between -1 and 1, rounded to 2 decimals
    const displacementIndex =
        Math.round(
            (Math.random() > 0.5 ? 1 : -1) * Math.random() * 100
        ) / 100;

    let newPointX = leftIndex[0] + deltaX;
    let newPointY = leftIndex[1] + deltaY + deltaY * displacementIndex;

    // round to 2 decimals
    return [
        Math.round(newPointX * 100) / 100,
        Math.round(newPointY * 100) / 100
    ];
};

export default function generatePoints(
    startPoint: MtGraphPointType,
    endPoint: MtGraphPointType,
    midpointRange: RangeType
): MtGraphPointType[] {

    // get random between
    const randomIter = (min: number, max: number) => {
        // min and max included
        let num = Math.random() * (max - min) + min;
        return Math.round(num);
    };

    //points array
    let points = [startPoint, endPoint];

    //generate random number of appended points
    let pointsArrLen = randomIter(midpointRange.min, midpointRange.max);

    for (let i = 0; i < pointsArrLen; i++) {
        // new point random index
        let randomIndex = randomIter(0, points.length - 2);
        let newPoint: MtGraphPointType | false = makePoint(
            points[randomIndex],
            points[randomIndex + 1]
        );

        if (newPoint) {
            points.splice(randomIndex + 1, 0, newPoint);
        }
    }

    return points;
};