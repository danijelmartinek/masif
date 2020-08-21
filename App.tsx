import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, TransitionSpecs, HeaderStyleInterpolators } from '@react-navigation/stack';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Reducer from '/redux/store';

import { RootStackParamList, MainScreen, ProjectScreen } from '/screens/';
import Theme from '/styles/themeComponent/';

const RootStack = createStackNavigator<RootStackParamList>();
const store = createStore(Reducer);

export default function App() {
	return (
        <Provider store={store}> 
            <Theme>
                <NavigationContainer>
                    <RootStack.Navigator initialRouteName="Main">
                        <RootStack.Screen
                            name="Main"
                            component={MainScreen}
                            initialParams={{}}
                            options={{
                                headerShown: false,
                            }}
                        />
                        <RootStack.Screen
                            name="Project"
                            component={ProjectScreen}
                            initialParams={{}}
                            options={{
                                gestureDirection: 'horizontal' 
                            }}
                        />
                    </RootStack.Navigator>
                </NavigationContainer>
            </Theme>
        </Provider>
	);
}
