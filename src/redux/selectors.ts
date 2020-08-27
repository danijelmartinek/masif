import { StoreStateType } from './types';

const getSelectedProject = (state: StoreStateType) => {
	return state.ALL_PROJECTS?.find(project => project._id === state.SELECTED_PROJECT);
};

export {
    getSelectedProject
}