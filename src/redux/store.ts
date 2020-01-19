// import AsyncStorage from '@react-native-community/async-storage';
// import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
// import { persistStore, persistReducer } from 'redux-persist';
import thunk from 'redux-thunk';

// Imports: Redux
import rootReducer from './reducers';

// Middleware: Redux Persist Config
// const persistConfig = {
//   // Root?
//   key: 'root',
//   // Storage Method (React Native)
//   storage: AsyncStorage,
//   // Whitelist (Save Specific Reducers)
//   whitelist: ['favorites'],
//   // Blacklist (Don't Save Specific Reducers)
//   blacklist: ['drinks'],
// };

// Middleware: Redux Persist Persisted Reducer
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// Redux: Store
const store = createStore(
  // persistedReducer,
  rootReducer,
  compose(applyMiddleware(thunk), applyMiddleware(createLogger()))
);

// Middleware: Redux Persist Persister
// let persistor = persistStore(store);

// Exports
export { store };
