import { ForwardedRef, forwardRef } from 'react';
import styled from '@emotion/styled';
import Subtitle from 'components/typography/Subtitle';

const Backdrop = styled.div`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.6);
  bottom: 0;
  display: flex;
  left: 0;
  justify-content: center;
  pointer-events: none;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1000;
`;

const Message = styled(Subtitle)`
  color: var(--color-white);
`;

interface DropZoneProps {
  shown: boolean;
}

const DropZone = forwardRef(({ shown }: DropZoneProps, ref: ForwardedRef<HTMLDivElement>) => (
  shown
    ? (
      <Backdrop ref={ref}>
        <Message className="message">Drop a JSON file here.</Message>
      </Backdrop>
    )
    : null
));
DropZone.displayName = 'DropZone';

export default DropZone;
