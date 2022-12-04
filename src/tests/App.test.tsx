import {
  cleanup, fireEvent, render, screen, waitFor,
} from '@testing-library/react';
import App from 'pages/router';
import Providers from 'providers';
import sampleJson from './data/sample.json';
import sampleStringJson from './data/sample-error-1.json';
import sampleNumberJson from './data/sample-error-2.json';
import sampleArrayJson from './data/sample-error-3.json';
import sampleDuplicatedKeysJson1 from './data/sample-error-4.json';
import sampleDuplicatedKeysJson2 from './data/sample-error-4-1.json';
import sampleNotJson from './data/sample-error-5.json';
import sampleNestedJson from './data/sample-error-6.json';
import sampleInvalidKeyJson from './data/sample-error-7.json';
import sampleEmptyJson from './data/sample-error-8.json';

describe('App', () => {
  beforeEach(async () => {
    cleanup();
    render(<Providers><App /></Providers>);
  });

  describe('when an invalid file is imported, it shows an error dialog', () => {
    beforeEach(async () => {
      await waitFor(() => {
        const importButton = screen.getByText('Import');
        expect(importButton).toBeInstanceOf(HTMLButtonElement);
        importButton.click();
      });
    });

    afterEach(() => {
      expect(screen.queryByTestId('file-loader-load-json')).not.toBeInTheDocument();
    });

    test('the json is a string', async () => {
      const content = JSON.stringify(sampleStringJson);
      File.prototype.text = jest.fn().mockReturnValueOnce(content);
      const fileInput = screen.getByTestId('file-loader-load-json');
      fireEvent.change(fileInput, {
        target: {
          files: [new File([content], 'sample.json', { type: 'text/plain' })],
        },
      });
      await waitFor(() => expect(screen.getByText('Import error')).toBeInTheDocument());
    });

    test('the json is a number', async () => {
      const content = JSON.stringify(sampleNumberJson);
      File.prototype.text = jest.fn().mockReturnValueOnce(content);
      const fileInput = screen.getByTestId('file-loader-load-json');
      fireEvent.change(fileInput, {
        target: {
          files: [new File([content], 'sample.json', { type: 'text/plain' })],
        },
      });
      await waitFor(() => expect(screen.getByText('Import error')).toBeInTheDocument());
    });

    test('the json is an array', async () => {
      const content = JSON.stringify(sampleArrayJson);
      File.prototype.text = jest.fn().mockReturnValueOnce(content);
      const fileInput = screen.getByTestId('file-loader-load-json');
      fireEvent.change(fileInput, {
        target: {
          files: [new File([content], 'sample.json', { type: 'text/plain' })],
        },
      });
      await waitFor(() => expect(screen.getByText('Import error')).toBeInTheDocument());
    });

    test('the json has duplicated keys. the parent comes first', async () => {
      const content = JSON.stringify(sampleDuplicatedKeysJson1);
      File.prototype.text = jest.fn().mockReturnValueOnce(content);
      const fileInput = screen.getByTestId('file-loader-load-json');
      fireEvent.change(fileInput, {
        target: {
          files: [new File([content], 'sample.json', { type: 'text/plain' })],
        },
      });
      await waitFor(() => expect(screen.getByText('Import error')).toBeInTheDocument());
    });

    test('the json has duplicated keys. the child comes first', async () => {
      const content = JSON.stringify(sampleDuplicatedKeysJson2);
      File.prototype.text = jest.fn().mockReturnValueOnce(content);
      const fileInput = screen.getByTestId('file-loader-load-json');
      fireEvent.change(fileInput, {
        target: {
          files: [new File([content], 'sample.json', { type: 'text/plain' })],
        },
      });
      await waitFor(() => expect(screen.getByText('Import error')).toBeInTheDocument());
    });

    test('the file is not a json', async () => {
      const content = JSON.stringify(sampleNotJson);
      File.prototype.text = jest.fn().mockReturnValueOnce(content);
      const fileInput = screen.getByTestId('file-loader-load-json');
      fireEvent.change(fileInput, {
        target: {
          files: [new File([content], 'sample.json', { type: 'text/plain' })],
        },
      });
      await waitFor(() => expect(screen.getByText('Import error')).toBeInTheDocument());
    });

    test('the json has a nested object', async () => {
      const content = JSON.stringify(sampleNestedJson);
      File.prototype.text = jest.fn().mockReturnValueOnce(content);
      const fileInput = screen.getByTestId('file-loader-load-json');
      fireEvent.change(fileInput, {
        target: {
          files: [new File([content], 'sample.json', { type: 'text/plain' })],
        },
      });
      await waitFor(() => expect(screen.getByText('Import error')).toBeInTheDocument());
    });

    test('the json has an invalid key', async () => {
      const content = JSON.stringify(sampleInvalidKeyJson);
      File.prototype.text = jest.fn().mockReturnValueOnce(content);
      const fileInput = screen.getByTestId('file-loader-load-json');
      fireEvent.change(fileInput, {
        target: {
          files: [new File([content], 'sample.json', { type: 'text/plain' })],
        },
      });
      await waitFor(() => expect(screen.getByText('Import error')).toBeInTheDocument());
    });

    test('the json is an empty object', async () => {
      const content = JSON.stringify(sampleEmptyJson);
      File.prototype.text = jest.fn().mockReturnValueOnce(content);
      const fileInput = screen.getByTestId('file-loader-load-json');
      fireEvent.change(fileInput, {
        target: {
          files: [new File([content], 'sample.json', { type: 'text/plain' })],
        },
      });
      await waitFor(() => expect(screen.getByText('Import error')).toBeInTheDocument());
    });
  });

  describe('when a valid JSON file is imported', () => {
    HTMLElement.prototype.scrollIntoView = jest.fn();

    beforeEach(async () => {
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

    test('top-most folders and files from the file are listed', async () => {
      const folder1Label = screen.getByText('tagTable');
      const folder2Label = screen.getByText('tagDropdown');
      const file1Label = screen.getByText('topmostFile');
      expect(folder1Label).toBeInTheDocument();
      expect(folder2Label).toBeInTheDocument();
      expect(file1Label).toBeInTheDocument();
      expect(folder1Label.previousElementSibling?.getAttribute('alt')).toBe('folder: ');
      expect(folder2Label.previousElementSibling?.getAttribute('alt')).toBe('folder: ');
      expect(file1Label.previousElementSibling?.getAttribute('alt')).toBe('file: ');
    });

    test('when a folder is clicked, the children of the folder are listed', async () => {
      const folder = screen.getByText('tagTable');
      folder.click();

      const folder1Label = screen.getByText('columns');
      const folder2Label = screen.getByText('createRow');
      expect(folder1Label).toBeInTheDocument();
      expect(folder2Label).toBeInTheDocument();
      expect(folder1Label.previousElementSibling?.getAttribute('alt')).toBe('folder: ');
      expect(folder2Label.previousElementSibling?.getAttribute('alt')).toBe('folder: ');
    });

    test('When a file is clicked, its dot-separated path and content are displayed', () => {
      screen.getByText('tagDropdown').click();
      screen.getByText('error').click();
      screen.getByText('maxTagsPerTicket').click();

      expect(screen.getByText('tagDropdown.error.maxTagsPerTicket')).toBeInTheDocument();
      expect(screen.getByText('Can\'t add more than 20 tags.')).toBeInTheDocument();
    });
  });
});
