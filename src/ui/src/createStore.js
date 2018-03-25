import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { routerReducer } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';

import * as reducers from './store/reducers';
import * as epics from './store/reducers/Epics';

import Sagas from './store/middlewares/sagas';

const rootEpic = combineEpics(...epics);

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const epicMiddleware = createEpicMiddleware(rootEpic);

export default ({ initialState = {} }) => {
  const store = createStore(
    combineReducers({
      ...reducers,
      routing: routerReducer,
    }),
    initialState,
    compose(
      applyMiddleware(epicMiddleware, sagaMiddleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

  sagaMiddleware.run(Sagas);

  return store;
};
