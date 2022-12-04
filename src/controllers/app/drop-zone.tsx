import { RefObject, useState } from 'react';
import DropZone from 'components/drop-zone';
import useFileDroppable from 'hooks/useFileDroppable';

interface AttachedDropZoneInterface {
  onDrop: (file: File) => void;
  targetRef: RefObject<HTMLElement>;
}

function AppDropZoneController({
  onDrop = () => null,
  targetRef: elementRef,
}: AttachedDropZoneInterface) {
  const [shown, setShown] = useState(false);

  useFileDroppable({
    elementRef,
    onDragEnd: () => { setShown(false); },
    onDragOver: () => { setShown(true); },
    onDrop: async (file: File) => {
      onDrop(file);
    },
  });

  return (
    <DropZone shown={shown} />
  );
}

export default AppDropZoneController;
