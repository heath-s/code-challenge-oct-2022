import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { cloneDeep } from 'lodash';
import { EqualityFn, TypedUseSelectorHook, useSelector } from 'react-redux';
import { ExplorerItemData, ExplorerListData, ExplorerPreviewData } from 'types/explorer';
import { RootState } from 'store';
import JsonParser from 'services/JsonParser';

let parser = new JsonParser();

const getDataSorted = (list: ExplorerItemData[]) => list.sort((a, b) => {
  if (a.type === b.type) {
    return a.name < b.name ? -1 : 0;
  }
  return a.type === 'folder' ? -1 : 0;
});

const DUCK_NAME = 'pages/app';

export interface AppPageState {
  isEmpty: boolean;
  lists: ExplorerListData[];
  preview: ExplorerPreviewData | undefined;
  selectedKey: string;
}

const initialState: AppPageState = {
  isEmpty: true,
  lists: [],
  preview: undefined,
  selectedKey: '',
};

export const load = createAsyncThunk<ExplorerItemData[], string>(
  `${DUCK_NAME}/loadFile`,
  async (text, { rejectWithValue }) => {
    try {
      parser.load(text);
      return parser.getExplorerItemDataChildren('');
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  },
);

export const appPageSlice = createSlice({
  name: DUCK_NAME,
  initialState,
  reducers: {
    reset: () => {
      parser = new JsonParser();
      return cloneDeep(initialState);
    },
    selectItem: (state, { payload }: PayloadAction<ExplorerItemData>) => {
      state.selectedKey = payload.key;
      const step = payload.key.split('.').length - 1;
      if (payload.type === 'file') {
        state.lists = state.lists.slice(0, step + 1);
        state.preview = {
          content: parser.getValue(payload.key),
          key: payload.key,
        };
      } else {
        state.lists = [...state.lists.slice(0, step), {
          items: getDataSorted(parser.getExplorerItemDataChildren(payload.key)),
          key: payload.key,
        }];
        state.preview = undefined;
      }
    },
    __storybook_setData: (_, { payload }: PayloadAction<AppPageState>) => payload,
  },
  extraReducers: (builder) => {
    builder
      .addCase(load.fulfilled, (_, { payload }) => ({
        ...cloneDeep(initialState),
        isEmpty: false,
        lists: [{
          items: getDataSorted(payload),
          key: '',
        }],
      }));
  },
});

export const { actions, name, reducer } = appPageSlice;

export const useAppPageSelector: TypedUseSelectorHook<AppPageState> = (
   <TSelected>(
    selector: (state: AppPageState) => TSelected, equalityFn?: EqualityFn<TSelected>,
  ): TSelected => useSelector<RootState, TSelected>(
    (state) => selector(state[DUCK_NAME]),
    equalityFn,
  )
);
