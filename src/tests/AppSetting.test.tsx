import { parseData, parseItem } from 'services/AppSetting';

describe('AppSetting', () => {
  describe('parseItem', () => {
    test('with defined key', () => {
      expect(parseItem('app.layout.listLaneWidth', 240)).toBe(240);
      expect(parseItem('app.layout.listLaneWidth', 239)).toBe(240);
      expect(parseItem('app.layout.listLaneWidth', 241)).toBe(241);
      expect(parseItem('app.layout.listLaneWidth', 240.1)).toBe(240);
      expect(parseItem('app.layout.listLaneWidth', '241' as any)).toBe(240);
      expect(parseItem('app.layout.listLaneWidth', true as any)).toBe(240);
      expect(parseItem('app.layout.listLaneWidth', null as any)).toBe(240);
      expect(parseItem('app.layout.listLaneWidth', undefined as any)).toBe(240);
      expect(parseItem('app.layout.listLaneWidth', {} as any)).toBe(240);
    });

    test('with not defined key', () => {
      expect(() => parseItem('NOT_DEFINED' as any, 0)).toThrowError('no validator found for key');
    });
  });

  describe('parseData', () => {
    test('with valid keys', () => {
      expect(parseData({ 'app.layout.listLaneWidth': 240, test: 50 }))
        .toStrictEqual(expect.objectContaining({ 'app.layout.listLaneWidth': 240, test: 50 }));
      expect(parseData({ 'app.layout.listLaneWidth': 239, test: 50 }))
        .toStrictEqual(expect.objectContaining({ 'app.layout.listLaneWidth': 240, test: 50 }));
      expect(parseData({ 'app.layout.listLaneWidth': 241, test: -1 }))
        .toStrictEqual(expect.objectContaining({ 'app.layout.listLaneWidth': 241, test: 25 }));
      expect(parseData({ 'app.layout.listLaneWidth': 241, test: 50 }))
        .toStrictEqual(expect.objectContaining({ 'app.layout.listLaneWidth': 241, test: 50 }));
      expect(parseData({ 'app.layout.listLaneWidth': 240.1, test: 1 }))
        .toStrictEqual(expect.objectContaining({ 'app.layout.listLaneWidth': 240, test: 1 }));
      expect(parseData({ 'app.layout.listLaneWidth': '241' as any }))
        .toStrictEqual(expect.objectContaining({ 'app.layout.listLaneWidth': 240, test: 25 }));
      expect(parseData({ 'app.layout.listLaneWidth': true as any }))
        .toStrictEqual(expect.objectContaining({ 'app.layout.listLaneWidth': 240, test: 25 }));
      expect(parseData({ 'app.layout.listLaneWidth': null as any }))
        .toStrictEqual(expect.objectContaining({ 'app.layout.listLaneWidth': 240, test: 25 }));
      expect(parseData({ 'app.layout.listLaneWidth': undefined as any }))
        .toStrictEqual(expect.objectContaining({ 'app.layout.listLaneWidth': 240, test: 25 }));
      expect(parseData({ 'app.layout.listLaneWidth': {} as any }))
        .toStrictEqual(expect.objectContaining({ 'app.layout.listLaneWidth': 240, test: 25 }));
    });

    test('with invalid structure', () => {
      expect(parseData('' as any)).toStrictEqual({ 'app.layout.listLaneWidth': 240, test: 25 });
      expect(parseData(true as any)).toStrictEqual({ 'app.layout.listLaneWidth': 240, test: 25 });
      expect(parseData(null as any)).toStrictEqual({ 'app.layout.listLaneWidth': 240, test: 25 });
      expect(parseData(undefined as any)).toStrictEqual({ 'app.layout.listLaneWidth': 240, test: 25 });
      expect(parseData({} as any)).toStrictEqual({ 'app.layout.listLaneWidth': 240, test: 25 });
      expect(parseData({ 'app.layout.listLaneWidth': 241, ['INVALID_KEY' as any]: 1 }))
        .toStrictEqual({ 'app.layout.listLaneWidth': 241, test: 25 });
      expect(parseData({ 'app.layout.listLaneWidth': 239, ['INVALID_KEY' as any]: 1 }))
        .toStrictEqual({ 'app.layout.listLaneWidth': 240, test: 25 });
    });
  });
});
