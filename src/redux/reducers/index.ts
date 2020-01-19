import { combineReducers } from 'redux';
import { reducer as toastrReducer } from 'react-redux-toastr';

import drinksReducer from './drinks';
// import favoritesReducer from './favorites-reducer';
import ingredientReducer from './ingredients';
// import searchReducer from './search-reducer';
// import tagsReducer from './tags-reducer';
// import appReducer from './app-reducer';

// Redux: Root Reducer
const rootReducer = combineReducers({
  drinks: drinksReducer,
  // app: appReducer,
  // favorites: favoritesReducer,
  ingredients: ingredientReducer,
  toastr: toastrReducer,
  // tags: tagsReducer,
  // search: searchReducer,
});

// Exports
export default rootReducer;
