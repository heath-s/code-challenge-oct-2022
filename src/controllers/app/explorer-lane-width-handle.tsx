import { useEffect, useRef } from 'react';
import Component from 'components/explorer/lane-width-handle';

interface ExplorerLaneWidthHandleProps {
  onMouseDown?: (left: number) => void;
  onMouseMove?: (left: number) => void;
  onMouseUp?: () => void;
  position: 'left' | 'right';
}

function AppExplorerLaneWidthHandleController({
  onMouseDown = () => null,
  onMouseMove = () => null,
  onMouseUp = () => null,
  position,
}: ExplorerLaneWidthHandleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isClickedRef = useRef(false);

  useEffect(() => {
    if (ref.current) {
      const element = ref.current;

      const handleMouseDown = (ev: MouseEvent) => {
        isClickedRef.current = true;
        ev.preventDefault();
        onMouseDown(ev.clientX);
      };

      const handleMouseMove = (ev: MouseEvent) => {
        if (!isClickedRef.current) {
          return;
        }
        ev.preventDefault();
        onMouseMove(ev.clientX);
        element.classList.add('mousemove');
        document.body.style.cursor = 'col-resize';
      };

      const handleMouseUp = (ev: MouseEvent) => {
        if (!isClickedRef.current) {
          return;
        }
        isClickedRef.current = false;
        ev.preventDefault();
        onMouseUp();
        element.classList.remove('mousemove');
        document.body.style.cursor = '';
      };

      element.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        element.removeEventListener('mousedown', handleMouseDown);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
    return () => {};
  }, [onMouseDown, onMouseMove, onMouseUp]);

  return <Component ref={ref} style={{ [position]: 0 }}>&nbsp;</Component>;
}

export default AppExplorerLaneWidthHandleController;
