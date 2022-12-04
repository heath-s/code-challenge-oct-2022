import styled from '@emotion/styled';
import ExplorerPreview from 'components/explorer/preview';
import { useAppPageSelector } from 'store/ducks/pages/app.duck';

const Root = styled.div`
  flex-basis: 304px;
  flex-grow: 1;
  position: relative;
`;

function AppPreviewController() {
  const preview = useAppPageSelector((state) => state.preview);

  return preview ? (
    <Root>
      <ExplorerPreview as="article" content={preview.content} title={preview.key} />
    </Root>
  ) : null;
}

export default AppPreviewController;
