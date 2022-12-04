import styled from '@emotion/styled';
import { useEffect } from 'react';
import { KeynavManagerProvider, useKeynavManager } from 'services/KeynavManager';
import { useAppPageSelector } from 'store/ducks/pages/app.duck';
import AppExplorerListController from './explorer-list';
import AppPreviewController from './preview';

const Root = styled.nav`
  border-right: 1px solid var(--color-neutral-4);
  display: flex;
  flex-basis: min-content;
  flex-wrap: nowrap;
  overflow: hidden;
  overflow-x: auto;
`;

function SelectedKeyChangeListener() {
  const selectedKey = useAppPageSelector((state) => state.selectedKey);

  const keynav = useKeynavManager();

  useEffect(() => {
    window.setTimeout(() => {
      keynav.focusOnFirstItem();
    });
  }, [keynav]);

  useEffect(() => {
    keynav.updateTree();
  }, [keynav, selectedKey]);

  return null;
}

function AppExplorerController() {
  const listLength = useAppPageSelector(({ lists }) => lists?.length || 0);

  return (
    <>
      <KeynavManagerProvider>
        <Root aria-label="L10N String Explorer" role="tree">
          {[...Array(listLength)].map((_, index) => {
            const key = `ExplorerList#${index}`;
            return (
              <AppExplorerListController key={key} index={index} />
            );
          })}
        </Root>
        <SelectedKeyChangeListener />
      </KeynavManagerProvider>
      <AppPreviewController />
    </>
  );
}

export default AppExplorerController;
