import styled from '@emotion/styled';
import Body1 from 'components/typography/Body1';
import DialogBase from '../base';

const Message = styled(Body1)`
  padding: 24px;
  text-align: center;
`;

interface LoadingDialogProps {
  message: string;
}

function LoadingDialog({
  message,
}: LoadingDialogProps) {
  return (
    <DialogBase aria-modal="true">
      <Message as="article">{message}</Message>
    </DialogBase>
  );
}

export default LoadingDialog;
