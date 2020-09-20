// Copyright © 2020, Danijel Martinek. All rights reserved. 
// This project was created by Danijel Martinek (danijel@martinek.xyz) 


import themeOptions from '/styles/';
import { initTheme } from './initStates';

import { StoreStateType, ActionType } from './types';
import { ThemeMode } from '/styles/types';

const initialState: StoreStateType = {
	OPTIONS: {},
	THEME_OPTIONS: themeOptions,
	DEFAULT_THEME: initTheme(themeOptions, ThemeMode.DARK),

	ALL_PROJECTS: [],
	SELECTED_PROJECT: '',
	SELECTED_ACTIVITY_INDEX: -1
};

const Reducer = (
	state: StoreStateType = initialState,
	action: ActionType
): StoreStateType => {
	switch (action.type) {
		case 'SET_THEME':
			return {
				...state,
				DEFAULT_THEME: action.setTheme(state.THEME_OPTIONS)
			};
		case 'SET_PROJECT_THEME':
			return {
				...state,
				DEFAULT_THEME: action.setProjectTheme(
					state.DEFAULT_THEME,
					state.ALL_PROJECTS,
					state.SELECTED_PROJECT
				)
			};

		case 'ADD_PROJECT':
			return {
				...state,
				ALL_PROJECTS: action.addProject(state.ALL_PROJECTS)
			};
		case 'EDIT_PROJECT':
			return {
				...state,
				ALL_PROJECTS: action.editProject(state.ALL_PROJECTS)
			};
		case 'REMOVE_PROJECT':
			return {
				...state,
				ALL_PROJECTS: action.removeProject(state.ALL_PROJECTS),
				SELECTED_PROJECT: action.checkSelectedProject(
					state.SELECTED_PROJECT
				)
			};

		case 'SELECT_PROJECT':
			return {
				...state,
				SELECTED_PROJECT: action.selectProject(state.ALL_PROJECTS)
			};
		case 'ADD_TASK':
			return {
				...state,
				ALL_PROJECTS: action.addTaskToProjectsArray(state.ALL_PROJECTS)
			};
		case 'REMOVE_TASK':
			return {
				...state,
				ALL_PROJECTS: action.removeTaskFromProjectsArray(
					state.ALL_PROJECTS
				)
			};
		case 'TOGGLE_TASK_STATE':
			return {
				...state,
				ALL_PROJECTS: action.toggleTaskStateInProjectArray(
					state.ALL_PROJECTS
				)
			};
		case 'SET_SELECTED_ACTIVITY_INDEX':
			return {
				...state,
				SELECTED_ACTIVITY_INDEX: action.setSelectedActivityIndex()
			};
		case 'ADD_SESSION_TO_PROJECT':
			return {
				...state,
				ALL_PROJECTS: action.addSessionToProject(state.ALL_PROJECTS)
			};

		default:
			return state;
	}
};

export default Reducer;
