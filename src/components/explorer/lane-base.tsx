import { ComponentProps, ForwardedRef, forwardRef } from 'react';
import styled from '@emotion/styled';

const Component = styled.div`
  background-color: var(--color-neutral-3);
  border-right: 1px solid var(--color-neutral-4);
  height: 100%;
  min-width: 240px;
  overflow: hidden;
  overflow-y: auto;
  width: 240px;
`;

type ExplorerLaneBaseProps = {
  width?: number;
} & ComponentProps<typeof Component>;

const ExplorerLaneBase = forwardRef(({
  style,
  width,
  ...props
}: ExplorerLaneBaseProps, ref: ForwardedRef<HTMLDivElement>) => (
  <Component
    {...props}
    ref={ref}
    style={{ ...(width ? { width } : {}), ...style }}
  />
));
ExplorerLaneBase.displayName = 'ExplorerLaneBase';

export default ExplorerLaneBase;
