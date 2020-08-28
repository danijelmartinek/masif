// import Firebase from "_/database/firebase/setFunctions.js"
// import { getTemplateData } from './initStates.js';

// types
import { ActionType, ProjectType, ProjectTaskType } from './types';
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
            const selectedProjectObject = allProjects.find(project => project._id === selectedProject)
			return {
				...themeOpts,
				project: selectedProjectObject ? selectedProjectObject.projectThemeOptions : themeOpts.project
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
			let projects = allProjects.filter(pro => pro._id !== projectId);

			return projects;
        },
        checkSelectedProject: (selectedProjectId: string) => {
			if(selectedProjectId === projectId) {
                return '';
            } else {
                return selectedProjectId;
            }
        },
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

export function addTask(newTask: ProjectTaskType, projectId: string): ActionType {
	return {
        type: 'ADD_TASK',
        addTaskToProjectsArray: (allProjects: ProjectType[]) => {
            const mappedProjects = allProjects.map((pro: ProjectType) => {
                if(pro._id === projectId) {
                    pro.tasks = [newTask,...pro.tasks];
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
                if(pro._id === projectId) {
                    pro.tasks = pro.tasks.filter(task => task._id !== taskId);
                }
                return pro;
            });

			return mappedProjects;
		}
	};
}

export function toggleTaskState(taskId: string, projectId: string, taskChecked: boolean): ActionType {
	return {
        type: 'TOGGLE_TASK_STATE',
        toggleTaskStateInProjectArray: (allProjects: ProjectType[]) => {
            const mappedProjects = allProjects.map((pro: ProjectType) => {
                if(pro._id === projectId) {
                    const mappedTasks = pro.tasks.map((task) => {
                        if(task._id === taskId) {
                            task.checked = taskChecked;
                        }
                        return task;
                    })
                    return {...pro, tasks: mappedTasks};
                }
                return pro;
            });

			return mappedProjects;
        },
		// toggleTaskState: (selectedProject: ProjectType) => {
		// 	let project = { ...selectedProject };
        //     let toggled = project.tasks.find((task) => task._id === taskId);

		// 	if (toggled) {
        //         let toggledIndex = project.tasks.indexOf(toggled);
		// 		project.tasks[toggledIndex] = {
        //             ...{checked: !toggled.checked},
        //             ...toggled
        //         }

		// 		return project;
		// 	} else {
		// 		return project;
		// 	}
        // }
	};
}

// export function startCounter(obj) {
// 	return {
// 		type: 'START_COUNTER'
// 	}
// }

// export function resumeCounter(obj) {
// 	return {
// 		type: 'RESUME_COUNTER'
// 	}
// }

// export function stopCounter(obj) {
// 	return {
// 		type: 'STOP_COUNTER'
// 	}
// }

// export function updateCounter(obj) {
// 	return {
// 		type: 'UPDATE_COUNTER',
// 		payload: obj
// 	}
// }

// export function refCounter(ref) {
// 	return {
// 		type: 'REF_COUNTER',
// 		payload: ref
// 	}
// }

// export function toggleTodo(todoId, isChecked) {
// 	return {
// 		type: 'TOGGLE_TODO',
// 		toggleTodo: (projectObj) => {
// 			projectObj.tasks.map((task, i) => {
// 				if(task.id === todoId) {
// 					task.checked = !task.checked
// 				}
// 			})
// 			return projectObj;
// 		},

// 		addTodoToLog: (logObj) => {
// 			if(!isChecked) {
// 				logObj.tasks.push(todoId);
// 			} else {
// 				const ind = logObj.tasks.indexOf(todoId);
// 				if (ind > -1) {
// 					logObj.tasks.splice(ind, 1);
// 				}
// 			}

// 			return logObj;
// 		}
// 	}
// }

// export function changeSelectedProject(project) {
// 	return {
// 		type: 'CHANGE_SELECTED_PROJECT',
// 		changeProject: () => {
// 			return Object.assign(getTemplateData("project"), project);
// 		}
// 	}
// }

// const getdata = async () => {

// 	let options = await Firebase.options()
// 	.then(data => {
// 		return Firebase.normalizeData('options', data);
// 	})
// 	.catch(err => {
// 		console.log(err);
// 		return Firebase.normalizeData('options');
// 	})

// 	let projects = await Firebase.getAll('projects')
// 	.then(res => {
// 		return res.data.map(project => {
// 			return Firebase.normalizeData('project', project)
// 		});
// 	})
// 	.catch(err => {
// 		console.log(err);
// 	})

// 	let tasks = await Firebase.getAll('tasks')
// 	.then(res => {
// 		return res.data.map(task => {
// 			return Firebase.normalizeData('task', task)
// 		});
// 	})
// 	.catch(err => {
// 		console.log(err);
// 	})

// 	let selectedProject = await projects[0]
// 	if(options.selectedProject){
// 		selectedProject = projects.find(el => el.id === options.selectedProject) || projects[0];
// 	}

// 	selectedProject.tasks = await selectedProject.tasks.map(taskId => {
// 		return tasks.find(task => task.id === taskId)
// 	})

// 	return Promise.resolve({
// 		options,
// 		projects,
// 		selectedProject
// 	})
// }

// export function initData(dispatch) {
// 	getdata()
// 	.then(data => {
// 		dispatch({
// 			type: 'INIT_DATA',
// 			options: data.options,
// 			projects: data.projects,
// 			selectedProject: () => {
// 				return Object.assign(getTemplateData("project"), data.selectedProject);
// 			}
// 		})
// 	})
// }
