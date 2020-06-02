// types
import { ThemeType, SelectedTheme, ThemeMode } from '/styles/types';

 /**
 * Initialization of theme.
 *
 * @param themeOptions - object with multiple theme variants and other app options
 * @param mode - theme mode (e.g. dark or light)
 * @returns the arithmetic mean of `x` and `y`
 */
const initTheme = (themeOpts: ThemeType, mode: ThemeMode) => {
    let defaultTheme: SelectedTheme = {
        ...themeOpts[mode],  
        fonts: themeOpts.fonts, 
        options: themeOpts.options,
        project: themeOpts.project
    }
    return defaultTheme;
}

// const getTemplateData = (type) => {
//     const initProjectInfo = {
//         labelColor: '#ffffff',
//         name: 'Lorem Ipsum',
//         timeInfo: {
//             totalTime: 0,
//             totalPauseTime: 0,
//             startTime: ''
//         },
//         logs: [],
//         tasks: [],
//         commits: []
//     }
    
//     const initLogInfo = {
//         active: false,
//         startTime: '-',
//         countTime: 0,
//         endTime: '',
//         totalSessionTime: 0,
//         pauseTime: 0,
//         pauseEntities: [],
//         tasks: [],
//         commits: []
//     }

//     const initOptions = {
//         selectedProject: ''
//     }

//     const initTaskInfo = {
//         todo: '',
//         checked: false
//     }

//     if(type === "project") {
//         return initProjectInfo;
//     } else if(type === "log") {
//         return initLogInfo;
//     } else if(type === "task") {
//         return initTaskInfo;
//     } else if(type === "options") {
//         return initOptions;
//     } else {
//         return null;
//     }
// }



export {
    initTheme,
    // getTemplateData
}