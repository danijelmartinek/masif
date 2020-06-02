import { Action } from 'redux';
import { ThemeType, SelectedTheme } from '/styles/types';

export interface StoreStateType {
    OPTIONS: object,
    THEME_OPTIONS: ThemeType,
    DEFAULT_THEME: SelectedTheme,

    // ALL_PROJECTS: [],
    // PROJECT_INFO: getTemplateData("project"),
    // LOG_INFO: getTemplateData("log"),

    // REF_COUNTER: {}
}

export interface ActionType extends Action {
    type: string,
    [name: string]: any
}