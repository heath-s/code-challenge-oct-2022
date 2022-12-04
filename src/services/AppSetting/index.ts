import {
  AppSettingData, AppSettingDataKey, AppSettingDataType, AppSettingDataValidationMap,
} from './schema';

const STORAGE_KEY = 'APP_SETTING';

export const parseItem = <K extends AppSettingDataKey>(key: K, value: AppSettingDataType[K]) => {
  const validator = AppSettingDataValidationMap[key];
  if (!validator) {
    throw new Error('no validator found for key');
  }

  const parsed = validator.safeParse(value);
  return parsed.success ? parsed.data : validator.parse(undefined);
};

export const parseData = (data: Partial<AppSettingDataType>) => {
  const parsed = AppSettingData.safeParse(data);
  if (parsed.success) {
    return parsed.data;
  }
  if (typeof data === 'object' && !!data) {
    return Object
      .entries(data)
      .reduce((reduced, pair) => {
        const [key, value] = (
          pair as [AppSettingDataKey, AppSettingDataType[AppSettingDataKey]]
        );
        const validator = AppSettingDataValidationMap[key];
        if (validator) {
          const val = validator.safeParse(value);
          // eslint-disable-next-line no-param-reassign
          reduced[key] = val.success ? val.data : validator.parse(undefined);
        }
        return reduced;
      }, AppSettingData.parse(undefined));
  }
  return AppSettingData.parse(undefined);
};

export const load = (): AppSettingDataType => {
  if (typeof window?.localStorage === 'undefined') {
    return AppSettingData.parse(undefined);
  }

  try {
    const saved = JSON.parse(
      window.localStorage.getItem(STORAGE_KEY) || '',
    );
    return parseData(saved);
  } catch (e) {
    return AppSettingData.parse(undefined);
  }
};

export const save = (setting: AppSettingDataType) => {
  if (typeof window?.localStorage === 'undefined') {
    return;
  }

  const parsed = AppSettingData.safeParse(setting);
  if (parsed.success) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed.data));
  }
};
