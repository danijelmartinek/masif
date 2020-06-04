import {
    MtGraphPointType,
    MaxAxesPoints,
    SvgLineSegmentType
} from './../types';

export const flipYpoints = (maxY: number, points: MtGraphPointType[]): MtGraphPointType[] => {
    // substracting max height value (graph height) with Y for every point
    return points.map((p) => [p[0], maxY - p[1], p[2]]);
};

export const getMaxPoints = (points: MtGraphPointType[]): MaxAxesPoints => {
    let Xaxis = points.map((p: MtGraphPointType) => p[0]);
    let Yaxis = points.map((p: MtGraphPointType) => p[1]);

    return {
        x: Math.max.apply(null, Xaxis),
        y: Math.max.apply(null, Yaxis)
    };
};


export const closePath = (
    points: MtGraphPointType[],
    firstPoint: MtGraphPointType,
    lastPoint: MtGraphPointType
): MtGraphPointType[] => {
    return [...points, [lastPoint[0], 0], [firstPoint[0], 0]];
};

export const lineParams = (
    pointA: MtGraphPointType,
    pointB: MtGraphPointType
): SvgLineSegmentType => {
    const lengthX: number = pointB[0] - pointA[0];
    const lengthY: number = pointB[1] - pointA[1];

    return {
        length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
        angle: Math.atan2(lengthY, lengthX)
    };
};

export const controlPoint = (
    current: MtGraphPointType,
    previous: MtGraphPointType | undefined,
    next: MtGraphPointType | undefined,
    reverse: boolean,
    smoothing: number = 0
): MtGraphPointType => {
    // When 'current' is the first or last point of the array
    // 'previous' or 'next' don't exist.
    // Replace with 'current'
    const p: MtGraphPointType = previous || current;
    const n: MtGraphPointType = next || current;

    // Properties of the opposed-line
    const o: SvgLineSegmentType = lineParams(p, n);

    // If is end-control-point, add PI to the angle to go backward
    const angle: number = o.angle + (reverse ? Math.PI : 0);
    const length: number = o.length * smoothing;

    // The control point position is relative to the current point
    const x: number = current[0] + Math.cos(angle) * length;
    const y: number = current[1] + Math.sin(angle) * length;
    return [x, y];
};

export const bezierCommand = (
    point: MtGraphPointType,
    i: number,
    a: MtGraphPointType[],
    smoothing: number | undefined
): string => {
    let roundThreeDec = (num: number): number =>
        Math.round(num * 1000) / 1000;

    // start control point
    const cps: MtGraphPointType = controlPoint(
        a[i - 1],
        a[i - 2],
        point,
        false,
        smoothing
    );

    // end control point
    const cpe: MtGraphPointType = controlPoint(
        point,
        a[i - 1],
        a[i + 1],
        true,
        smoothing
    );

    return `C ${roundThreeDec(cps[0])},${roundThreeDec(
        cps[1]
    )} ${roundThreeDec(cpe[0])},${roundThreeDec(cpe[1])} ${roundThreeDec(
        point[0]
    )},${roundThreeDec(point[1])}`;
};

type SvgCommandFunction = typeof bezierCommand;

export default function svgPath(
    points: MtGraphPointType[],
    command: SvgCommandFunction
): string {
    // build the d attributes by looping over the points
    const d: string = points.reduce(
        (
            acc: string | undefined,
            point: MtGraphPointType,
            i: number,
            a: MtGraphPointType[]
        ) =>
            i === 0
                ? `M ${point[0]},${point[1]}`
                : `${acc} ${command(point, i, a, point[2])}`,
        ''
    );
    return d;
};