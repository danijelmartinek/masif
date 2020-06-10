let sessions = [
    {
        path: {
            startPoint: [0, 0],
            peak: [50, 83],
        }
    },

    {
        path: {
            peak: [100, 103],
        }
    },

    {
        path: {
            peak: [150, 128],
        }
    },

    {
        path: {
            peak: [200, 220],
        }
    },

    {
        path: {
            peak: [250, 178],
        }
    },

    {
        path: {
            peak: [300, 152],
        }
    },

    {
        path: {
            peak: [350, 258],
        }
    },

    {
        path: {
            peak: [400, 258],
        }
    },

    {
        path: {
            peak: [450, 271],
        }
    },

    {
        path: {
            peak: [500, 296],
        }
    },

    {
        path: {
            peak: [550, 320],
        }
    },
]
  


let generatePoints = (startPoint, endPoint) => {

    //make point between 2 points 
    const makePoint = (leftIndex, rightIndex) => {

        const deltaX = (rightIndex[0] - leftIndex[0]) / 2;
        const deltaY = (rightIndex[1] - leftIndex[1]) / 2;
        
        // checking if Y from leftIndex is same as Y from rightIndex
        if(Math.round(deltaY) == 0) {
            return false;
        }
        
        //getting random number between -1 and 1, rounded to 2 decimals
        const displacementIndex = Math.round(((Math.random() > 0.5 ? 1 : -1) * Math.random()) * 100) / 100;
        
        let newPointX = leftIndex[0] + deltaX;
        let newPointY = leftIndex[1] + deltaY + (deltaY * displacementIndex);
        
        // round to 2 decimals
        return [Math.round(newPointX * 100) / 100, Math.round(newPointY * 100) / 100];
    }


    
    // get random between
    const randomIter = (min, max) => { // min and max included 
        let num = Math.random() * (max - min) + min;
        return Math.round(num) 
    }
    
    //points array
    let points = [startPoint, endPoint];

    //generate random number of appended points
    let pointsArrLen = randomIter(0, 5);

    for(let i = 0; i < pointsArrLen; i++) {

        // new point random index
        let randomIndex = randomIter(0, points.length - 2);
        let newPoint = makePoint(points[randomIndex], points[randomIndex + 1]);

        if(newPoint) {
            points.splice(randomIndex + 1, 0, newPoint) 
        }
    }

    return points;
}


// The smoothing ratio span
const smoothingMin = 0.05
const smoothingMax = 0.15
  
const randomSmoothing = (min, max) => { // min and max included 
    let num = Math.random() * (max - min) + min;
    return Math.round((num + Number.EPSILON) * 100) / 100
}

const addSmoothingToPoints = (points) => {
    return points.map(p => [p[0], p[1], randomSmoothing(smoothingMin, smoothingMax)])
}


const getMaxPoints = (points) => {
    let Xaxis = points.map(p => p[0])
    let Yaxis = points.map(p => p[1])
    
    return {
        x: Math.max.apply(null, Xaxis),
        y: Math.max.apply(null, Yaxis)
    }
}

const closePath = (points, firstPoint, lastPoint) => {
    return [...points, [lastPoint[0], 0], [firstPoint[0], 0]];
}

const flipYpoints = (maxY, points) => {
    // substracting max height value (graph height) with Y for every point
    return points.map(p => [p[0], maxY - p[1], p[2]]);
}


let logPoints = []

sessions.forEach((s, index) => {
    let p = []
    if(index > 0) {
        p = generatePoints(sessions[index - 1].path.peak, s.path.peak)
        p.shift(); //removing duplicated points (point already included in previous log, added to generate midpoints)
    } else {
        p = generatePoints([0, 0], s.path.peak)
    }

    let smoothPoints = addSmoothingToPoints(p)

    if(index === sessions.length - 1) {
        smoothPoints[smoothPoints.length - 1][2] = 0; //remove bezier curve from last point 
    } else {
        smoothPoints[smoothPoints.length - 1][2] = 0.025; //prevent too big bezier curve on main points
    }

    logPoints = [...logPoints, ...smoothPoints];
})

let dimensions = getMaxPoints(logPoints)
let closedPoints = closePath(logPoints, [0, 0], sessions[sessions.length - 1].path.peak, dimensions.y)

const points = flipYpoints(dimensions.y, closedPoints)

//let logpoints = generatePoints(sessions[0].path.startPoint, sessions[0].path.peak)
//let axis = getMaxPoints(logpoints)

//let spoints = addSmoothingToPoints(logpoints)

//let pointss = closePath(spoints, sessions[0].path.startPoint, sessions[0].path.peak, axis.y)

//const points = log[0].path.points
//const points = flipYpoints(axis.y, pointss)
  
  // Properties of a line 
  // I:  - pointA (array) [x,y]: coordinates
  //     - pointB (array) [x,y]: coordinates
  // O:  - (object) { length: l, angle: a }: properties of the line
  const line = (pointA, pointB) => {
    const lengthX = pointB[0] - pointA[0]
    const lengthY = pointB[1] - pointA[1]
    return {
      length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
      angle: Math.atan2(lengthY, lengthX)
    }
  }
  
  // Position of a control point 
  // I:  - current (array) [x, y]: current point coordinates
  //     - previous (array) [x, y]: previous point coordinates
  //     - next (array) [x, y]: next point coordinates
  //     - reverse (boolean, optional): sets the direction
  // O:  - (array) [x,y]: a tuple of coordinates
  const controlPoint = (current, previous, next, reverse, smoothing = 0) => {
  
    // When 'current' is the first or last point of the array
    // 'previous' or 'next' don't exist.
    // Replace with 'current'
    const p = previous || current
    const n = next || current
  
    // Properties of the opposed-line
    const o = line(p, n)
  
    // If is end-control-point, add PI to the angle to go backward
    const angle = o.angle + (reverse ? Math.PI : 0)
    const length = o.length * smoothing
  
    // The control point position is relative to the current point
    const x = current[0] + Math.cos(angle) * length
    const y = current[1] + Math.sin(angle) * length
    return [x, y]
  }
  
  // Create the bezier curve command 
  // I:  - point (array) [x,y]: current point coordinates
  //     - i (integer): index of 'point' in the array 'a'
  //     - a (array): complete array of points coordinates
  // O:  - (string) 'C x2,y2 x1,y1 x,y': SVG cubic bezier C command
  const bezierCommand = (point, i, a, smoothing) => {
    let roundThreeDec = (num) => Math.round(num * 1000) / 1000;
  
    // start control point
    const cps = controlPoint(a[i - 1], a[i - 2], point, false, smoothing)
  
    // end control point
    const cpe = controlPoint(point, a[i - 1], a[i + 1], true, smoothing)
    return `C ${roundThreeDec(cps[0])},${roundThreeDec(cps[1])} ${roundThreeDec(cpe[0])},${roundThreeDec(cpe[1])} ${roundThreeDec(point[0])},${roundThreeDec(point[1])}`
  }
  
  // Render the svg <path> element 
  // I:  - points (array): points coordinates
  //     - command (function)
  //       I:  - point (array) [x,y]: current point coordinates
  //           - i (integer): index of 'point' in the array 'a'
  //           - a (array): complete array of points coordinates
  //       O:  - (string) a svg path command
  // O:  - (string): a Svg <path> element
  const svgPath = (points, command) => {
    // build the d attributes by looping over the points
    const d = points.reduce((acc, point, i, a) => {
        i === 0
        ? `M ${point[0]},${point[1]}`
        : `${acc} ${command(point, i, a, point[2])}`
    }, '')

    return `<path d="${d} Z" fill="red" />`
  }
  
  const svg = document.querySelector('.svg')
  
  console.log(points)
  svg.setAttribute("viewBox", `0 -25 ${dimensions.x} ${dimensions.y + 25}`); 
  svg.innerHTML = svgPath(points, bezierCommand)
  