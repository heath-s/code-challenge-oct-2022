import { ComponentProps } from 'react';
import IconBase from './base';

function ChevronRightIcon(props: Omit<ComponentProps<typeof IconBase>, 'children'>) {
  return (
    <IconBase {...props}>
      <svg width="100%" height="100%" viewBox="0 0 7 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M6.45053 3.12842C7.13018 3.51073 7.13018 4.48927 6.45053 4.87158L1.49026 7.66173C0.823658 8.03669 0 7.55498 0 6.79015L0 1.20985C0 0.445021 0.823657 -0.0366928 1.49026 0.338272L6.45053 3.12842Z" fill="none" />
      </svg>
    </IconBase>
  );
}

export default ChevronRightIcon;
