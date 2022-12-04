import { lazy, Suspense, useEffect } from 'react';
import LoadingDialog from 'components/dialogs/loading';
import { useAppDispatch } from 'store';
import { actions as appSettingActions } from 'store/ducks/app-setting.duck';

const AppPage = lazy(() => import('./app'));

// TODO: this component is a dummy for future implementation with react-router
function Router() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(appSettingActions.load());
  }, [dispatch]);

  return (
    <Suspense fallback={<LoadingDialog message="Loading..." />}>
      <AppPage />
    </Suspense>
  );
}

export default Router;
