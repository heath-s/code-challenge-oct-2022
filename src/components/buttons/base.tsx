import { ComponentProps, ForwardedRef, forwardRef } from 'react';
import styled from '@emotion/styled';

const Component = styled.button`
  align-items: center;
  background-color: var(--color-purple-2);
  border: none;
  border-radius: 14px;
  box-shadow:
    0px 1px 4px rgba(98, 16, 204, 0.1),
    0px 2px 4px rgba(98, 16, 204, 0.3);
  color: var(--color-white);
  cursor: pointer;
  display: flex;
  font-family: Roboto;
  font-size: 13px;
  font-weight: 700;
  gap: 5.3333px;
  justify-content: center;
  letter-spacing: 0.121875px;
  line-height: 1.2308;
  min-width: 72px;
  padding: 6px 16px;

  &:hover:not(:active) {
    background-color: var(--color-purple-1);
  }

  &:active {
    box-shadow: none;
  }
`;

const ButtonBase = forwardRef(
  (
    { children, ...props }: ComponentProps<typeof Component>,
    ref: ForwardedRef<HTMLButtonElement>,
  ) => (
    <Component {...props} ref={ref}>{children || <>&nbsp;</>}</Component>
  ),
);
ButtonBase.displayName = 'ButtonBase';

export default ButtonBase;
