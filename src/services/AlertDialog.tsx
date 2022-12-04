import {
  createContext, ReactNode, useContext, useEffect, useMemo, useRef, useState,
} from 'react';
import AlertDialog from 'components/dialogs/alert';
import InvisibleFieldset from 'components/InvisibleFieldset';

interface AlertDialogContextValue {
  (option: AlertDialogOption): void;
}

interface AlertDialogOption {
  buttonLabel: string;
  content: string;
  title: string;
}

const AlertDialogContext = createContext<AlertDialogContextValue>(() => null);

interface AlertDialogProviderProps {
  children: ReactNode;
}

export function AlertDialogProvider({ children }: AlertDialogProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [option, setOption] = useState<AlertDialogOption>({ buttonLabel: '', content: '', title: '' });

  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (isOpen) {
      window.setTimeout(() => { button?.focus(); });
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      const handleKeyUp = (ev: KeyboardEvent) => {
        if (ev.key === 'Escape') {
          ev.preventDefault();
          setIsOpen(false);
        }
      };

      window.addEventListener('keyup', handleKeyUp);
      return () => {
        window.removeEventListener('keyup', handleKeyUp);
      };
    }
    return () => {};
  }, [isOpen]);

  const value = useMemo(() => (openOption: AlertDialogOption) => {
    setOption(openOption);
    setIsOpen(true);
  }, []);

  return (
    <AlertDialogContext.Provider value={value}>
      <InvisibleFieldset disabled={isOpen}>
        {children}
      </InvisibleFieldset>
      {isOpen && (
        <AlertDialog
          buttonLabel={option.buttonLabel}
          buttonRef={buttonRef}
          content={option.content}
          onClickBackdrop={() => setIsOpen(false)}
          onClickButton={() => setIsOpen(false)}
          title={option.title}
        />
      )}
    </AlertDialogContext.Provider>
  );
}

export const useAlert = () => useContext(AlertDialogContext);
