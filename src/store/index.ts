import {
  combineReducers, configureStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { name as appSettingName, reducer as appSettingReducer } from 'store/ducks/app-setting.duck';

const staticReducers: ReducersMapObject = {
  [appSettingName]: appSettingReducer,
};
const asyncReducers: ReducersMapObject = {};

const createReducer = (reducers?: ReducersMapObject) => combineReducers({
  ...staticReducers,
  ...(reducers || {}),
});

export const store = configureStore({
  reducer: createReducer(),
});

export const injectReducer = (key: string, reducer: Reducer) => {
  if (!asyncReducers[key]) {
    asyncReducers[key] = reducer;
    store.replaceReducer(createReducer(asyncReducers));
  }
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
