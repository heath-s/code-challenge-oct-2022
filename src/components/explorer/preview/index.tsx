import { ComponentProps } from 'react';
import styled from '@emotion/styled';
import Body3 from 'components/typography/Body3';
import Headline from 'components/typography/Headline';
import ExplorerLaneBase from '../lane-base';

const Root = styled(ExplorerLaneBase)`
  align-items: center;
  background-color: var(--color-neutral-2);
  border-right: 0;
  display: flex;
  flex-direction: column;
  min-width: 304px;
  padding: 24px;
  width: unset;
`;

const Component = styled.div`
  background-color: var(--color-neutral-2);
  border-radius: 8px;
  box-shadow: 8px 8px 10px #dfdfdf, -8px -8px 10px #ffffff;
  height: 324px;
  max-width: 640px;
  min-width: 256px;
  overflow: hidden;
  overflow-y: auto;
  padding: 16px;
  width: 100%;
  word-break: break-word;
`;

const Title = styled(Headline)`
  margin-top: 24px;
  max-width: 640px;
  min-width: 256px;
  width: 100%;
  word-break: break-all;
`;

type ExplorerPreviewProps = {
  content: string;
  title: string;
  width?: number;
} & ComponentProps<typeof Root>;

function ExplorerPreview({
  content,
  title,
  width,
  ...props
}: ExplorerPreviewProps) {
  return (
    <Root {...props} width={width}>
      <Component>
        <Body3 as="code">{content}</Body3>
      </Component>
      <Title as="header">{title}</Title>
    </Root>
  );
}

export default ExplorerPreview;
