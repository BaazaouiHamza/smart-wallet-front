import { connectRouter, routerMiddleware, RouterState } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import reduxSaga from 'redux-saga'
import * as effects from 'redux-saga/effects'

import * as notifications from './Notifications'

import {
  prosperusInitSaga,
  prosperusSaga,
  ProsperusActions,
  ProsperusState,
  prosperusReducer,
  NotRequested,
} from '@library/react-toolkit'

export type Actions = notifications.Actions | ProsperusActions

const sagaMiddleware = reduxSaga()
export const history = createBrowserHistory({ basename: '/web-wallet' })

// This is our global application state
export type State = {
  // Our application state lives here
  notifications: notifications.State
  // The router state
  router: RouterState
  // The ProsperUS state i.e. state related to account and workspace.
  prosperus: ProsperusState
}

// This declaration is required so we can get the right type in hooks like useSelector from
// react-redux
declare module 'react-redux' {
  interface DefaultRootState extends State {}
}

// Here we create our store by combining all the different modules' reducers.
const store = createStore(
  combineReducers<State>({
    notifications: notifications.reducer,
    router: connectRouter(history),
    prosperus: (s, a) =>
      prosperusReducer(
        s ?? {
          account: NotRequested,
          // @ts-ignore
          currentOrganization: NotRequested,
          selectModalActive: false,
        },
        a
      ),
  }),
  {},
  composeWithDevTools({ trace: true })(applyMiddleware(sagaMiddleware, routerMiddleware(history)))
)

function* initSaga() {
  yield effects.all([
    // @ts-ignore this requires an update to react-toolkit to add ANALYTICS as a module
    effects.fork(prosperusInitSaga, {
      allowPersonal: true,
      login: process.env.LOGIN,
      password: process.env.PASSWORD,
      activeModules: ['ANALYTICS'],
    }),
  ])
}

function* rootSaga() {
  yield effects.fork(initSaga)
  yield effects.all([
    // This is where we register all our application's sagas
    prosperusSaga(),
  ])
}

sagaMiddleware.run(rootSaga)

export default store
