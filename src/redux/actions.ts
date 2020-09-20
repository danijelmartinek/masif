// Copyright © 2020, Danijel Martinek. All rights reserved. 
// This project was created by Danijel Martinek (danijel@martinek.xyz) 

// types
import {
	ActionType,
	ProjectType,
	ProjectTaskType,
	ProjectSessionType
} from './types';
import { ThemeMode, ThemeType, SelectedTheme } from '/styles/types';

/**
 * Changes app theme.
 *
 * @param mode - theme mode (e.g. dark or light)
 * @returns theme object with colors, fonts and other options
 */
export function setTheme(mode: ThemeMode): ActionType {
	return {
		type: 'SET_THEME',
		setTheme: (themeOpts: ThemeType) => {
			let defaultTheme: SelectedTheme = {
				...themeOpts[mode],
				fonts: themeOpts.fonts,
				options: themeOpts.options,
				project: themeOpts.project
			};

			return defaultTheme;
		}
	};
}

export function setProjectTheme(): ActionType {
	return {
		type: 'SET_PROJECT_THEME',
		setProjectTheme: (
			themeOpts: SelectedTheme,
			allProjects: ProjectType[],
			selectedProject: string
		) => {
			const selectedProjectObject = allProjects.find(
				(project) => project._id === selectedProject
			);
			return {
				...themeOpts,
				project: selectedProjectObject
					? selectedProjectObject.projectThemeOptions
					: themeOpts.project
			};
		}
	};
}

export function addProject(newProject: ProjectType): ActionType {
	return {
		type: 'ADD_PROJECT',
		addProject: (allProjects: ProjectType[]) => {
			let projects = [...allProjects];
			projects.push(newProject);

			return projects;
		}
	};
}

export function removeProject(projectId: string): ActionType {
	return {
		type: 'REMOVE_PROJECT',
		removeProject: (allProjects: ProjectType[]) => {
			let projects = allProjects.filter((pro) => pro._id !== projectId);

			return projects;
		},
		checkSelectedProject: (selectedProjectId: string) => {
			if (selectedProjectId === projectId) {
				return '';
			} else {
				return selectedProjectId;
			}
		}
	};
}

export function editProject(editedProject: ProjectType): ActionType {
	return {
		type: 'EDIT_PROJECT',
		editProject: (allProjects: ProjectType[]) => {
			let projects = allProjects.map((pro) => {
				if (pro._id === editedProject._id) {
					pro.name = editedProject.name;
					pro.projectThemeOptions = editedProject.projectThemeOptions;
				}
				return pro;
			});

			return projects;
		}
	};
}

export function selectProject(selectProjectIndex: number): ActionType {
	return {
		type: 'SELECT_PROJECT',
		selectProject: (allProjects: ProjectType[]) => {
			return allProjects[selectProjectIndex]._id;
		}
	};
}

export function addTask(
	newTask: ProjectTaskType,
	projectId: string
): ActionType {
	return {
		type: 'ADD_TASK',
		addTaskToProjectsArray: (allProjects: ProjectType[]) => {
			const mappedProjects = allProjects.map((pro: ProjectType) => {
				if (pro._id === projectId) {
					pro.tasks = [newTask, ...pro.tasks];
				}
				return pro;
			});

			return mappedProjects;
		}
	};
}

export function removeTask(taskId: string, projectId: string): ActionType {
	return {
		type: 'REMOVE_TASK',
		removeTaskFromProjectsArray: (allProjects: ProjectType[]) => {
			const mappedProjects = allProjects.map((pro: ProjectType) => {
				if (pro._id === projectId) {
					pro.tasks = pro.tasks.filter((task) => task._id !== taskId);
				}
				return pro;
			});

			return mappedProjects;
		}
	};
}

export function toggleTaskState(
	taskId: string,
	projectId: string,
	taskChecked: boolean
): ActionType {
	return {
		type: 'TOGGLE_TASK_STATE',
		toggleTaskStateInProjectArray: (allProjects: ProjectType[]) => {
			const mappedProjects = allProjects.map((pro: ProjectType) => {
				if (pro._id === projectId) {
					const mappedTasks = pro.tasks.map((task) => {
						if (task._id === taskId) {
							task.checked = taskChecked;
						}
						return task;
					});
					return { ...pro, tasks: mappedTasks };
				}
				return pro;
			});

			return mappedProjects;
		}
	};
}

export function setSelectedActivityIndex(activityIndex: number): ActionType {
	return {
		type: 'SET_SELECTED_ACTIVITY_INDEX',
		setSelectedActivityIndex: () => {
			return activityIndex;
		}
	};
}

export function addSessionToProject(
	projectId: string,
	session: ProjectSessionType
): ActionType {
	return {
		type: 'ADD_SESSION_TO_PROJECT',
		addSessionToProject: (allProjects: ProjectType[]) => {
			const mappedProjects = allProjects.map((pro: ProjectType) => {
				if (pro._id === projectId) {
					pro.sessions = [...pro.sessions, session];
				}
				return pro;
			});

			return mappedProjects;
		}
	};
}
