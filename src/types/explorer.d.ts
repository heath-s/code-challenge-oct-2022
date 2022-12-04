export type ExplorerItemType = 'folder' | 'file';

export interface ExplorerItemData {
  key: string;
  name: string;
  type: ExplorerItemType;
}

export interface ExplorerListData {
  items: ExplorerItemData[];
  key: string;
}

export interface ExplorerPreviewData {
  content: string;
  key: string;
}
