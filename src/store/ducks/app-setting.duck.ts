import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { EqualityFn, TypedUseSelectorHook, useSelector } from 'react-redux';
import { useCallback, useMemo } from 'react';
import { AppSettingData, AppSettingDataKey, AppSettingDataType } from 'services/AppSetting/schema';
import { load, parseItem, save } from 'services/AppSetting';
import { RootState, useAppDispatch } from 'store';

const DUCK_NAME = 'appSetting';

interface AppSettingSetPayload<K extends AppSettingDataKey = AppSettingDataKey> {
  key: K;
  value: AppSettingDataType[K];
}

export interface AppSettingState {
  setting: AppSettingDataType;
}

const initialState: AppSettingState = {
  setting: AppSettingData.parse({}),
};

export const appSettingSlice = createSlice({
  name: DUCK_NAME,
  initialState,
  reducers: {
    load(state) {
      state.setting = load();
    },

    save({ setting }) {
      save(setting);
    },

    setItem: {
      reducer(
        { setting },
        { payload: { key, value } }: PayloadAction<AppSettingSetPayload>,
      ) {
        setting[key] = parseItem(key, value);
        save(current(setting));
      },
      prepare<K extends AppSettingDataKey>(key: K, value: AppSettingDataType[K]) {
        return {
          payload: { key, value },
        };
      },
    },
  },
});

export const { actions, name, reducer } = appSettingSlice;

export const useAppSettingSelector: TypedUseSelectorHook<AppSettingState> = (
   <TSelected>(
    selector: (state: AppSettingState) => TSelected, equalityFn?: EqualityFn<TSelected>,
  ): TSelected => useSelector<RootState, TSelected>(
    (state) => selector(state[DUCK_NAME]),
    equalityFn,
  )
);

export const useAppSettingItem = <K extends AppSettingDataKey>(
  key: K, defaultValue?: AppSettingDataType[K],
) => {
  const dispatch = useAppDispatch();
  const selected = useAppSettingSelector((state) => state.setting?.[key] ?? defaultValue);
  const set = useCallback(
    (value: AppSettingDataType[K]) => dispatch(actions.setItem(key, value)),
    [dispatch, key],
  );

  return useMemo(() => [selected, set] as const, [selected, set]);
};
