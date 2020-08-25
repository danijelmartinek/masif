import MainScreen from "./Main";
// import ProjectScreen from "./Project";
import NewProjectScreen from "./NewProject";
import ProjectTaskScreen from "./ProjectTasks";

export type RootStackParamList = {
    Main: {},
    NewProject: {}
    //Project: {},
    ProjectTasks: {}
};

export {
    MainScreen,
    // ProjectScreen,
    NewProjectScreen,
    ProjectTaskScreen
}