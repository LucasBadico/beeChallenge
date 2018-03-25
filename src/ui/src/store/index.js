import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { routerReducer } from 'react-router-redux';

import * as reducers from './reducers';
import * as epics from './epics';


const rootEpic = combineEpics(...epics);
const epicMiddleware = createEpicMiddleware(rootEpic);

export default ({ initialState = {} }) => {
  const store = createStore(
    combineReducers({
      ...reducers,
      routing: routerReducer,
    }),
    initialState,
    compose(
      applyMiddleware(epicMiddleware),
    )
  );
  return store;
};
