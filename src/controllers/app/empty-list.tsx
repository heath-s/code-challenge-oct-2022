import ExplorerEmptyList from 'components/explorer/empty-list';
import { useAppSettingItem } from 'store/ducks/app-setting.duck';

const LIST_LANE_WIDTH_KEY = 'app.layout.listLaneWidth';
const LIST_LANE_MIN_WIDTH = 240;

function AppEmptyListController() {
  const [listWidthSetting] = useAppSettingItem(LIST_LANE_WIDTH_KEY, LIST_LANE_MIN_WIDTH);

  return (
    <ExplorerEmptyList width={listWidthSetting} />
  );
}

export default AppEmptyListController;
