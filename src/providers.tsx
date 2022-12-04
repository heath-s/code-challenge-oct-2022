import { ReactNode } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { AlertDialogProvider } from 'services/AlertDialog';
import { LoadingIndicatorProvider } from 'services/LoadingIndicator';
import { store } from 'store';

interface ProvidersProps {
  children: ReactNode;
}

function Providers({ children }: ProvidersProps) {
  return (
    <ReduxProvider store={store}>
      <LoadingIndicatorProvider>
        <AlertDialogProvider>
          {children}
        </AlertDialogProvider>
      </LoadingIndicatorProvider>
    </ReduxProvider>
  );
}

export default Providers;
