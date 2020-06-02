
// import moment from 'moment';

// const secToString = (sec) => {
//     return moment.utc(moment.duration(sec, "seconds").asMilliseconds()).format("HH:mm")
// }

// const humanFormat = (dateString) => {
//     const dateNow = new Date();

//     if(moment(dateNow).format("YYYY") === moment(dateString).format("YYYY")) {
//         if(moment(dateNow).format("MMMM D") === moment(dateString).format("MMMM D")) {
//             return "Today";
//         } else if(moment(dateNow).subtract(1, 'days').format("MMMM D") === moment(dateString).format("MMMM D")){
//             return "Yesterday";
//         } else {
//             return moment(dateString).format("MMMM D")
//         }
//     } else {
//         return moment(dateString).format("MMMM D, YYYY")
//     }
// }

// const dateToHnM = (dateString) => {
//     if(dateString === '-') {
//         return '-';
//     } else {
//         return moment(dateString).format("HH:mm")
//     }
// }

// const subtractTime = (a, b) => {
//     const secA = new Date(a).getTime() / 1000;
//     const secB = new Date(b).getTime() / 1000;

//     let diff = secA - secB;
    
//     return secToString(diff);
// }

// const subtractTimeSeconds = (a, b) => {
//     const secA = new Date(a).getTime() / 1000;
//     const secB = new Date(b).getTime() / 1000;

//     let diff = secA - secB;
//     return Math.round(diff);
// }


// export {
//     secToString,
//     humanFormat,
//     dateToHnM,
//     subtractTime,
//     subtractTimeSeconds
// };