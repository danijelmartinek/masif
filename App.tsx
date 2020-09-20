// Copyright © 2020, Danijel Martinek. All rights reserved. 
// This project was created by Danijel Martinek (danijel@martinek.xyz) 


import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
	createStackNavigator,
	TransitionPresets
} from '@react-navigation/stack';

import { Provider } from 'react-redux';
import configureStore from '/redux/configureStore';
import { PersistGate } from 'redux-persist/integration/react';

import {
	RootStackParamList,
	InitialScreen,
	HelloScreen,
	MainScreen,
	NewProjectScreen,
	EditProjectScreen,
	ProjectTaskScreen
} from '/screens/';
import Theme from '/styles/themeComponent/';

import { CounterProvider } from '/context/counter';
import { OptionsModalProvider } from '/context/optionsModal';

const RootStack = createStackNavigator<RootStackParamList>();
const { store, persistor } = configureStore();

export default function App() {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Theme>
					<CounterProvider>
						<OptionsModalProvider>
							<NavigationContainer>
								<RootStack.Navigator
									initialRouteName="Initial"
									headerMode={'float'}
								>
									<RootStack.Screen
										name="Initial"
										component={InitialScreen}
										options={{
											headerShown: false,
											animationEnabled: false
										}}
									/>
									<RootStack.Screen
										name="Hello"
										component={HelloScreen}
										options={{
											headerShown: false,
											animationEnabled: false
										}}
									/>
									<RootStack.Screen
										name="Main"
										component={MainScreen}
										options={{
											headerShown: false,
											animationEnabled: false
										}}
									/>
									<RootStack.Screen
										name="NewProject"
										component={NewProjectScreen}
										initialParams={{}}
										options={{
											headerShown: false,
											gestureEnabled: true,
											...TransitionPresets.SlideFromRightIOS
										}}
									/>
									<RootStack.Screen
										name="EditProject"
										component={EditProjectScreen}
										initialParams={{}}
										options={{
											headerShown: false,
											gestureEnabled: true,
											...TransitionPresets.SlideFromRightIOS
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
											gestureEnabled: true,
											...TransitionPresets.SlideFromRightIOS
										}}
									/>
								</RootStack.Navigator>
							</NavigationContainer>
						</OptionsModalProvider>
					</CounterProvider>
				</Theme>
			</PersistGate>
		</Provider>
	);
}
