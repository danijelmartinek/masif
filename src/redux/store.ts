import themeOptions from '/styles/';
import { initTheme } from './initStates';

import { StoreStateType, ActionType } from './types'
import { ThemeMode } from '/styles/types'

const initialState: StoreStateType = {
    OPTIONS: {},
    THEME_OPTIONS: themeOptions,
    DEFAULT_THEME: initTheme(themeOptions, ThemeMode.DARK),

    ALL_PROJECTS: [],
    SELECTED_PROJECT: '',
    // LOG_INFO: getTemplateData("log"),

    // COUNTER: {
    //     startTime: 0,
    //     elapsedTime: 0,
    //     activeTime: 0,
    //     pauseTime: 0
    // }
}

const Reducer = (state: StoreStateType = initialState, action: ActionType): StoreStateType => {
    switch (action.type) {
        case 'SET_THEME':
            return {
                ...state,
                DEFAULT_THEME: action.setTheme(state.THEME_OPTIONS)
            }
        case 'SET_PROJECT_THEME':
            return {
                ...state,
                DEFAULT_THEME: action.setProjectTheme(state.DEFAULT_THEME, state.ALL_PROJECTS, state.SELECTED_PROJECT)
            }

        case 'ADD_PROJECT':
            return {
                ...state,
                ALL_PROJECTS: action.addProject(state.ALL_PROJECTS)
            }

        case 'SELECT_PROJECT':
            return {
                ...state,
                SELECTED_PROJECT: action.selectProject(state.ALL_PROJECTS)
            }
        case 'ADD_TASK':
            return {
                ...state,
                ALL_PROJECTS: action.addTaskToProjectsArray(state.ALL_PROJECTS),
                // SELECTED_PROJECT: action.addTaskToSelectedProject(state.SELECTED_PROJECT)
            }
        case 'TOGGLE_TASK_STATE':
            return {
                ...state,
                ALL_PROJECTS: action.toggleTaskStateInProjectArray(state.ALL_PROJECTS),
                // SELECTED_PROJECT: action.toggleTaskState(state.SELECTED_PROJECT)
            }
        // case 'START_COUNTER':
        //     return {
        //         ...state,
        //         LOG_INFO: {
        //             ...state.LOG_INFO,
        //             active: true,
        //             startTime: new Date(),
        //         }
        //     }
        // case 'STOP_COUNTER':
        //     return {
        //         ...state,
        //         LOG_INFO: getTemplateData("log")
        //     }
        // case 'RESUME_COUNTER':
        //     return {
        //         ...state,
        //         LOG_INFO: {
        //             ...state.LOG_INFO,
        //             active: true,
        //         }
        //     }
        // case 'UPDATE_COUNTER':
        //     return {
        //         ...state,
        //         LOG_INFO: action.payload
        //     }

        // case 'TOGGLE_TODO':
        //     return {
        //         ...state,
        //         PROJECT_INFO: action.toggleTodo(state.PROJECT_INFO),
        //         LOG_INFO: action.addTodoToLog(state.LOG_INFO, state.PROJECT_INFO)
        //     }

        // case 'REF_COUNTER':
        //     return {
        //         ...state,
        //         REF_COUNTER: action.payload
        //     }

        // case 'CHANGE_SELECTED_PROJECT':
        //     return {
        //         ...state,
        //         PROJECT_INFO: action.changeProject(initialState.PROJECT_INFO)
        //     }

        // case 'INIT_DATA':
        //     return {
        //         ...state,
        //         OPTIONS: action.options,
        //         ALL_PROJECTS: action.projects,
        //         PROJECT_INFO: action.selectedProject(initialState.PROJECT_INFO)
        //     }

        default:
            return state
    }
}

export default Reducer;