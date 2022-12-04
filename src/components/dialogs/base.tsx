import { ComponentProps, MouseEventHandler } from 'react';
import styled from '@emotion/styled';

const Backdrop = styled.div`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.2);
  bottom: 0;
  display: flex;
  left: 0;
  justify-content: center;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 1000;
`;

const Component = styled.div`
  background-color: var(--color-white);
  border-radius: 8px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  min-width: 320px;
  padding: 16px 24px;
`;

type DialogBaseProps = {
  onClickBackdrop?: () => void;
} & ComponentProps<typeof Component>;

function DialogBase({
  onClickBackdrop = () => null,
  ...props
}: DialogBaseProps) {
  const handleClick: MouseEventHandler<HTMLDivElement> = (ev) => {
    ev.stopPropagation();
  };

  return (
    <Backdrop data-testid="dialog-base-backdrop" onClick={onClickBackdrop}>
      <Component {...props} onClick={handleClick} />
    </Backdrop>
  );
}

export default DialogBase;
