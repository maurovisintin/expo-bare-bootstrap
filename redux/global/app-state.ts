import {
  ActionType,
  createStandardAction,
  createReducer
} from 'typesafe-actions';
import { createStructuredSelector } from 'reselect';
import { AppStateStatus } from 'react-native';

export type AppStateData = {
  appState: AppStateStatus | undefined;
};

const initialState = {
  appState: undefined
};

export type Selectors = {
  getAppState: AppStateStatus | undefined;
};

const actions = {
  set: createStandardAction('SET_APP_STATE')<AppStateData>()
};

export type AppStateActions = ActionType<typeof actions>;

const reducer = () =>
  createReducer<AppStateData, AppStateActions>(initialState).handleAction(
    actions.set,
    (state, { payload }) => ({
      ...state,
      ...payload
    })
  );

const select = createStructuredSelector<AppStateData, {}, Selectors>({
  getAppState: state => state.appState
});

export { actions, reducer, select };
