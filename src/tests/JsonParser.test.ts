import JsonParser from 'services/JsonParser';
import sampleJson from './data/sample.json';
import sampleStringJson from './data/sample-error-1.json';
import sampleNumberJson from './data/sample-error-2.json';
import sampleArrayJson from './data/sample-error-3.json';
import sampleDuplicatedKeysJson1 from './data/sample-error-4.json';
import sampleDuplicatedKeysJson2 from './data/sample-error-4-1.json';
import sampleNotJson from './data/sample-error-5.json';
import sampleNestedJson from './data/sample-error-6.json';
import sampleInvalidKeyJson from './data/sample-error-7.json';
import sampleEmptyJson from './data/sample-error-8.json';

const stringifiedSample = JSON.stringify(sampleJson);

describe('JsonParser', () => {
  describe('JsonParser#load', () => {
    describe('try importing invalid files', () => {
      let parser: JsonParser;

      beforeAll(() => {
        parser = new JsonParser();
      });

      test('the file is a string', () => {
        expect(() => parser.load(JSON.stringify(sampleStringJson))).toThrowError('The file is not a valid JSON file.');
      });

      test('the file is a number', () => {
        expect(() => parser.load(JSON.stringify(sampleNumberJson))).toThrowError('The file is not a valid JSON file.');
      });

      test('the file is an array', () => {
        expect(() => parser.load(JSON.stringify(sampleArrayJson))).toThrowError('The file is not a valid JSON file.');
      });

      test('the object has duplicated keys', () => {
        expect(() => parser.load(JSON.stringify(sampleDuplicatedKeysJson1))).toThrowError('The JSON file has duplicated keys.');
        expect(() => parser.load(JSON.stringify(sampleDuplicatedKeysJson2))).toThrowError('The JSON file has duplicated keys.');
      });

      test('the file is not a json', () => {
        expect(() => parser.load(JSON.stringify(sampleNotJson))).toThrowError('The file is not a valid JSON file.');
      });

      test('the object has a nested object', () => {
        expect(() => parser.load(JSON.stringify(sampleNestedJson))).toThrowError('The JSON file must be of single-level object whose values are string.');
      });

      test('the object has an invalid key', () => {
        expect(() => parser.load(JSON.stringify(sampleInvalidKeyJson))).toThrowError('The JSON file has an invalid key.');
      });

      test('the object is empty', () => {
        expect(() => parser.load(JSON.stringify(sampleEmptyJson))).toThrowError('The file is not a valid JSON file.');
      });
    });

    test('import valid json file', () => {
      const parser = new JsonParser();
      expect(() => parser.load(stringifiedSample)).not.toThrow();
      expect(parser.getExplorerItemDataChildren()).toEqual([
        { key: 'tagTable.', name: 'tagTable', type: 'folder' },
        { key: 'tagDropdown.', name: 'tagDropdown', type: 'folder' },
        { key: 'topmostFile', name: 'topmostFile', type: 'file' },
      ]);
      expect(parser.getValue('tagTable.columns.createdBy')).toBe('Created by');
    });
  });

  describe('JsonParser#getExplorerItemDataChildren', () => {
    let parser: JsonParser;

    beforeAll(() => {
      parser = new JsonParser();
      parser.load(stringifiedSample);
    });

    test('try getting children from folder keys which don\'t exist', () => {
      expect(parser.getExplorerItemDataChildren('tagTable_none')).toEqual([]);
      expect(parser.getExplorerItemDataChildren('topmostFile')).toEqual([]);
      expect(parser.getExplorerItemDataChildren('tagTable.columns_none')).toEqual([]);
      expect(parser.getExplorerItemDataChildren('tagTable.columns.createdBy')).toEqual([]);
      expect(parser.getExplorerItemDataChildren('tagTable.columns.createdBy_none')).toEqual([]);

      expect(parser.getExplorerItemDataChildren('asdfASDF!@#$')).toEqual([]);
      expect(parser.getExplorerItemDataChildren('..')).toEqual([]);
      expect(parser.getExplorerItemDataChildren('.abcd.')).toEqual([]);
      expect(parser.getExplorerItemDataChildren('abcd..efgh')).toEqual([]);
    });

    test('get children from folder keys which exist', () => {
      const topChildren = [
        { key: 'tagTable.', name: 'tagTable', type: 'folder' },
        { key: 'tagDropdown.', name: 'tagDropdown', type: 'folder' },
        { key: 'topmostFile', name: 'topmostFile', type: 'file' },
      ];
      expect(parser.getExplorerItemDataChildren()).toEqual(topChildren);
      expect(parser.getExplorerItemDataChildren('')).toEqual(topChildren);
      expect(parser.getExplorerItemDataChildren('.')).toEqual(topChildren);

      const tagTableChildren = [
        { key: 'tagTable.columns.', name: 'columns', type: 'folder' },
        { key: 'tagTable.createRow.', name: 'createRow', type: 'folder' },
      ];
      expect(parser.getExplorerItemDataChildren('tagTable')).toEqual(tagTableChildren);
      expect(parser.getExplorerItemDataChildren('tagTable.')).toEqual(tagTableChildren);
      const tagTableColumnsChildren = [
        { key: 'tagTable.columns.createdBy', name: 'createdBy', type: 'file' },
        { key: 'tagTable.columns.createdOn', name: 'createdOn', type: 'file' },
        { key: 'tagTable.columns.name', name: 'name', type: 'file' },
        { key: 'tagTable.columns.tickets', name: 'tickets', type: 'file' },
      ];
      expect(parser.getExplorerItemDataChildren('tagTable.columns')).toEqual(tagTableColumnsChildren);
      expect(parser.getExplorerItemDataChildren('tagTable.columns.')).toEqual(tagTableColumnsChildren);

      const tagDropdownCreateNewTagChildren = [
        { key: 'tagDropdown.createNewTag.btn.', name: 'btn', type: 'folder' },
        { key: 'tagDropdown.createNewTag.nameField.', name: 'nameField', type: 'folder' },
        { key: 'tagDropdown.createNewTag.title', name: 'title', type: 'file' },
      ];
      expect(parser.getExplorerItemDataChildren('tagDropdown.createNewTag')).toEqual(tagDropdownCreateNewTagChildren);
      expect(parser.getExplorerItemDataChildren('tagDropdown.createNewTag.')).toEqual(tagDropdownCreateNewTagChildren);
    });
  });

  describe('JsonParser#getValue', () => {
    let parser: JsonParser;

    beforeAll(() => {
      parser = new JsonParser();
      parser.load(stringifiedSample);
    });

    test('try getting values from keys which don\'t exist', () => {
      expect(parser.getValue('tagTable')).toBeFalsy();
      expect(parser.getValue('tagTable.columns')).toBeFalsy();
      expect(parser.getValue('tagTable.columns.createdBy_none')).toBeFalsy();
      expect(parser.getValue('tagTable.columns.createdBy.')).toBeFalsy();
      expect(parser.getValue('topmostFile.')).toBeFalsy();
    });

    test('get values from keys which exist', () => {
      expect(parser.getValue('tagTable.columns.createdBy')).toBe('Created by');
      expect(parser.getValue('tagTable.createRow.btn.cancel')).toBe('Cancel');
      expect(parser.getValue('topmostFile')).toBe('Topmost Text Sample');
    });
  });

  describe('JsonParser.validateKeyName', () => {
    test('test invalid key names', () => {
      expect(JsonParser.validateKeyName('')).toBeFalsy();

      expect(JsonParser.validateKeyName('abcd1234')).toBeTruthy();
      expect(JsonParser.validateKeyName('abcd1234!@#$')).toBeFalsy();

      expect(JsonParser.validateKeyName('abcd.1234.ABCD')).toBeTruthy();
      expect(JsonParser.validateKeyName('abcd.1234.!@#$')).toBeFalsy();
      expect(JsonParser.validateKeyName('abcd..ABCD')).toBeFalsy();
      expect(JsonParser.validateKeyName('.abcdABCD')).toBeFalsy();
      expect(JsonParser.validateKeyName('abcdABCD.')).toBeFalsy();
    });

    test('test valid key names', () => {
      expect(JsonParser.validateKeyName('abcd1234')).toBeTruthy();
      expect(JsonParser.validateKeyName('1234abcd')).toBeTruthy();
      expect(JsonParser.validateKeyName('abcd.1234')).toBeTruthy();
      expect(JsonParser.validateKeyName('a.b.c.d.e.f.g.h.i.j.1.2.3.4')).toBeTruthy();
    });
  });
});
