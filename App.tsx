import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
	createStackNavigator,
	TransitionPresets
} from '@react-navigation/stack';

import { Provider } from 'react-redux';
import configureStore from '/redux/configureStore';
import { PersistGate } from 'redux-persist/integration/react';

import { RootStackParamList, MainScreen, NewProjectScreen, ProjectTaskScreen, ProjectScreen } from '/screens/';
import Theme from '/styles/themeComponent/';

const RootStack = createStackNavigator<RootStackParamList>();
const { store, persistor } = configureStore();

export default function App() {
	return (
		<Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Theme>
                    <NavigationContainer>
                        <RootStack.Navigator
                            initialRouteName="Main"
                            headerMode={'float'}
                            screenOptions={{
                                gestureEnabled: true,
                                ...TransitionPresets.SlideFromRightIOS
                            }}
                        >
                            <RootStack.Screen
                                name="Main"
                                component={MainScreen}
                                initialParams={{}}
                                options={{
                                    headerShown: false,
                                }}
                            />
                            <RootStack.Screen
                                name="NewProject"
                                component={NewProjectScreen}
                                initialParams={{}}
                                options={{
                                    headerShown: false,
                                    gestureDirection: 'horizontal',
                                }}
                            />
                            <RootStack.Screen
                                name="ProjectTasks"
                                component={ProjectTaskScreen}
                                initialParams={{
                                    projectId: ''
                                }}
                                options={{
                                    headerShown: false,
                                    gestureDirection: 'horizontal',
                                }}
                            />
                            <RootStack.Screen
                                name="Project"
                                component={ProjectScreen}
                                initialParams={{}}
                                options={{
                                    headerShown: false,
                                    gestureDirection: 'horizontal',
                                }}
                            />
                        </RootStack.Navigator>
                    </NavigationContainer>
                </Theme>
            </PersistGate>
		</Provider>
	);
}
