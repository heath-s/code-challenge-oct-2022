import {
  memo, useEffect, useRef, useState,
} from 'react';
import ExplorerList from 'components/explorer/list';
import { useAppPageSelector } from 'store/ducks/pages/app.duck';
import { useAppSettingItem } from 'store/ducks/app-setting.duck';
import AppExplorerItemController from './explorer-item';
import AppExplorerLaneWidthHandleController from './explorer-lane-width-handle';

const LIST_LANE_WIDTH_KEY = 'app.layout.listLaneWidth';
const LIST_LANE_MIN_WIDTH = 240;

interface AppExplorerListControllerProps {
  index: number;
}

function AppExplorerListController({
  index,
}: AppExplorerListControllerProps) {
  const data = useAppPageSelector(
    ({ lists }) => lists[index],
    (prev, next) => prev.key === next.key,
  );

  const [listWidthSetting, setListWidthSetting] = useAppSettingItem(
    LIST_LANE_WIDTH_KEY,
    LIST_LANE_MIN_WIDTH,
  );
  const [listWidth, setListWidth] = useState<number>(0);
  const initialListWidthRef = useRef<number>(0);
  const initialListLeftRef = useRef<number>(0);

  useEffect(() => {
    if (listWidthSetting) {
      setListWidth(Math.max(listWidthSetting, LIST_LANE_MIN_WIDTH));
    }
  }, [listWidthSetting]);

  const handleMouseDown = (left: number) => {
    initialListWidthRef.current = listWidth;
    initialListLeftRef.current = left;
  };

  const handleMouseMove = (left: number) => {
    const newWidth = Math.max(
      initialListWidthRef.current + (left - initialListLeftRef.current),
      LIST_LANE_MIN_WIDTH,
    );
    setListWidth(newWidth);
  };

  const handleMouseUp = () => {
    setListWidthSetting(listWidth);
  };

  return (
    <ExplorerList id={`keynav.group#${data.key}`} role="group" width={listWidth}>
      {data.items.map((item, itemIndex) => (
        <AppExplorerItemController itemIndex={itemIndex} listIndex={index} key={item.key} />
      ))}
      <AppExplorerLaneWidthHandleController
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        position="right"
      />
    </ExplorerList>
  );
}

export default memo(AppExplorerListController);
