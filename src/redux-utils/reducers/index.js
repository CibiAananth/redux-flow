import { combineReducers } from 'redux';
// redux-utils
import photosReducer from 'redux-utils/reducers/photos';
import dummyReducer from 'redux-utils/reducers/dummy';

import reducerModel from 'models/reducerModel';

const limited = (reducer, predicate) => (state, action) => {
  if (predicate(action)) {
    return reducer(state, action);
  }
  return state;
};

const mainReducer = combineReducers({
  photo: limited(photosReducer, action =>
    action.meta ? action.meta.reducerID.includes(reducerModel.photo.id) : true
  ),
  dummy: limited(dummyReducer, action =>
    action.meta ? action.meta.reducerID.includes(reducerModel.auth.id) : true
  )
});

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    return undefined;
  }
  return mainReducer(state, action);
};

export default rootReducer;
