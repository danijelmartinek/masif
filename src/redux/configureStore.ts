import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

import rootReducer from './store';

const persistConfig = {
	key: 'root',
	storage: AsyncStorage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
    // AsyncStorage.clear(); //temporary disable persist
    
	let store = createStore(persistedReducer);
	let persistor = persistStore(store);

	return { store, persistor };
};
