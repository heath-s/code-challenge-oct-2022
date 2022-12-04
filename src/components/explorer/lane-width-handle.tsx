import styled from '@emotion/styled';
import ExplorerLaneBase from './lane-base';

const ExplorerLaneWidthHandle = styled(ExplorerLaneBase)`
  background-color: var(--color-neutral-7);
  border-right: none;
  cursor: col-resize;
  min-width: 5px;
  opacity: 0;
  position: absolute;
  top: 0;
  width: 5px;
  z-index: 1;

  &:hover, &.mousemove {
    opacity: 0.5;
  }
`;

export default ExplorerLaneWidthHandle;
