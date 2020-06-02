// import Firebase from "_/database/firebase/setFunctions.js"
// import { getTemplateData } from './initStates.js';


// types
import { ActionType } from './types';
import { ThemeMode, ThemeType, SelectedTheme } from '/styles/types'


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
            }

            return defaultTheme;
		}
	}
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
