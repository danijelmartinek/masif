import { Action } from 'redux';
import { ThemeType, SelectedTheme, ProjectThemeOptionsType } from '/styles/types';

export interface ProjectTaskType {
    _id: string;
    text: string;
    priority: string;
    checked: boolean;
    createdAt: number;
    updatedAt: number;
}

export interface ActivityPauseType {
    pauseStart: number;
    pauseEnd: number;
}

export interface ProjectActivityType {
    startTime: number;
    countTime: number;
    endTime: number;
    totalSessionTime: number;
    pauseTime: number;
    pauseEntities: ActivityPauseType[];
}

export interface ProjectType {
    _id: string;
    name: string;
    projectThemeOptions: ProjectThemeOptionsType;
    tasks: ProjectTaskType[];
    activities: ProjectActivityType[];
    graphPoints: [number, number, number?][];
    createdAt: number;
    updatedAt: number;
}

export interface StoreStateType {
    OPTIONS: object,
    THEME_OPTIONS: ThemeType,
    DEFAULT_THEME: SelectedTheme,

    ALL_PROJECTS?: ProjectType[],
    SELECTED_PROJECT: ProjectType
    // LOG_INFO: getTemplateData("log"),

    // REF_COUNTER: {}
}

export interface ActionType extends Action {
    type: string,
    [name: string]: any
}