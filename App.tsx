import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Reducer from '/redux/store';

import { RootStackParamList, MainScreen } from '/screens/';
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
                            initialParams={{userId: '56'}}
                            options={{
                                headerShown: false,
                            }}
                        />
                    </RootStack.Navigator>
                </NavigationContainer>
            </Theme>
        </Provider>
	);
}
