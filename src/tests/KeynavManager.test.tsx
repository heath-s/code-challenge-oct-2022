import {
  cleanup,
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import App from 'pages/router';
import Providers from 'providers';
import sampleJson from './data/sample.json';

describe('KeynavManager', () => {
  HTMLElement.prototype.scrollIntoView = jest.fn();

  beforeEach(async () => {
    cleanup();
    render(<Providers><App /></Providers>);
    await waitFor(async () => {
      const importButton = screen.getByText('Import');
      importButton.click();
      const content = JSON.stringify(sampleJson);
      File.prototype.text = jest.fn().mockReturnValueOnce(content);
      const fileInput = screen.getByTestId('file-loader-load-json');
      fireEvent.change(fileInput, {
        target: {
          files: [new File([content], 'sample.json', { type: 'text/plain' })],
        },
      });
      await waitFor(() => expect(screen.queryByTestId('file-loader-load-json')).not.toBeInTheDocument());
    });
  });

  test('focus first item after loading', async () => {
    await waitFor(() => {
      const focused = document.activeElement as HTMLElement;
      expect(focused.getAttribute('data-aria-owns')).toBe('keynav.group#tagDropdown.');
      expect(focused.getAttribute('role')).toBe('treeitem');
      expect(focused.getAttribute('aria-selected')).toBe('false');
      expect(focused).toHaveTextContent('tagDropdown');
    });
  });

  test('press arrow down', async () => {
    await waitFor(() => {
      const focused = document.activeElement as HTMLElement;
      expect(focused.getAttribute('data-aria-owns')).toBe('keynav.group#tagDropdown.');
    });

    fireEvent.keyDown(document.activeElement as HTMLElement, { key: 'ArrowDown' });
    fireEvent.keyDown(document.activeElement as HTMLElement, { key: 'ArrowRight' });
    await waitFor(() => {
      const focused = document.activeElement as HTMLElement;
      expect(focused.getAttribute('data-aria-owns')).toBe('keynav.group#tagTable.');
      expect(focused.getAttribute('role')).toBe('treeitem');
      expect(focused.getAttribute('aria-selected')).toBe('true');
      expect(focused).toHaveTextContent('tagTable');
    });

    fireEvent.keyDown(document.activeElement as HTMLElement, { key: 'ArrowDown' });
    await waitFor(() => {
      const focused = document.activeElement as HTMLElement;
      expect(focused.getAttribute('data-aria-owns')).toBeFalsy();
      expect(focused.getAttribute('role')).toBe('treeitem');
      expect(focused.getAttribute('aria-selected')).toBe('false');
      expect(focused).toHaveTextContent('topmostFile');
    });

    fireEvent.keyDown(document.activeElement as HTMLElement, { key: 'ArrowDown' });
    await waitFor(() => {
      const focused = document.activeElement as HTMLElement;
      expect(focused.getAttribute('data-aria-owns')).toBeFalsy();
      expect(focused.getAttribute('role')).toBe('treeitem');
      expect(focused.getAttribute('aria-selected')).toBe('false');
      expect(focused).toHaveTextContent('topmostFile');
    });
  });

  test('press arrow up', async () => {
    await waitFor(() => {
      const focused = document.activeElement as HTMLElement;
      expect(focused.getAttribute('data-aria-owns')).toBe('keynav.group#tagDropdown.');
    });

    fireEvent.keyDown(document.activeElement as HTMLElement, { key: 'ArrowDown' });
    fireEvent.keyDown(document.activeElement as HTMLElement, { key: 'ArrowRight' });
    fireEvent.keyDown(document.activeElement as HTMLElement, { key: 'ArrowDown' });
    fireEvent.keyDown(document.activeElement as HTMLElement, { key: 'ArrowUp' });
    await waitFor(() => {
      const focused = document.activeElement as HTMLElement;
      expect(focused.getAttribute('data-aria-owns')).toBe('keynav.group#tagTable.');
      expect(focused.getAttribute('role')).toBe('treeitem');
      expect(focused.getAttribute('aria-selected')).toBe('true');
      expect(focused).toHaveTextContent('tagTable');
    });

    fireEvent.keyDown(document.activeElement as HTMLElement, { key: 'ArrowUp' });
    await waitFor(() => {
      const focused = document.activeElement as HTMLElement;
      expect(focused.getAttribute('data-aria-owns')).toBe('keynav.group#tagDropdown.');
      expect(focused.getAttribute('role')).toBe('treeitem');
      expect(focused.getAttribute('aria-selected')).toBe('false');
      expect(focused).toHaveTextContent('tagDropdown');
    });

    fireEvent.keyDown(document.activeElement as HTMLElement, { key: 'ArrowUp' });
    await waitFor(() => {
      const focused = document.activeElement as HTMLElement;
      expect(focused.getAttribute('data-aria-owns')).toBe('keynav.group#tagDropdown.');
      expect(focused.getAttribute('role')).toBe('treeitem');
      expect(focused.getAttribute('aria-selected')).toBe('false');
      expect(focused).toHaveTextContent('tagDropdown');
    });
  });

  test('press arrow right', async () => {
    await waitFor(() => {
      const focused = document.activeElement as HTMLElement;
      expect(focused.getAttribute('data-aria-owns')).toBe('keynav.group#tagDropdown.');
    });

    fireEvent.keyDown(document.activeElement as HTMLElement, { key: 'ArrowDown' });
    fireEvent.keyDown(document.activeElement as HTMLElement, { key: 'ArrowRight' });
    await waitFor(() => {
      const focused = document.activeElement as HTMLElement;
      expect(focused.getAttribute('data-aria-owns')).toBe('keynav.group#tagTable.');
      expect(focused.getAttribute('role')).toBe('treeitem');
      expect(focused.getAttribute('aria-selected')).toBe('true');
      expect(focused).toHaveTextContent('tagTable');

      expect(document.getElementById('keynav.group#tagTable.')).toBeInTheDocument();
    });

    fireEvent.keyDown(document.activeElement as HTMLElement, { key: 'ArrowRight' });
    await waitFor(() => {
      const focused = document.activeElement as HTMLElement;
      expect(focused.getAttribute('data-aria-owns')).toBe('keynav.group#tagTable.columns.');
      expect(focused.getAttribute('role')).toBe('treeitem');
      expect(focused.getAttribute('aria-selected')).toBe('false');
      expect(focused).toHaveTextContent('columns');
    });

    fireEvent.keyDown(document.activeElement as HTMLElement, { key: 'ArrowRight' });
    await waitFor(() => {
      const focused = document.activeElement as HTMLElement;
      expect(focused.getAttribute('data-aria-owns')).toBe('keynav.group#tagTable.columns.');
      expect(focused.getAttribute('role')).toBe('treeitem');
      expect(focused.getAttribute('aria-selected')).toBe('true');
      expect(focused).toHaveTextContent('columns');

      expect(document.getElementById('keynav.group#tagTable.columns.')).toBeInTheDocument();
    });

    fireEvent.keyDown(document.activeElement as HTMLElement, { key: 'ArrowRight' });
    await waitFor(() => {
      const focused = document.activeElement as HTMLElement;
      expect(focused.getAttribute('data-aria-owns')).toBeFalsy();
      expect(focused.getAttribute('role')).toBe('treeitem');
      expect(focused.getAttribute('aria-selected')).toBe('false');
      expect(focused).toHaveTextContent('createdBy');
    });

    fireEvent.keyDown(document.activeElement as HTMLElement, { key: 'ArrowRight' });
    await waitFor(() => {
      const focused = document.activeElement as HTMLElement;
      expect(focused.getAttribute('data-aria-owns')).toBeFalsy();
      expect(focused.getAttribute('role')).toBe('treeitem');
      expect(focused.getAttribute('aria-selected')).toBe('false');
      expect(focused).toHaveTextContent('createdBy');
    });
    fireEvent.keyDown(document.activeElement as HTMLElement, { key: 'ArrowDown' });
    fireEvent.click(document.activeElement as HTMLElement);

    fireEvent.keyDown(document.activeElement as HTMLElement, { key: 'ArrowLeft' });
    fireEvent.keyDown(document.activeElement as HTMLElement, { key: 'ArrowLeft' });
    fireEvent.keyDown(document.activeElement as HTMLElement, { key: 'ArrowRight' });
    await waitFor(() => {
      const focused = document.activeElement as HTMLElement;
      expect(focused.getAttribute('data-aria-owns')).toBe('keynav.group#tagTable.columns.');
      expect(focused.getAttribute('role')).toBe('treeitem');
      expect(focused.getAttribute('aria-selected')).toBe('true');
      expect(focused).toHaveTextContent('columns');

      expect(document.getElementById('keynav.group#tagTable.columns.')).toBeInTheDocument();
    });

    fireEvent.keyDown(document.activeElement as HTMLElement, { key: 'ArrowRight' });
    await waitFor(() => {
      const focused = document.activeElement as HTMLElement;
      expect(focused.getAttribute('data-aria-owns')).toBeFalsy();
      expect(focused.getAttribute('role')).toBe('treeitem');
      expect(focused.getAttribute('aria-selected')).toBe('true');
      expect(focused).toHaveTextContent('createdOn');
    });

    fireEvent.keyDown(document.activeElement as HTMLElement, { key: 'ArrowRight' });
    await waitFor(() => {
      const focused = document.activeElement as HTMLElement;
      expect(focused.getAttribute('data-aria-owns')).toBeFalsy();
      expect(focused.getAttribute('role')).toBe('treeitem');
      expect(focused.getAttribute('aria-selected')).toBe('true');
      expect(focused).toHaveTextContent('createdOn');
    });
  });

  test('press arrow left', async () => {
    await waitFor(() => {
      const focused = document.activeElement as HTMLElement;
      expect(focused.getAttribute('data-aria-owns')).toBe('keynav.group#tagDropdown.');
    });

    fireEvent.keyDown(document.activeElement as HTMLElement, { key: 'ArrowDown' });
    fireEvent.keyDown(document.activeElement as HTMLElement, { key: 'ArrowRight' });
    fireEvent.keyDown(document.activeElement as HTMLElement, { key: 'ArrowRight' });
    fireEvent.keyDown(document.activeElement as HTMLElement, { key: 'ArrowRight' });
    fireEvent.keyDown(document.activeElement as HTMLElement, { key: 'ArrowRight' });
    fireEvent.keyDown(document.activeElement as HTMLElement, { key: 'ArrowRight' });
    fireEvent.keyDown(document.activeElement as HTMLElement, { key: 'ArrowDown' });
    fireEvent.click(document.activeElement as HTMLElement);

    fireEvent.keyDown(document.activeElement as HTMLElement, { key: 'ArrowLeft' });
    await waitFor(() => {
      const focused = document.activeElement as HTMLElement;
      expect(focused.getAttribute('data-aria-owns')).toBe('keynav.group#tagTable.columns.');
      expect(focused.getAttribute('role')).toBe('treeitem');
      expect(focused.getAttribute('aria-selected')).toBe('true');
      expect(focused).toHaveTextContent('columns');
    });

    fireEvent.keyDown(document.activeElement as HTMLElement, { key: 'ArrowLeft' });
    await waitFor(() => {
      const focused = document.activeElement as HTMLElement;
      expect(focused.getAttribute('data-aria-owns')).toBe('keynav.group#tagTable.');
      expect(focused.getAttribute('role')).toBe('treeitem');
      expect(focused.getAttribute('aria-selected')).toBe('true');
      expect(focused).toHaveTextContent('tagTable');
    });

    fireEvent.keyDown(document.activeElement as HTMLElement, { key: 'ArrowLeft' });
    await waitFor(() => {
      const focused = document.activeElement as HTMLElement;
      expect(focused.getAttribute('data-aria-owns')).toBe('keynav.group#tagTable.');
      expect(focused.getAttribute('role')).toBe('treeitem');
      expect(focused.getAttribute('aria-selected')).toBe('true');
      expect(focused).toHaveTextContent('tagTable');
    });
  });

  test('press home', async () => {
    await waitFor(() => {
      const focused = document.activeElement as HTMLElement;
      expect(focused.getAttribute('data-aria-owns')).toBe('keynav.group#tagDropdown.');
    });

    fireEvent.keyDown(document.activeElement as HTMLElement, { key: 'ArrowRight' });
    fireEvent.keyDown(document.activeElement as HTMLElement, { key: 'ArrowRight' });
    fireEvent.keyDown(document.activeElement as HTMLElement, { key: 'ArrowDown' });
    fireEvent.keyDown(document.activeElement as HTMLElement, { key: 'ArrowRight' });
    fireEvent.keyDown(document.activeElement as HTMLElement, { key: 'ArrowRight' });
    fireEvent.click(document.activeElement as HTMLElement);

    fireEvent.keyDown(document.activeElement as HTMLElement, { key: 'ArrowLeft' });
    await waitFor(() => {
      const focused = document.activeElement as HTMLElement;
      expect(focused.getAttribute('data-aria-owns')).toBe('keynav.group#tagDropdown.error.');
      expect(focused.getAttribute('role')).toBe('treeitem');
      expect(focused.getAttribute('aria-selected')).toBe('true');
      expect(focused).toHaveTextContent('error');
    });

    fireEvent.keyDown(document.activeElement as HTMLElement, { key: 'Home' });
    await waitFor(() => {
      const focused = document.activeElement as HTMLElement;
      expect(focused.getAttribute('data-aria-owns')).toBe('keynav.group#tagDropdown.createNewTag.');
      expect(focused.getAttribute('role')).toBe('treeitem');
      expect(focused.getAttribute('aria-selected')).toBe('false');
      expect(focused).toHaveTextContent('createNewTag');
    });
    fireEvent.keyDown(document.activeElement as HTMLElement, { key: 'Home' });
    await waitFor(() => {
      const focused = document.activeElement as HTMLElement;
      expect(focused.getAttribute('data-aria-owns')).toBe('keynav.group#tagDropdown.createNewTag.');
      expect(focused.getAttribute('role')).toBe('treeitem');
      expect(focused.getAttribute('aria-selected')).toBe('false');
      expect(focused).toHaveTextContent('createNewTag');
    });
  });

  test('press end', async () => {
    await waitFor(() => {
      const focused = document.activeElement as HTMLElement;
      expect(focused.getAttribute('data-aria-owns')).toBe('keynav.group#tagDropdown.');
    });

    fireEvent.keyDown(document.activeElement as HTMLElement, { key: 'ArrowRight' });
    fireEvent.keyDown(document.activeElement as HTMLElement, { key: 'ArrowRight' });
    fireEvent.keyDown(document.activeElement as HTMLElement, { key: 'ArrowDown' });
    fireEvent.keyDown(document.activeElement as HTMLElement, { key: 'ArrowRight' });
    fireEvent.keyDown(document.activeElement as HTMLElement, { key: 'ArrowRight' });
    fireEvent.click(document.activeElement as HTMLElement);

    fireEvent.keyDown(document.activeElement as HTMLElement, { key: 'ArrowLeft' });
    await waitFor(() => {
      const focused = document.activeElement as HTMLElement;
      expect(focused.getAttribute('data-aria-owns')).toBe('keynav.group#tagDropdown.error.');
      expect(focused.getAttribute('role')).toBe('treeitem');
      expect(focused.getAttribute('aria-selected')).toBe('true');
      expect(focused).toHaveTextContent('error');
    });

    fireEvent.keyDown(document.activeElement as HTMLElement, { key: 'End' });
    await waitFor(() => {
      const focused = document.activeElement as HTMLElement;
      expect(focused.getAttribute('data-aria-owns')).toBeFalsy();
      expect(focused.getAttribute('role')).toBe('treeitem');
      expect(focused.getAttribute('aria-selected')).toBe('false');
      expect(focused).toHaveTextContent('searchInputPlaceholder');
    });
    fireEvent.keyDown(document.activeElement as HTMLElement, { key: 'End' });
    await waitFor(() => {
      const focused = document.activeElement as HTMLElement;
      expect(focused.getAttribute('data-aria-owns')).toBeFalsy();
      expect(focused.getAttribute('role')).toBe('treeitem');
      expect(focused.getAttribute('aria-selected')).toBe('false');
      expect(focused).toHaveTextContent('searchInputPlaceholder');
    });
  });
});
