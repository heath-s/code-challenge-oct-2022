import { memo } from 'react';
import { actions, useAppPageSelector } from 'store/ducks/pages/app.duck';
import ExplorerItem from 'components/explorer/item';
import { ExplorerItemData } from 'types/explorer';
import { useAppDispatch } from 'store';

interface AppExplorerItemControllerProps {
  itemIndex: number;
  listIndex: number;
}

function AppExplorerItemController({
  itemIndex,
  listIndex,
}: AppExplorerItemControllerProps) {
  const dispatch = useAppDispatch();
  const listKey = useAppPageSelector(({ lists }) => lists[listIndex].key);
  const data = useAppPageSelector(
    ({ lists }) => lists[listIndex].items[itemIndex],
    (prev, next) => prev.key === next.key,
  );

  const handleClick = (item: ExplorerItemData) => {
    dispatch(actions.selectItem(item));
  };

  const isFirst = itemIndex === 0;
  const id = `keynav.item#${data.key}`;
  const selectedItself = useAppPageSelector(({ selectedKey }) => selectedKey === data.key);
  const current = (data.type === 'file' && selectedItself) ? 'page' : undefined;
  const expanded = useAppPageSelector(({ selectedKey }) => data.type === 'folder' && selectedKey?.startsWith(data.key));
  const owns = data.type === 'folder' ? `keynav.group#${data.key}` : undefined;
  const selected = selectedItself || expanded;
  const tabIndex = useAppPageSelector(({ selectedKey }) => {
    if (selected) {
      return 0;
    }
    if (!selectedKey && isFirst) {
      return 0;
    }
    if (selectedKey === listKey && selectedKey && isFirst) {
      return 0;
    }
    return -1;
  });

  return (
    <ExplorerItem
      aria-current={current}
      aria-expanded={expanded}
      aria-owns={owns}
      aria-selected={selected}
      /* aria-owns doesn't work properly on test env */
      data-aria-owns={owns}
      id={id}
      key={data.key}
      name={data.name}
      onClick={() => handleClick(data)}
      role="treeitem"
      selected={selectedItself}
      type={data.type}
      unfocused={expanded}
      tabIndex={tabIndex}
    />
  );
}

export default memo(AppExplorerItemController);
