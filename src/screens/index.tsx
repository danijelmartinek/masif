import InitialScreen from './Initial';
import HelloScreen from './Hello';
import MainScreen from './Main';
import NewProjectScreen from './NewProject';
import EditProjectScreen from './EditProject';
import ProjectTaskScreen from './ProjectTasks';

export type RootStackParamList = {
	Initial: {};
	Hello: {};
	Main: {};
	NewProject: {};
	EditProject: {};
	ProjectTasks: {
		projectId: string;
	};
};

export {
	InitialScreen,
	HelloScreen,
	MainScreen,
    NewProjectScreen,
    EditProjectScreen,
	ProjectTaskScreen
};
