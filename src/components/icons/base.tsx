import styled from '@emotion/styled';
import { ComponentProps } from 'react';

const Component = styled.div<{ color?: string }>`
  display: inline-block;
  vertical-align: middle;
  height: 16px;
  line-height: 16px;
  min-height: 16px;
  min-width: 16px;
  width: 16px;

  & path {
    ${({ color }) => (color ? `fill: ${color};` : '')}
  }
`;

type IconBaseProps = {
  color?: string;
  height?: number;
  width?: number;
} & ComponentProps<typeof Component>;

function IconBase({
  height,
  style,
  width,
  ...props
}: IconBaseProps) {
  return (
    <Component
      {...props}
      style={{
        ...(height ? { height, lineHeight: `${height}px`, minHeight: height } : {}),
        ...(width ? { minWidth: width, width } : {}),
        ...style,
      }}
    />
  );
}

export default IconBase;
