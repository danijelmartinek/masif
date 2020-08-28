import InitialScreen from "./Initial";
import HelloScreen from "./Hello";
import MainScreen from "./Main";
import ProjectScreen from "./Project";
import NewProjectScreen from "./NewProject";
import ProjectTaskScreen from "./ProjectTasks";

export type RootStackParamList = {
    Initial: {},
    Hello: {},
    Main: {},
    NewProject: {}
    Project: {},
    ProjectTasks: {
        projectId: string;
    }
};

export {
    InitialScreen,
    HelloScreen,
    MainScreen,
    ProjectScreen,
    NewProjectScreen,
    ProjectTaskScreen
}