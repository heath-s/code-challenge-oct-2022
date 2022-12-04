import { ComponentProps, useEffect, useRef } from 'react';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import ExplorerLaneBase from '../lane-base';

const slideIn = keyframes`
  0% {
    transform: translateX(-100%);
    z-index: 0;
  }

  100% {
    transform: translateX(0);
    z-index: 0;
  }
`;

const Component = styled(ExplorerLaneBase)`
  animation: ${slideIn} 0.3s ease;
  list-style: none;
  margin: 0;
  padding: 8px 0 0 0;
  position: relative;
  z-index: 1;

  &:last-child {
    border-right: none;
  }
`;

type ExplorerListProps = {
  width?: number;
} & ComponentProps<typeof Component>;

function ExplorerList({
  style,
  width = 240,
  ...props
}: ExplorerListProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.setTimeout(() => { ref.current?.scrollIntoView(); }, 300);
  }, []);

  const boundWidth = Math.max(240, width);
  return (
    <Component
      {...props}
      as="ul"
      ref={ref}
      style={{ ...(width ? { minWidth: boundWidth, width: boundWidth } : {}), ...style }}
    />
  );
}

export default ExplorerList;
