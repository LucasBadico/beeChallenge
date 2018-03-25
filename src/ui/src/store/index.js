import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { routerReducer } from 'react-router-redux';

import * as reducers from './store/reducers';
import * as epics from './store/epics';


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
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );
  return store;
};