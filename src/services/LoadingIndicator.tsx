import {
  createContext, ReactNode, useContext, useMemo, useState,
} from 'react';
import InvisibleFieldset from 'components/InvisibleFieldset';
import LoadingIndicator from 'components/dialogs/loading';

interface LoadingIndicatorContextValue {
  start(option: LoadingIndicatorOption): void;
  stop(): void;
}

interface LoadingIndicatorOption {
  message: string;
}

const LoadingIndicatorContext = createContext<LoadingIndicatorContextValue>({
  start: () => null,
  stop: () => null,
});

interface LoadingIndicatorProviderProps {
  children: ReactNode;
}

export function LoadingIndicatorProvider({ children }: LoadingIndicatorProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [option, setOption] = useState<LoadingIndicatorOption>({ message: 'Loading...' });

  const value = useMemo(() => ({
    start: (openOption: LoadingIndicatorOption) => {
      setOption(openOption);
      setIsOpen(true);
    },
    stop: () => {
      setIsOpen(false);
    },
  }), []);

  return (
    <LoadingIndicatorContext.Provider value={value}>
      <InvisibleFieldset disabled={isOpen}>
        {children}
      </InvisibleFieldset>
      {isOpen && (
        <LoadingIndicator
          message={option.message}
        />
      )}
    </LoadingIndicatorContext.Provider>
  );
}

export const useLoadingIndicator = () => useContext(LoadingIndicatorContext);
