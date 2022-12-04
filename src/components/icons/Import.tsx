import { ComponentProps } from 'react';
import IconBase from './base';

function ImportIcon(props: Omit<ComponentProps<typeof IconBase>, 'children'>) {
  return (
    <IconBase {...props}>
      <svg width="100%" height="100%" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.66666 7.39057V0.333332H6.33333V7.39047L4.13812 5.19526L3.19531 6.13807L7.00005 9.94281L10.8048 6.13807L9.86197 5.19526L7.66666 7.39057Z" fill="none" />
        <path d="M1.66666 12.3333V9H0.333328V13.6667H13.6667V9H12.3333V12.3333H1.66666Z" fill="none" />
      </svg>
    </IconBase>
  );
}

export default ImportIcon;
