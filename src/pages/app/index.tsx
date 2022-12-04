import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';
import {
  actions, load, name, reducer, useAppPageSelector,
} from 'store/ducks/pages/app.duck';
import AppDropZoneController from 'controllers/app/drop-zone';
import AppEmptyListController from 'controllers/app/empty-list';
import AppExplorerController from 'controllers/app/explorer';
import Gnb from 'components/gnb';
import { loadJson } from 'services/FileLoader';
import { useAlert } from 'services/AlertDialog';
import { useAppDispatch } from 'store';
import { useLoadingIndicator } from 'services/LoadingIndicator';
import withReducer from 'store/withReducer';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const ContentRoot = styled.main`
  background-color: var(--color-neutral-2);
  display: flex;
  flex-grow: 1;
  overflow: hidden;
  overflow-x: auto;
  width: 100%;
`;

const ElevatedGnb = styled(Gnb)`
  z-index: 100;
`;

function AppPage() {
  const dispatch = useAppDispatch();
  const isEmpty = useAppPageSelector((state) => state.isEmpty);

  const ref = useRef<HTMLDivElement>(null);

  const appAlert = useAlert();
  const loading = useLoadingIndicator();

  useEffect(() => {
    dispatch(actions.reset());
  }, [dispatch]);

  const importFile = async (text: string) => {
    try {
      loading.start({ message: 'Importing in progress...' });
      await dispatch(load(text)).unwrap();
    } catch (err: any) {
      appAlert({
        buttonLabel: 'OK',
        content: err,
        title: 'Import error',
      });
    } finally {
      loading.stop();
    }
  };

  const handleClickImport = async () => {
    importFile(await loadJson());
  };

  const handleDrop = async (file: File) => {
    importFile(await file?.text());
  };

  return (
    <>
      <Root ref={ref}>
        <ElevatedGnb as="header" onClickImport={handleClickImport} role="banner" />
        <ContentRoot>
          {isEmpty ? <AppEmptyListController /> : <AppExplorerController />}
        </ContentRoot>
      </Root>
      <AppDropZoneController onDrop={handleDrop} targetRef={ref} />
    </>
  );
}

export default withReducer(name, reducer)(AppPage);
