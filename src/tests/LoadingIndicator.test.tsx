import { cleanup, render, screen } from '@testing-library/react';
import { useEffect } from 'react';
import { LoadingIndicatorProvider, useLoadingIndicator } from 'services/LoadingIndicator';

function TestComponent({ show }: { show: boolean; }) {
  const loading = useLoadingIndicator();

  useEffect(() => {
    if (show) {
      loading.start({ message: 'LOADING_INDICATOR_TEST' });
    }
  });

  return (
    <button
      type="button"
      data-testid="loading-indicator-test-component-button"
    >
      Button
    </button>
  );
}

describe('LoadingIndicator', () => {
  beforeEach(() => {
    cleanup();
    render(
      <LoadingIndicatorProvider>
        <TestComponent show />
      </LoadingIndicatorProvider>,
    );
    expect(screen.getByText('LOADING_INDICATOR_TEST')).toBeInTheDocument();
  });

  test('not allow focusing on elements outside', () => {
    let button = screen.getByTestId('loading-indicator-test-component-button');
    button.focus();
    expect(button).not.toHaveFocus();

    cleanup();
    render(
      <LoadingIndicatorProvider>
        <TestComponent show={false} />
      </LoadingIndicatorProvider>,
    );
    expect(screen.queryByText('LOADING_INDICATOR_TEST')).not.toBeInTheDocument();
    button = screen.getByTestId('loading-indicator-test-component-button');
    button.focus();
    expect(button).toHaveFocus();
  });
});
