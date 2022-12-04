import { z } from 'zod';

export const AppSettingDataValidationMap = {
  'app.layout.listLaneWidth': z.number().int().min(240).default(240),
  test: z.number().int().min(0).max(100)
    .default(25),
};

export const AppSettingData = z.object(AppSettingDataValidationMap).default({});

export type AppSettingDataType = z.infer<typeof AppSettingData>;
export type AppSettingDataKey = keyof AppSettingDataType;
