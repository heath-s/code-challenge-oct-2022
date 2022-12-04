import {
  cleanup, fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import { useEffect } from 'react';
import { AlertDialogProvider, useAlert } from 'services/AlertDialog';

function TestComponent({ show }: { show: boolean; }) {
  const alert = useAlert();

  useEffect(() => {
    if (show) {
      alert({
        buttonLabel: 'BUTTON_LABEL',
        content: 'ALERT_DIALOG_CONTENT',
        title: 'TITLE',
      });
    }
  });

  return (
    <button
      type="button"
      data-testid="alert-dialog-test-component-button"
    >
      Button
    </button>
  );
}

describe('AlertDialog', () => {
  beforeEach(() => {
    cleanup();
    render(
      <AlertDialogProvider>
        <TestComponent show />
      </AlertDialogProvider>,
    );
    expect(screen.getByText('ALERT_DIALOG_CONTENT')).toBeInTheDocument();
  });

  test('not allow focusing on elements outside', () => {
    let button = screen.getByTestId('alert-dialog-test-component-button');
    button.focus();
    expect(button).not.toHaveFocus();

    cleanup();
    render(
      <AlertDialogProvider>
        <TestComponent show={false} />
      </AlertDialogProvider>,
    );
    expect(screen.queryByText('ALERT_DIALOG_CONTENT')).not.toBeInTheDocument();
    button = screen.getByTestId('alert-dialog-test-component-button');
    button.focus();
    expect(button).toHaveFocus();
  });

  test('auto focus on button after showing dialog', async () => {
    await waitFor(() => expect(screen.getByText('BUTTON_LABEL')).toHaveFocus());
  });

  test('press esc key to close', () => {
    fireEvent.keyUp(document.activeElement as HTMLElement, { key: 'Escape' });
    expect(screen.queryByText('ALERT_DIALOG_CONTENT')).not.toBeInTheDocument();
  });

  test('click backdrop to close', () => {
    fireEvent.click(screen.getByTestId('dialog-base-backdrop'));
    expect(screen.queryByText('ALERT_DIALOG_CONTENT')).not.toBeInTheDocument();
  });
});
