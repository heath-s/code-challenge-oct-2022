import { Ref } from 'react';
import styled from '@emotion/styled';
import Body1 from 'components/typography/Body1';
import ButtonBase from 'components/buttons/base';
import Headline from 'components/typography/Headline';
import DialogBase from '../base';

const Title = styled(Headline)`
  margin-bottom: 8px;
`;

const Content = styled(Body1)`
  margin-bottom: 16px;
  min-height: 29px;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-bottom: 8px;
`;

interface AlertDialogProps {
  buttonLabel: string;
  buttonRef?: Ref<HTMLButtonElement>;
  content: string;
  onClickBackdrop?: () => void;
  onClickButton?: () => void;
  title: string;
}

function AlertDialog({
  buttonLabel,
  buttonRef,
  content,
  onClickBackdrop = () => null,
  onClickButton = () => null,
  title,
}: AlertDialogProps) {
  return (
    <DialogBase aria-modal="true" onClickBackdrop={onClickBackdrop}>
      <Title as="header">{title}</Title>
      <Content as="article">{content}</Content>
      <Buttons as="footer">
        <ButtonBase onClick={onClickButton} ref={buttonRef}>{buttonLabel}</ButtonBase>
      </Buttons>
    </DialogBase>
  );
}

export default AlertDialog;
