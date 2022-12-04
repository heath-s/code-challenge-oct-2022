import { ComponentProps, ForwardedRef, forwardRef } from 'react';
import ImportIcon from 'components/icons/Import';
import ButtonBase from './base';

const ImportButton = forwardRef(
  (props: ComponentProps<typeof ButtonBase>, ref: ForwardedRef<HTMLButtonElement>) => (
    <ButtonBase {...props} ref={ref}>
      Import
      <ImportIcon color="var(--color-white)" height={14} width={14} />
    </ButtonBase>
  ),
);
ImportButton.displayName = 'ImportButton';

export default ImportButton;
