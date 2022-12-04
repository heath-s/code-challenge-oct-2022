import { ExplorerItemData } from 'types/explorer';

type JsonData = { [key: string]: string };
type ParsedData = { [key: string]: ParsedValue };
type ParsedValue = string | ParsedData;

function getByPath(obj: ParsedData, key: string): ParsedValue | undefined {
  try {
    return key.split('.').reduce<ParsedValue | undefined>(
      (traversed, splitKey) => (traversed as ParsedData)?.[splitKey],
      obj as ParsedData,
    );
  } catch (e) {
    return undefined;
  }
}

function setByPath(obj: ParsedData, key: string, value: string): void {
  const split = key.split('.');
  let traversed: ParsedData = obj;
  while (split.length) {
    const shifted = split.shift();
    if (!shifted) {
      break;
    }

    if (split.length) {
      traversed[shifted] = traversed[shifted] || {};
      traversed = traversed[shifted] as ParsedData;
    } else {
      traversed[shifted] = value;
    }
  }
}

class JsonParser {
  jsonData: JsonData = {};

  parsedData: ParsedData = {};

  load(rawData: string) {
    let parsedJson: any;
    try {
      parsedJson = JSON.parse(rawData);
      if (typeof parsedJson !== 'object' || parsedJson instanceof Array) {
        throw new Error();
      }
    } catch (e) {
      throw new Error('The file is not a valid JSON file.');
    }

    const entries = Object.entries(parsedJson);
    if (entries.length < 1) {
      throw new Error('The file is not a valid JSON file.');
    }
    const parsedData = entries.reduce((parsed, [key, value]) => {
      if (typeof value !== 'string') {
        throw new Error('The JSON file must be of single-level object whose values are string.');
      }
      if (!JsonParser.validateKeyName(key)) {
        throw new Error('The JSON file has an invalid key.');
      }
      if (getByPath(parsed, key)) {
        throw new Error('The JSON file has duplicated keys.');
      }
      const splitKey = key.split('.');
      for (let i = 0, len = splitKey.length - 1; i < len; i += 1) {
        splitKey.pop();
        if (typeof getByPath(parsed, splitKey.join('.')) === 'string') {
          throw new Error('The JSON file has duplicated keys.');
        }
      }
      setByPath(parsed, key, value);
      return parsed;
    }, {} as ParsedData);

    this.jsonData = parsedJson;
    this.parsedData = parsedData;
  }

  getExplorerItemDataChildren(parentKey?: string): ExplorerItemData[] {
    const suffixDotRemoved = parentKey?.replace(/\.$/, '');
    const parent = suffixDotRemoved
      ? getByPath(this.parsedData, suffixDotRemoved)
      : this.parsedData;
    if (!parent || typeof parent === 'string') {
      return [];
    }

    const newParentKey = suffixDotRemoved ? `${suffixDotRemoved}.` : '';
    return Object.entries(parent).map(([key, value]) => (
      typeof value === 'string'
        ? ({ key: `${newParentKey}${key}`, name: key, type: 'file' })
        : ({ key: `${newParentKey}${key}.`, name: key, type: 'folder' })
    ));
  }

  getValue(key: string): string {
    return this.jsonData[key];
  }

  static validateKeyName(key: string): boolean {
    return !!(
      key.match(/^[\w\d.]+$/g)
      && !key.match(/(^\.)|(\.{2,})|(\.$)/g)
    );
  }
}

export default JsonParser;
