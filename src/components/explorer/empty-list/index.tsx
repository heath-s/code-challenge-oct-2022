import { ComponentProps } from 'react';
import styled from '@emotion/styled';
import ImportIcon from 'components/icons/Import';
import Subtitle from 'components/typography/Subtitle';
import ExplorerLaneBase from '../lane-base';

const Component = styled(ExplorerLaneBase)`
  align-items: center;
  display: flex;
  justify-content: center;
`;

const Message = styled.div`
  color: var(--color-neutral-6);
  padding-bottom: 56px;
  text-align: center;
  width: 176px;
`;

const Icon = styled(ImportIcon)`
  margin-bottom: 11.33px;
`;

type ExplorerEmptyListProps = {
  width?: number;
} & ComponentProps<typeof Component>;

function ExplorerEmptyList({
  style,
  width = 240,
  ...props
}: ExplorerEmptyListProps) {
  const boundWidth = Math.max(240, width);
  return (
    <Component
      {...props}
      style={{ ...(width ? { minWidth: boundWidth, width: boundWidth } : {}), ...style }}
    >
      <Message>
        <Icon color="var(--color-neutral-6)" height={33.33} width={33.33} />
        <Subtitle>Click Import button to load a localization file.</Subtitle>
      </Message>
    </Component>
  );
}

export default ExplorerEmptyList;
