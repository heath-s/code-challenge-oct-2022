import { RefObject, useEffect } from 'react';

interface UseFileDroppableOptions {
  elementRef: RefObject<HTMLElement>;
  onDragEnd?: (ev?: DragEvent) => void;
  onDragOver?: (ev?: DragEvent) => void;
  onDragStart?: (ev?: DragEvent) => void;
  onDrop?: (file: File, ev?: DragEvent) => void;
}

const useFileDroppable = ({ elementRef, ...options }: UseFileDroppableOptions) => {
  useEffect(() => {
    if (elementRef.current) {
      const element = elementRef.current;

      const handleDragEnd = (ev: DragEvent) => {
        ev.preventDefault();
        options.onDragEnd?.(ev);
      };

      const handleDragOver = (ev: DragEvent) => {
        ev.preventDefault();
        options.onDragOver?.(ev);
      };

      const handleDragStart = (ev: DragEvent) => {
        ev.preventDefault();
        options.onDragStart?.(ev);
      };

      const handleDrop = (ev: DragEvent) => {
        handleDragEnd(ev);
        const file = ev.dataTransfer?.files?.[0];
        if (file) {
          options.onDrop?.(file, ev);
        }
      };

      element.addEventListener('dragend', handleDragEnd);
      element.addEventListener('dragenter', handleDragStart);
      element.addEventListener('dragleave', handleDragEnd);
      element.addEventListener('dragover', handleDragOver);
      element.addEventListener('drop', handleDrop);
      return () => {
        element.removeEventListener('dragend', handleDragEnd);
        element.removeEventListener('dragenter', handleDragStart);
        element.removeEventListener('dragleave', handleDragEnd);
        element.removeEventListener('dragover', handleDragOver);
        element.removeEventListener('drop', handleDrop);
      };
    }
    return () => {};
  }, [elementRef, options]);
};

export default useFileDroppable;
